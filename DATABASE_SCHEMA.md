# Database Schema Documentation

This document describes the database schema for the Market Research App.

## Overview

The database is built on PostgreSQL (via Supabase) and consists of 4 main tables:

1. **projects** - Top-level container for research projects
2. **research_runs** - Individual research cycles within a project
3. **research_steps** - The 19-step methodology tasks
4. **sources** - Evidence log with all research sources

## Entity Relationship Diagram

```
projects (1) ──< (N) research_runs (1) ──< (N) research_steps
    │                      │
    │                      │
    └──────< (N) sources <─┘
                  │
                  └──< (optional) research_steps
```

## Tables

### `projects`

Top-level container representing a venture or initiative (e.g., "Aurora", "PVT Hostel").

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Auto-generated unique identifier |
| `name` | TEXT | NOT NULL | Project name |
| `description` | TEXT | | Project description |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | | Last update timestamp (auto-updated) |

**Example:**
```sql
INSERT INTO projects (name, description) VALUES
  ('Aurora', 'AI-native OTA alternative for global hostel booking'),
  ('WisdomOS', 'Self-improvement platform with AI coaching');
```

### `research_runs`

A specific research cycle or "run" within a project. A project can have multiple runs over time.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Auto-generated unique identifier |
| `project_id` | UUID | NOT NULL, FK → projects | Parent project |
| `label` | TEXT | NOT NULL | Short label (e.g., "MR-2025-Q1") |
| `description` | TEXT | | Run description |
| `start_date` | DATE | | Research start date |
| `end_date` | DATE | | Research end date |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | | Last update timestamp (auto-updated) |

**Indexes:**
- `idx_research_runs_project_id` on `project_id`

**Example:**
```sql
INSERT INTO research_runs (project_id, label, description, start_date) VALUES
  ('uuid-of-aurora-project', 'MR-2025-Q1', 'Global OTA/Hostel Market Research', '2025-01-15');
```

### `research_steps`

The 19-step market research methodology. Each run gets 19 steps created automatically.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Auto-generated unique identifier |
| `research_run_id` | UUID | NOT NULL, FK → research_runs | Parent research run |
| `order_index` | INTEGER | NOT NULL | Step number (1-19) |
| `title` | TEXT | NOT NULL | Step title |
| `notes` | TEXT | NOT NULL | Guidance/instructions for this step |
| `status` | TEXT | NOT NULL, DEFAULT 'not_started' | One of: not_started, in_progress, done, blocked |
| `due_date` | DATE | | Optional due date for this step |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | | Last update timestamp (auto-updated) |

**Constraints:**
- `UNIQUE(research_run_id, order_index)` - Each run has exactly one of each step
- `CHECK (status IN ('not_started', 'in_progress', 'done', 'blocked'))`

**Indexes:**
- `idx_research_steps_run_id` on `research_run_id`
- `idx_research_steps_order` on `(research_run_id, order_index)`

**Example:**
```sql
-- These are auto-created from lib/marketResearchSteps.ts when a run is initialized
INSERT INTO research_steps (research_run_id, order_index, title, notes) VALUES
  ('run-uuid', 1, 'Define Decision Context & Research Objectives', '...'),
  ('run-uuid', 2, 'Define Market Definition & Boundaries', '...'),
  ...
  ('run-uuid', 19, 'Documentation, Source Log & Knowledge Base Update', '...');
```

### `sources`

The evidence log. Each source is a research input with metadata, figures, and confidence ratings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Auto-generated unique identifier |
| `research_run_id` | UUID | NOT NULL, FK → research_runs | Parent research run |
| `research_step_id` | UUID | FK → research_steps | Which step this source belongs to (optional) |
| `project_id` | UUID | FK → projects | Parent project (optional, for cross-run sources) |
| **Core Metadata** |
| `title` | TEXT | NOT NULL | Source title |
| `url` | TEXT | | URL to source |
| `source_type` | TEXT | NOT NULL | Type: industry_report, academic, government, competitor, interview, survey, internal, news, other |
| **Publication Info** |
| `publisher` | TEXT | | Publisher name |
| `year` | INTEGER | | Publication year |
| `geography` | TEXT | | Geographic scope (e.g., "Global", "North America") |
| **Research Metadata** |
| `metric_category` | TEXT | | Category: market_size, growth_rate, pricing, adoption, competitive, segment, behavioral, other |
| `confidence` | TEXT | | Confidence level: high, medium, low |
| **Content** |
| `key_figures` | TEXT | | Important numbers or findings |
| `usage_notes` | TEXT | | How to use this source |
| `methodology` | TEXT | | Research methodology notes |
| `limitations` | TEXT | | Known limitations or caveats |
| **Timestamps** |
| `date_accessed` | DATE | | When the source was accessed |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | | Last update timestamp (auto-updated) |

