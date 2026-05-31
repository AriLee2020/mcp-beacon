-- ============================================
-- MCP Beacon: Supabase Schema
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. users — extended user profile (auth.users is built-in)
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL UNIQUE,
  display_name    TEXT,
  avatar_url      TEXT,
  stripe_customer_id TEXT,
  plan            TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- 2. projects
-- ============================================
CREATE TABLE IF NOT EXISTS public.projects (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  description         TEXT,
  api_key             TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  daily_request_limit INTEGER NOT NULL DEFAULT 10000,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- 3. agents — monitored AI agent instances
-- ============================================
CREATE TABLE IF NOT EXISTS public.agents (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id  UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  provider    TEXT NOT NULL CHECK (provider IN ('openai', 'anthropic', 'deepseek', 'custom')),
  model       TEXT NOT NULL,
  config      JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- 4. sessions — per‑agent monitoring session
-- ============================================
CREATE TABLE IF NOT EXISTS public.sessions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id        UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'error')),
  input_tokens    BIGINT NOT NULL DEFAULT 0,
  output_tokens   BIGINT NOT NULL DEFAULT 0,
  total_cost      NUMERIC(10, 6) NOT NULL DEFAULT 0,
  request_count   INTEGER NOT NULL DEFAULT 0,
  started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at        TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- 5. alerts — monitoring alerts
-- ============================================
CREATE TABLE IF NOT EXISTS public.alerts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id  UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('cost_spike', 'rate_limit', 'loop_detected', 'error_rate')),
  severity    TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  message     TEXT NOT NULL,
  metadata    JSONB DEFAULT '{}',
  resolved    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- Indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_project_id ON public.agents(project_id);
CREATE INDEX IF NOT EXISTS idx_sessions_agent_id ON public.sessions(agent_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON public.sessions(status);
CREATE INDEX IF NOT EXISTS idx_alerts_project_id ON public.alerts(project_id);
CREATE INDEX IF NOT EXISTS idx_alerts_resolved ON public.alerts(resolved);

-- ============================================
-- RLS (Row Level Security)
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- users: user can read/update their own row
CREATE POLICY users_self_read ON public.users FOR SELECT
  USING (auth.uid() = id);
CREATE POLICY users_self_update ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- projects: owner-only access
CREATE POLICY projects_owner_all ON public.projects FOR ALL
  USING (auth.uid() = user_id);

-- agents: project owner access
CREATE POLICY agents_project_owner ON public.agents FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.projects WHERE projects.id = agents.project_id AND projects.user_id = auth.uid()
  ));

-- sessions: agent → project → user access
CREATE POLICY sessions_project_owner ON public.sessions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.agents
    JOIN public.projects ON projects.id = agents.project_id
    WHERE agents.id = sessions.agent_id AND projects.user_id = auth.uid()
  ));

-- alerts: project owner access
CREATE POLICY alerts_project_owner ON public.alerts FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.projects WHERE projects.id = alerts.project_id AND projects.user_id = auth.uid()
  ));

-- ============================================
-- Service Role bypass (for SDK reporting)
-- ============================================
CREATE POLICY service_role_all ON public.projects FOR ALL
  TO service_role USING (true);
CREATE POLICY service_role_all ON public.agents FOR ALL
  TO service_role USING (true);
CREATE POLICY service_role_all ON public.sessions FOR ALL
  TO service_role USING (true);
CREATE POLICY service_role_all ON public.alerts FOR ALL
  TO service_role USING (true);

-- ============================================
-- Auto-create user profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name, avatar_url)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email), NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
