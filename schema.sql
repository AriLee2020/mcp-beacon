-- ============================================================
-- MCP Beacon — Supabase 数据库 Schema
-- 版本: 0.1.0 | 日期: 2026-06-01 | 作者: AI Coder
-- 项目: AI Agent 监控平台 (SDK + 仪表盘 + 告警)
-- 技术栈: Supabase (PostgreSQL 15) + RLS
-- ============================================================
-- 
-- 表结构总览 (6 表):
--   1. users       — 用户账号（扩展 Supabase auth.users）
--   2. projects    — 项目空间、API Key 隔离
--   3. agents      — 注册的 AI Agent 实例
--   4. sessions    — 监控会话（单次对话追踪）
--   5. events      — 事件日志（LLM 调用 + HTTP 请求）
--   6. alerts      — 告警规则 + 触发实例（自引用 parent_id）
--
-- 设计原则:
--   - 隐私优先: 不存原始 prompt/completion，仅元数据
--   - 查询性能: 时间序列主表 events 用 bigserial + BRIN 索引
--   - 多租户: project_id 贯穿全局，RLS 按 user_id 隔离
--   - 免费优先: Free 用户 1 Agent、7 天数据保留（应用层裁剪）
-- ============================================================

begin;

-- ============================================================
-- 扩展
-- ============================================================
create extension if not exists "uuid-ossp"      with schema extensions;
create extension if not exists "pgcrypto"       with schema extensions;
create extension if not exists "pg_stat_statements" with schema extensions;

-- ============================================================
-- 枚举类型
-- ============================================================
do $$ begin
  create type plan_tier        as enum ('free', 'starter', 'pro');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type agent_status     as enum ('online', 'offline', 'idle');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type session_status   as enum ('active', 'completed', 'errored');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type event_type_enum  as enum ('llm_call', 'http_request');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type alert_type_enum  as enum ('cost_spike', 'error_rate', 'latency', 'loop_detected');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type alert_severity   as enum ('info', 'warning', 'high', 'critical');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type alert_status     as enum ('enabled', 'triggered', 'acknowledged', 'dismissed');
exception when duplicate_object then null;
end $$;