**Constraints:**
- `CHECK (source_type IN (...))`
- `CHECK (metric_category IN (...))`
- `CHECK (confidence IN ('high', 'medium', 'low'))`

**Indexes:**
- `idx_sources_run_id` on `research_run_id`
- `idx_sources_step_id` on `research_step_id`
- `idx_sources_project_id` on `project_id`
- `idx_sources_type` on `source_type`
- `idx_sources_confidence` on `confidence`

**Example:**
```sql
INSERT INTO sources (
  research_run_id, research_step_id, title, url, source_type,
  metric_category, confidence, key_figures, publisher, year, geography
) VALUES (
  'run-uuid', 'step-5-uuid',
  'Global Tourism Market Size 2024-2030',
  'https://example.com/report',
  'industry_report',
  'market_size',
  'high',
  'Global tourism TAM: $1.2T (2024), projected $1.8T (2030), CAGR 7.2%',
  'McKinsey & Company',
  2024,
  'Global'
);
```

## Enums

### Step Status
- `not_started` - Step has not been started
- `in_progress` - Currently working on this step
- `done` - Step completed
- `blocked` - Step is blocked and cannot proceed

### Source Type
- `industry_report` - Commercial market research reports
- `academic` - Academic papers and journals
- `government` - Government statistics and reports
- `competitor` - Competitor filings, decks, and public data
- `interview` - Primary research interviews
- `survey` - Survey data
- `internal` - Internal PVT ecosystem data
- `news` - News articles and media
- `other` - Other sources

### Metric Category
- `market_size` - TAM/SAM/SOM data
- `growth_rate` - CAGR and growth projections
- `pricing` - Pricing benchmarks and models
- `adoption` - Adoption rates and curves
- `competitive` - Competitive landscape data
- `segment` - Market segmentation data
- `behavioral` - Customer behavior insights
- `other` - Other metrics

### Confidence Level
- `high` - High confidence (verified, multiple sources, primary data)
- `medium` - Medium confidence (credible source, some verification)
- `low` - Low confidence (unverified, single source, outdated)

## Row Level Security (RLS)

All tables have RLS enabled. Current policies allow all operations for authenticated users.

**To customize:**
```sql
-- Example: Only allow users to see projects they're assigned to
CREATE POLICY "Users see their projects" ON projects
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM project_members WHERE project_id = id));
```

## Triggers

All tables have `updated_at` triggers that automatically update the timestamp on any UPDATE operation.

## Common Queries

### Get all research runs for a project with step completion count
```sql
SELECT
  rr.*,
  COUNT(CASE WHEN rs.status = 'done' THEN 1 END) as completed_steps,
  COUNT(rs.id) as total_steps
FROM research_runs rr
LEFT JOIN research_steps rs ON rs.research_run_id = rr.id
WHERE rr.project_id = 'project-uuid'
GROUP BY rr.id
ORDER BY rr.created_at DESC;
```

### Get sources with step info for a research run
```sql
SELECT
  s.*,
  rs.order_index,
  rs.title as step_title
FROM sources s
LEFT JOIN research_steps rs ON rs.id = s.research_step_id
WHERE s.research_run_id = 'run-uuid'
ORDER BY rs.order_index, s.created_at;
```

### Get completion status for a research run
```sql
SELECT
  status,
  COUNT(*) as count
FROM research_steps
WHERE research_run_id = 'run-uuid'
GROUP BY status;
```

## Migration Instructions

1. **Using Supabase Dashboard:**
   - Go to SQL Editor
   - Paste the contents of `supabase/migrations/001_initial_schema.sql`
   - Run the migration

2. **Using Supabase CLI:**
   ```bash
   supabase db push
   ```

3. **Manual PostgreSQL:**
   ```bash
   psql -d your_database < supabase/migrations/001_initial_schema.sql
   ```
