-- Market Research App - Initial Schema Migration
-- This creates the core tables for managing market research projects, runs, steps, and sources

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Research Runs table
CREATE TABLE IF NOT EXISTS research_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Research Steps table (19-step methodology)
CREATE TABLE IF NOT EXISTS research_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  research_run_id UUID NOT NULL REFERENCES research_runs(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title TEXT NOT NULL,
  notes TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'done', 'blocked')),
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  UNIQUE(research_run_id, order_index)
);

-- Sources table (evidence log)
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  research_run_id UUID NOT NULL REFERENCES research_runs(id) ON DELETE CASCADE,
  research_step_id UUID REFERENCES research_steps(id) ON DELETE SET NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  -- Core metadata
  title TEXT NOT NULL,
  url TEXT,
  source_type TEXT NOT NULL CHECK (source_type IN (
    'industry_report', 'academic', 'government', 'competitor',
    'interview', 'survey', 'internal', 'news', 'other'
  )),

  -- Publication info
  publisher TEXT,
  year INTEGER,
  geography TEXT,

  -- Research metadata
  metric_category TEXT CHECK (metric_category IN (
    'market_size', 'growth_rate', 'pricing', 'adoption',
    'competitive', 'segment', 'behavioral', 'other'
  )),
  confidence TEXT CHECK (confidence IN ('high', 'medium', 'low')),

  -- Content
  key_figures TEXT,
  usage_notes TEXT,
  methodology TEXT,
  limitations TEXT,

  -- Timestamps
  date_accessed DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_research_runs_project_id ON research_runs(project_id);
CREATE INDEX IF NOT EXISTS idx_research_steps_run_id ON research_steps(research_run_id);
CREATE INDEX IF NOT EXISTS idx_research_steps_order ON research_steps(research_run_id, order_index);
CREATE INDEX IF NOT EXISTS idx_sources_run_id ON sources(research_run_id);
CREATE INDEX IF NOT EXISTS idx_sources_step_id ON sources(research_step_id);
CREATE INDEX IF NOT EXISTS idx_sources_project_id ON sources(project_id);
CREATE INDEX IF NOT EXISTS idx_sources_type ON sources(source_type);
CREATE INDEX IF NOT EXISTS idx_sources_confidence ON sources(confidence);

-- Row Level Security (RLS) policies
-- For now, we'll enable RLS but allow all operations (you can customize later)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users (customize as needed)
CREATE POLICY "Allow all for authenticated users" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON research_runs FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON research_steps FOR ALL USING (true);
CREATE POLICY "Allow all for authenticated users" ON sources FOR ALL USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_runs_updated_at BEFORE UPDATE ON research_runs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_steps_updated_at BEFORE UPDATE ON research_steps
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON sources
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