-- ============================================================
-- 1. USERS
--    扩展 Supabase auth.users，存储业务层用户数据
--    触发器: auth.users 插入时自动创建 public.users 行
-- ============================================================
create table public.users (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text,
  display_name  text,
  avatar_url    text,

  -- 订阅
  plan                  plan_tier not null default 'free',
  stripe_customer_id    text,
  stripe_subscription_id text,
  subscription_status   text default 'inactive',

  -- 用量统计 (物化，定时更新)
  agent_count     integer not null default 0,
  project_count   integer not null default 0,
  total_calls_30d integer not null default 0,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 注册时自动创建 profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at 自动更新
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.update_updated_at();


-- ============================================================
-- 2. PROJECTS
--    用户的项目空间，每个项目有独立 API Key
--    API Key 格式: mb_live_<32 hex chars>
-- ============================================================
create table public.projects (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references public.users(id) on delete cascade,

  name      text not null,
  api_key   text not null unique,
  api_key_prefix text generated always as (left(api_key, 11)) stored,
  api_key_last_used_at timestamptz,

  -- 用量统计
  agent_count     integer not null default 0,
  total_calls     integer not null default 0,
  total_cost_usd  numeric(12,6) not null default 0,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  unique(user_id, name)
);

-- 生成 API Key
create or replace function public.generate_api_key()
returns text as $$
begin
  return 'mb_live_' || encode(extensions.gen_random_bytes(24), 'hex');
end;
$$ language plpgsql;

create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.update_updated_at();


-- ============================================================
-- 3. AGENTS
--    注册的 AI Agent 实例，按项目隔离
--    免费用户限 1 Agent（应用层 + RLS 双重校验）
-- ============================================================
create table public.agents (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,

  name        text not null,
  version     text default '0.1.0',
  status      agent_status not null default 'offline',
  last_seen_at timestamptz,

  -- 聚合指标 (定时刷新)
  total_sessions  integer not null default 0,
  total_calls     integer not null default 0,
  total_cost_usd  numeric(12,6) not null default 0,
  error_rate_24h  numeric(5,4) not null default 0,

  metadata    jsonb default '{}',

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  unique(project_id, name)
);

create trigger trg_agents_updated_at
  before update on public.agents
  for each row execute function public.update_updated_at();


-- ============================================================
-- 4. SESSIONS
--    单次监控会话 —— 对应一次 Agent 对话/任务
--    聚合指标在 events 插入时通过触发器自动更新
-- ============================================================
create table public.sessions (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  agent_id    uuid references public.agents(id) on delete set null,

  name        text,
  status      session_status not null default 'active',
  metadata    jsonb default '{}',

  -- 聚合指标 (触发器自动更新)
  total_calls       integer not null default 0,
  total_cost_usd    numeric(12,6) not null default 0,
  total_duration_ms integer not null default 0,
  error_count       integer not null default 0,

  started_at  timestamptz not null default now(),
  ended_at    timestamptz,

  created_at  timestamptz not null default now()
);


-- ============================================================
-- 5. EVENTS
--    核心事件日志表 —— 所有 SDK 上报数据落在这里
--    设计: bigserial PK + 宽表（去 JSONB 化，便于聚合查询）
--    分区策略: 按月范围分区（Phase 2 按需开启）
-- ============================================================
create table public.events (
  id          bigserial primary key,
  project_id  uuid not null references public.projects(id) on delete cascade,
  agent_id    uuid references public.agents(id) on delete set null,
  session_id  uuid references public.sessions(id) on delete set null,

  event_type  event_type_enum not null,
  "timestamp" timestamptz not null,

  -- ── LLM Call ──
  model         text,
  provider      text,           -- openai | anthropic | deepseek
  duration_ms   integer,
  status_code   smallint,
  error         text,
  input_tokens  integer,
  output_tokens integer,
  cost_usd      numeric(10,6),

  -- ── HTTP Request ──
  http_method   text,           -- GET | POST | PUT | DELETE | ...
  url           text,
  body_bytes    integer,

  -- 去重 (SDK 重试可能发重复事件)
  idempotency_key text,

  created_at  timestamptz not null default now()
);

-- 自动更新 session 聚合指标
create or replace function public.update_session_aggregates()
returns trigger as $$
begin
  update public.sessions
  set
    total_calls       = total_calls + 1,
    total_cost_usd    = total_cost_usd + coalesce(new.cost_usd, 0),
    total_duration_ms = total_duration_ms + coalesce(new.duration_ms, 0),
    error_count       = error_count + case when new.status_code >= 400 or new.error is not null then 1 else 0 end
  where id = new.session_id and new.session_id is not null;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_events_update_session on public.events;
create trigger trg_events_update_session
  after insert on public.events
  for each row execute function public.update_session_aggregates();

-- 自动更新 agent 的 last_seen_at
create or replace function public.update_agent_last_seen()
returns trigger as $$
begin
  update public.agents
  set last_seen_at = new."timestamp", status = 'online'
  where id = new.agent_id and new.agent_id is not null;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_events_update_agent on public.events;
create trigger trg_events_update_agent
  after insert on public.events
  for each row execute function public.update_agent_last_seen();


-- ============================================================
-- 6. ALERTS
--    统一告警表: parent_id IS NULL → 规则定义
--                parent_id IS NOT NULL → 触发实例
--    支持: 成本突增、错误率飙升、延迟异常、循环检测
-- ============================================================
create table public.alerts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  project_id  uuid not null references public.projects(id) on delete cascade,
  session_id  uuid references public.sessions(id) on delete set null,

  -- 自引用: 触发实例 → 规则
  parent_id   uuid references public.alerts(id) on delete cascade,

  -- 规则定义字段 (parent_id IS NULL 时使用)
  name        text,                    -- 规则名称
  alert_type  alert_type_enum,        -- 告警类型
  enabled     boolean not null default true,
  conditions  jsonb not null default '{}',  -- 阈值等条件
  channels    jsonb not null default '["email"]',  -- 通知渠道

  -- 触发实例字段 (parent_id IS NOT NULL 时使用)
  severity    alert_severity,
  status      alert_status not null default 'enabled',
  confidence  numeric(3,2),           -- 置信度 0-1
  message     text,                    -- 告警消息
  payload     jsonb default '{}',     -- 冗余数据

  triggered_at timestamptz,
  resolved_at  timestamptz,

  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  -- 约束: 规则必须有 name + alert_type; 实例必须有 parent_id + severity
  constraint alerts_rule_check check (
    (parent_id is null and name is not null and alert_type is not null)
    or
    (parent_id is not null and severity is not null)
  )
);

