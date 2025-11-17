// lib/types.ts

export type StepStatus = "not_started" | "in_progress" | "done" | "blocked";

export type SourceType =
  | "industry_report"
  | "academic"
  | "government"
  | "competitor"
  | "interview"
  | "survey"
  | "internal"
  | "news"
  | "other";

export type Confidence = "high" | "medium" | "low";

export type MetricCategory =
  | "market_size"
  | "growth_rate"
  | "pricing"
  | "adoption"
  | "competitive"
  | "segment"
  | "behavioral"
  | "other";

// Database types (these should match your Supabase schema)
export interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at?: string;
}

export interface ResearchRun {
  id: string;
  project_id: string;
  label: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at?: string;
}

export interface ResearchStep {
  id: string;
  research_run_id: string;
  order_index: number;
  title: string;
  notes: string;
  status: StepStatus;
  due_date?: string;
  created_at: string;
  updated_at?: string;
}

export interface Source {
  id: string;
  research_run_id: string;
  research_step_id?: string;
  project_id?: string;
  title: string;
  url?: string;
  source_type: SourceType;
  publisher?: string;
  year?: number;
  geography?: string;
  metric_category?: MetricCategory;
  confidence?: Confidence;
  key_figures?: string;
  usage_notes?: string;
  methodology?: string;
  limitations?: string;
  date_accessed?: string;
  created_at: string;
  updated_at?: string;
}
