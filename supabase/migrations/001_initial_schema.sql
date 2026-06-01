-- ============================================================================
-- MCP Beacon — Initial Database Schema
-- Migration: 001_initial_schema
-- ============================================================================

-- Extensions ----------------------------------------------------------------
create extension if not exists "uuid-ossp" with schema extensions;

-- Custom Types --------------------------------------------------------------
do $$ begin
  create type alert_type as enum ('cost', 'error', 'latency', 'loop');
exception
  when duplicate_object then null;
end $$;

-- Utility -------------------------------------------------------------------
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql security definer;


-- ============================================================================
-- 1. profiles — User extensions (extends auth.users)
-- ============================================================================
create table public.profiles (
  id         uuid        primary key references auth.users(id) on delete cascade,
  email      text,
  full_name  text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();


-- ============================================================================
-- 2. projects — Projects owned by users
-- ============================================================================
create table public.projects (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.profiles(id) on delete cascade,
  name        text        not null,
  description text,
  created_at  timestamptz not null default now()
);


-- ============================================================================
-- 3. api_keys — API keys scoped to a project
-- ============================================================================
create table public.api_keys (
  id           uuid        primary key default gen_random_uuid(),
  project_id   uuid        not null references public.projects(id) on delete cascade,
  key_hash     text        not null,
  name         text,
  last_used_at timestamptz,
  created_at   timestamptz not null default now(),
  revoked_at   timestamptz
);


-- ============================================================================
-- 4. agents — Agent registrations per project
-- ============================================================================
create table public.agents (
  id         uuid        primary key default gen_random_uuid(),
  project_id uuid        not null references public.projects(id) on delete cascade,
  name       text        not null,
  type       text,
  config     jsonb,
  created_at timestamptz not null default now()
);


-- ============================================================================
-- 5. sessions — Agent conversation sessions
-- ============================================================================
create table public.sessions (
  id          uuid           primary key default gen_random_uuid(),
  agent_id    uuid           not null references public.agents(id) on delete cascade,
  started_at  timestamptz    not null default now(),
  ended_at    timestamptz,
  total_cost  numeric(10,6)  default 0,
  total_tokens int            default 0,
  status      text
);


-- ============================================================================
-- 6. traces — API call trace records
-- ============================================================================
create table public.traces (
  id                uuid           primary key default gen_random_uuid(),
  session_id        uuid           not null references public.sessions(id) on delete cascade,
  model             text,
  provider          text,
  prompt_tokens     int,
  completion_tokens int,
  latency_ms        int,
  cost              numeric(10,6),
  status_code       int,
  error_message     text,
  request_body      jsonb,
  response_body     jsonb,
  created_at        timestamptz    not null default now()
);


-- ============================================================================
-- 7. alerts — Alert rules per project
-- ============================================================================
create table public.alerts (
  id                    uuid        primary key default gen_random_uuid(),
  project_id            uuid        not null references public.projects(id) on delete cascade,
  name                  text        not null,
  type                  alert_type  not null,
  threshold_value       numeric,
  enabled               boolean     not null default true,
  notification_channels jsonb,
  created_at            timestamptz not null default now()
);


-- ============================================================================
-- 8. alert_logs — Alert trigger history
-- ============================================================================
create table public.alert_logs (
  id              uuid        primary key default gen_random_uuid(),
  alert_id        uuid        not null references public.alerts(id) on delete cascade,
  triggered_at    timestamptz not null default now(),
  value           numeric,
  acknowledged    boolean     not null default false,
  acknowledged_at timestamptz
);


-- ============================================================================
-- Indexes
-- ============================================================================

-- traces
create index idx_traces_created_at  on public.traces (created_at desc);
create index idx_traces_session_id  on public.traces (session_id);
create index idx_traces_model       on public.traces (model);

-- sessions
create index idx_sessions_agent_id   on public.sessions (agent_id);
create index idx_sessions_started_at on public.sessions (started_at desc);

-- Foreign-key lookups (performance)
create index idx_projects_user_id      on public.projects (user_id);
create index idx_api_keys_project_id   on public.api_keys (project_id);
create index idx_agents_project_id     on public.agents (project_id);
create index idx_alerts_project_id     on public.alerts (project_id);
create index idx_alert_logs_alert_id   on public.alert_logs (alert_id);


-- ============================================================================
-- Row-Level Security (RLS)
-- ============================================================================

-- Profiles: users can only read/write their own row -------------------------
alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_delete_own"
  on public.profiles for delete
  using (auth.uid() = id);


-- Projects: user_id must match auth.uid() -----------------------------------
alter table public.projects enable row level security;

create policy "projects_select_own"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "projects_insert_own"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "projects_update_own"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "projects_delete_own"
  on public.projects for delete
  using (auth.uid() = user_id);


-- API Keys: ownership via project_id → projects.user_id ---------------------
alter table public.api_keys enable row level security;

create policy "api_keys_select_own"
  on public.api_keys for select
  using (
    exists (
      select 1 from public.projects
      where projects.id = api_keys.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "api_keys_insert_own"
  on public.api_keys for insert
  with check (
    exists (
      select 1 from public.projects
      where projects.id = api_keys.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "api_keys_update_own"
  on public.api_keys for update
  using (
    exists (
      select 1 from public.projects
      where projects.id = api_keys.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "api_keys_delete_own"
  on public.api_keys for delete
  using (
    exists (
      select 1 from public.projects
      where projects.id = api_keys.project_id
        and projects.user_id = auth.uid()
    )
  );


-- Agents: ownership via project_id → projects.user_id -----------------------
alter table public.agents enable row level security;

create policy "agents_select_own"
  on public.agents for select
  using (
    exists (
      select 1 from public.projects
      where projects.id = agents.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "agents_insert_own"
  on public.agents for insert
  with check (
    exists (
      select 1 from public.projects
      where projects.id = agents.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "agents_update_own"
  on public.agents for update
  using (
    exists (
      select 1 from public.projects
      where projects.id = agents.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "agents_delete_own"
  on public.agents for delete
  using (
    exists (
      select 1 from public.projects
      where projects.id = agents.project_id
        and projects.user_id = auth.uid()
    )
  );


-- Sessions: ownership via agent_id → agents.project_id → projects.user_id ---
alter table public.sessions enable row level security;

create policy "sessions_select_own"
  on public.sessions for select
  using (
    exists (
      select 1 from public.agents
      join public.projects on projects.id = agents.project_id
      where agents.id = sessions.agent_id
        and projects.user_id = auth.uid()
    )
  );

create policy "sessions_insert_own"
  on public.sessions for insert
  with check (
    exists (
      select 1 from public.agents
      join public.projects on projects.id = agents.project_id
      where agents.id = sessions.agent_id
        and projects.user_id = auth.uid()
    )
  );

create policy "sessions_update_own"
  on public.sessions for update
  using (
    exists (
      select 1 from public.agents
      join public.projects on projects.id = agents.project_id
      where agents.id = sessions.agent_id
        and projects.user_id = auth.uid()
    )
  );

create policy "sessions_delete_own"
  on public.sessions for delete
  using (
    exists (
      select 1 from public.agents
      join public.projects on projects.id = agents.project_id
      where agents.id = sessions.agent_id
        and projects.user_id = auth.uid()
    )
  );


-- Traces: ownership via session_id → sessions.agent_id → … → projects.user_id
alter table public.traces enable row level security;

create policy "traces_select_own"
  on public.traces for select
  using (
    exists (
      select 1 from public.sessions
      join public.agents   on agents.id   = sessions.agent_id
      join public.projects on projects.id = agents.project_id
      where sessions.id = traces.session_id
        and projects.user_id = auth.uid()
    )
  );

create policy "traces_insert_own"
  on public.traces for insert
  with check (
    exists (
      select 1 from public.sessions
      join public.agents   on agents.id   = sessions.agent_id
      join public.projects on projects.id = agents.project_id
      where sessions.id = traces.session_id
        and projects.user_id = auth.uid()
    )
  );

create policy "traces_update_own"
  on public.traces for update
  using (
    exists (
      select 1 from public.sessions
      join public.agents   on agents.id   = sessions.agent_id
      join public.projects on projects.id = agents.project_id
      where sessions.id = traces.session_id
        and projects.user_id = auth.uid()
    )
  );

create policy "traces_delete_own"
  on public.traces for delete
  using (
    exists (
      select 1 from public.sessions
      join public.agents   on agents.id   = sessions.agent_id
      join public.projects on projects.id = agents.project_id
      where sessions.id = traces.session_id
        and projects.user_id = auth.uid()
    )
  );


-- Alerts: ownership via project_id → projects.user_id -----------------------
alter table public.alerts enable row level security;

create policy "alerts_select_own"
  on public.alerts for select
  using (
    exists (
      select 1 from public.projects
      where projects.id = alerts.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "alerts_insert_own"
  on public.alerts for insert
  with check (
    exists (
      select 1 from public.projects
      where projects.id = alerts.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "alerts_update_own"
  on public.alerts for update
  using (
    exists (
      select 1 from public.projects
      where projects.id = alerts.project_id
        and projects.user_id = auth.uid()
    )
  );

create policy "alerts_delete_own"
  on public.alerts for delete
  using (
    exists (
      select 1 from public.projects
      where projects.id = alerts.project_id
        and projects.user_id = auth.uid()
    )
  );


-- Alert Logs: ownership via alert_id → alerts.project_id → projects.user_id --
alter table public.alert_logs enable row level security;

create policy "alert_logs_select_own"
  on public.alert_logs for select
  using (
    exists (
      select 1 from public.alerts
      join public.projects on projects.id = alerts.project_id
      where alerts.id = alert_logs.alert_id
        and projects.user_id = auth.uid()
    )
  );

create policy "alert_logs_insert_own"
  on public.alert_logs for insert
  with check (
    exists (
      select 1 from public.alerts
      join public.projects on projects.id = alerts.project_id
      where alerts.id = alert_logs.alert_id
        and projects.user_id = auth.uid()
    )
  );

create policy "alert_logs_update_own"
  on public.alert_logs for update
  using (
    exists (
      select 1 from public.alerts
      join public.projects on projects.id = alerts.project_id
      where alerts.id = alert_logs.alert_id
        and projects.user_id = auth.uid()
    )
  );

create policy "alert_logs_delete_own"
  on public.alert_logs for delete
  using (
    exists (
      select 1 from public.alerts
      join public.projects on projects.id = alerts.project_id
      where alerts.id = alert_logs.alert_id
        and projects.user_id = auth.uid()
    )
  );