create trigger trg_alerts_updated_at
  before update on public.alerts
  for each row execute function public.update_updated_at();


-- ============================================================
-- 索引
-- ============================================================

-- users
create index idx_users_plan          on public.users(plan);
create index idx_users_email         on public.users(email);

-- projects
create index idx_projects_user_id    on public.projects(user_id);
create index idx_projects_api_key    on public.projects(api_key);
create index idx_projects_name       on public.projects(user_id, name);

-- agents
create index idx_agents_project      on public.agents(project_id);
create index idx_agents_status       on public.agents(project_id, status);
create index idx_agents_last_seen    on public.agents(project_id, last_seen_at desc);

-- sessions
create index idx_sessions_project    on public.sessions(project_id);
create index idx_sessions_agent      on public.sessions(project_id, agent_id);
create index idx_sessions_status     on public.sessions(project_id, status);
create index idx_sessions_started    on public.sessions(project_id, started_at desc);

-- events (核心查询路径)
create index idx_events_project_ts   on public.events(project_id, "timestamp" desc);
create index idx_events_session      on public.events(project_id, session_id);
create index idx_events_agent        on public.events(project_id, agent_id);
create index idx_events_type         on public.events(project_id, event_type, "timestamp" desc);
create index idx_events_model        on public.events(project_id, model) where model is not null;
create index idx_events_status       on public.events(project_id, status_code) where status_code >= 400;
create index idx_events_idempotency  on public.events(project_id, idempotency_key) where idempotency_key is not null;
-- BRIN 索引用于时间范围扫描（events 表通常很大）
create index idx_events_ts_brin      on public.events using brin("timestamp");
-- 成本聚合
create index idx_events_cost         on public.events(project_id, "timestamp" desc) where cost_usd is not null;

-- alerts
create index idx_alerts_user         on public.alerts(user_id);
create index idx_alerts_project      on public.alerts(project_id);
create index idx_alerts_parent       on public.alerts(project_id, parent_id) where parent_id is not null;
create index idx_alerts_rule_active  on public.alerts(project_id, enabled) where parent_id is null and enabled = true;
create index idx_alerts_triggered    on public.alerts(project_id, triggered_at desc) where parent_id is not null;


-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

-- 启用 RLS
alter table public.users     enable row level security;
alter table public.projects  enable row level security;
alter table public.agents    enable row level security;
alter table public.sessions  enable row level security;
alter table public.events    enable row level security;
alter table public.alerts    enable row level security;

-- ── 辅助函数: 获取当前用户的项目 ID 列表 ──
create or replace function public.my_project_ids()
returns setof uuid as $$
  select id from public.projects where user_id = auth.uid();
$$ language sql stable security definer;

-- ── USERS ──
-- 用户只能读写自己的 profile
create policy "Users can read own profile"
  on public.users for select
  using (id = auth.uid());

create policy "Users can update own profile"
  on public.users for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ── PROJECTS ──
-- 用户 CRUD 自己的项目
create policy "Users can read own projects"
  on public.projects for select
  using (user_id = auth.uid());

create policy "Users can create own projects"
  on public.projects for insert
  with check (user_id = auth.uid());

create policy "Users can update own projects"
  on public.projects for update
  using (user_id = auth.uid());

create policy "Users can delete own projects"
  on public.projects for delete
  using (user_id = auth.uid());

-- ── AGENTS ──
-- 用户通过 project 拥有 agents
create policy "Users can read own agents"
  on public.agents for select
  using (project_id in (select public.my_project_ids()));

create policy "Users can create agents in own projects"
  on public.agents for insert
  with check (project_id in (select public.my_project_ids()));

create policy "Users can update own agents"
  on public.agents for update
  using (project_id in (select public.my_project_ids()));

create policy "Users can delete own agents"
  on public.agents for delete
  using (project_id in (select public.my_project_ids()));

-- Free 用户限制 1 Agent（仅限 INSERT）
create policy "Free users limited to 1 agent"
  on public.agents for insert
  with check (
    (select plan from public.users where id = auth.uid()) != 'free'
    or
    (select count(*) from public.agents where project_id in (select public.my_project_ids())) < 1
  );

-- ── SESSIONS ──
create policy "Users can read own sessions"
  on public.sessions for select
  using (project_id in (select public.my_project_ids()));

-- SDK 可通过 API Key 关联的 project 写入 session
create policy "API Key can insert sessions"
  on public.sessions for insert
  with check (true);  -- Ingest API 层做 API Key 鉴权，此处宽松

create policy "Users can update own sessions"
  on public.sessions for update
  using (project_id in (select public.my_project_ids()));

-- ── EVENTS ──
-- 用户只能读自己项目的 events
create policy "Users can read own events"
  on public.events for select
  using (project_id in (select public.my_project_ids()));

-- SDK 通过 Ingest API 写入（使用 service_role key，绕过 RLS）
-- 因此 events 的 INSERT 策略开放给 authenticated
create policy "Authenticated can insert events"
  on public.events for insert
  with check (true);  -- Ingest API 层做 API Key → project 映射校验

-- 禁止直接 UPDATE/DELETE events（仅 service_role 可操作）
create policy "No direct event updates"
  on public.events for update
  using (false);

create policy "No direct event deletes"
  on public.events for delete
  using (false);

-- ── ALERTS ──
create policy "Users can read own alerts"
  on public.alerts for select
  using (user_id = auth.uid());

create policy "Users can create alert rules"
  on public.alerts for insert
  with check (
    user_id = auth.uid()
    and project_id in (select public.my_project_ids())
  );

create policy "Users can update own alerts"
  on public.alerts for update
  using (user_id = auth.uid());

create policy "Users can delete own alerts"
  on public.alerts for delete
  using (user_id = auth.uid());


-- ============================================================
-- Cron 聚合 / 物化 (Phase 2: 通过 pg_cron 或 QStash 定时触发)
-- ============================================================

-- 每小时: 更新 agents 聚合指标
create or replace function public.refresh_agent_aggregates()
returns void as $$
begin
  update public.agents a
  set
    total_sessions = (select count(*) from public.sessions s where s.agent_id = a.id),
    total_calls    = (select count(*) from public.events e where e.agent_id = a.id),
    total_cost_usd = (select coalesce(sum(e.cost_usd), 0) from public.events e where e.agent_id = a.id),
    error_rate_24h = (
      select coalesce(
        count(*) filter (where e.status_code >= 400)::numeric
        / nullif(count(*), 0), 0
      )
      from public.events e
      where e.agent_id = a.id
        and e."timestamp" > now() - interval '24 hours'
    );
end;
$$ language plpgsql security definer;

-- 每天: 清理过期数据 (Free: 7天, Starter: 30天, Pro: 不删)
create or replace function public.clean_old_events()
returns void as $$
begin
  delete from public.events
  where "timestamp" < now() - interval '7 days'
    and project_id in (
      select p.id from public.projects p
      join public.users u on u.id = p.user_id
      where u.plan = 'free'
    );

  delete from public.events
  where "timestamp" < now() - interval '30 days'
    and project_id in (
      select p.id from public.projects p
      join public.users u on u.id = p.user_id
      where u.plan = 'starter'
    );
end;
$$ language plpgsql security definer;

-- 每天: 自动将 5 分钟未上报的 Agent 标记为 idle，24 小时未上报的标记为 offline
create or replace function public.update_agent_heartbeats()
returns void as $$
begin
  update public.agents
  set status = 'idle'
  where status = 'online'
    and last_seen_at < now() - interval '5 minutes';

  update public.agents
  set status = 'offline'
  where status in ('online', 'idle')
    and last_seen_at < now() - interval '24 hours';

  -- 自动结束超过 24 小时无活动的 active sessions
  update public.sessions
  set status = 'completed', ended_at = now()
  where status = 'active'
    and started_at < now() - interval '24 hours';
end;
$$ language plpgsql security definer;


commit;
