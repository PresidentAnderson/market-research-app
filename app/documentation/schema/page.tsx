import Link from "next/link";

export default function SchemaPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16">
        {/* Navigation */}
        <Link
          href="/documentation"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Documentation
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Database Schema
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            PostgreSQL database architecture for storing projects, research runs, steps, and sources.
          </p>
        </div>

        {/* Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-muted-foreground mb-6">
            The database consists of 4 core tables designed to capture the complete lifecycle of market research
            projects—from high-level project organization down to individual source citations.
          </p>

          {/* ERD */}
          <div className="rounded-lg border bg-card p-8 font-mono text-sm">
            <pre className="text-muted-foreground whitespace-pre">
{`projects (1) ──< (N) research_runs (1) ──< (N) research_steps
    │                      │
    │                      │
    └──────< (N) sources <─┘
                  │
                  └──< (optional) research_steps`}
            </pre>
          </div>
        </div>

        {/* Tables */}
        <div className="space-y-12">
          {/* Projects */}
          <section>
            <div className="mb-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4">
              <h2 className="text-2xl font-semibold text-blue-700">
                projects
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Top-level container representing a venture or initiative
              </p>
            </div>

            <div className="rounded-lg border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="border-b">
                    <th className="p-3 text-left font-semibold">Column</th>
                    <th className="p-3 text-left font-semibold">Type</th>
                    <th className="p-3 text-left font-semibold">Constraints</th>
                    <th className="p-3 text-left font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3 font-mono text-xs">id</td>
                    <td className="p-3 font-mono text-xs">UUID</td>
                    <td className="p-3 text-xs">PRIMARY KEY</td>
                    <td className="p-3 text-xs text-muted-foreground">Auto-generated unique identifier</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">name</td>
                    <td className="p-3 font-mono text-xs">TEXT</td>
                    <td className="p-3 text-xs">NOT NULL</td>
                    <td className="p-3 text-xs text-muted-foreground">Project name (e.g., "Aurora", "WisdomOS")</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">description</td>
                    <td className="p-3 font-mono text-xs">TEXT</td>
                    <td className="p-3 text-xs">—</td>
                    <td className="p-3 text-xs text-muted-foreground">Optional project description</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">created_at</td>
                    <td className="p-3 font-mono text-xs">TIMESTAMPTZ</td>
                    <td className="p-3 text-xs">NOT NULL, DEFAULT NOW()</td>
                    <td className="p-3 text-xs text-muted-foreground">Creation timestamp</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">updated_at</td>
                    <td className="p-3 font-mono text-xs">TIMESTAMPTZ</td>
                    <td className="p-3 text-xs">—</td>
                    <td className="p-3 text-xs text-muted-foreground">Auto-updated on changes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 rounded-lg bg-muted p-4 font-mono text-xs">
              <div className="text-muted-foreground mb-2">Example:</div>
              <pre className="text-foreground whitespace-pre-wrap">
{`INSERT INTO projects (name, description) VALUES
  ('Aurora', 'AI-native OTA alternative for global hostel booking'),
  ('WisdomOS', 'Self-improvement platform with AI coaching');`}
              </pre>
            </div>
          </section>

          {/* Research Runs */}
          <section>
            <div className="mb-6 rounded-lg border-l-4 border-green-500 bg-green-50 p-4">
              <h2 className="text-2xl font-semibold text-green-700">
                research_runs
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A specific research cycle or "run" within a project
              </p>
            </div>

            <div className="rounded-lg border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="border-b">
                    <th className="p-3 text-left font-semibold">Column</th>
                    <th className="p-3 text-left font-semibold">Type</th>
                    <th className="p-3 text-left font-semibold">Constraints</th>
                    <th className="p-3 text-left font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3 font-mono text-xs">id</td>
                    <td className="p-3 font-mono text-xs">UUID</td>
                    <td className="p-3 text-xs">PRIMARY KEY</td>
                    <td className="p-3 text-xs text-muted-foreground">Auto-generated unique identifier</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">project_id</td>
                    <td className="p-3 font-mono text-xs">UUID</td>
                    <td className="p-3 text-xs">NOT NULL, FK → projects</td>
                    <td className="p-3 text-xs text-muted-foreground">Parent project reference</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">label</td>
                    <td className="p-3 font-mono text-xs">TEXT</td>
                    <td className="p-3 text-xs">NOT NULL</td>
                    <td className="p-3 text-xs text-muted-foreground">Short label (e.g., "MR-2025-Q1")</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">description</td>
                    <td className="p-3 font-mono text-xs">TEXT</td>
                    <td className="p-3 text-xs">—</td>
                    <td className="p-3 text-xs text-muted-foreground">Run description</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">start_date</td>
                    <td className="p-3 font-mono text-xs">DATE</td>
                    <td className="p-3 text-xs">—</td>
                    <td className="p-3 text-xs text-muted-foreground">Research start date</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">end_date</td>
                    <td className="p-3 font-mono text-xs">DATE</td>
                    <td className="p-3 text-xs">—</td>
                    <td className="p-3 text-xs text-muted-foreground">Research end date</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">created_at</td>
                    <td className="p-3 font-mono text-xs">TIMESTAMPTZ</td>
                    <td className="p-3 text-xs">NOT NULL, DEFAULT NOW()</td>
                    <td className="p-3 text-xs text-muted-foreground">Creation timestamp</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">updated_at</td>
                    <td className="p-3 font-mono text-xs">TIMESTAMPTZ</td>
                    <td className="p-3 text-xs">—</td>
                    <td className="p-3 text-xs text-muted-foreground">Auto-updated on changes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs font-semibold mb-1">Indexes:</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• <code className="bg-background px-1 py-0.5 rounded">idx_research_runs_project_id</code> on <code className="bg-background px-1 py-0.5 rounded">project_id</code></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Research Steps */}
          <section>
            <div className="mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
              <h2 className="text-2xl font-semibold text-yellow-700">
                research_steps
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The 19-step market research methodology (auto-created per run)
              </p>
            </div>

            <div className="rounded-lg border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="border-b">
                    <th className="p-3 text-left font-semibold">Column</th>
                    <th className="p-3 text-left font-semibold">Type</th>
                    <th className="p-3 text-left font-semibold">Constraints</th>
                    <th className="p-3 text-left font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-3 font-mono text-xs">id</td>
                    <td className="p-3 font-mono text-xs">UUID</td>
                    <td className="p-3 text-xs">PRIMARY KEY</td>
                    <td className="p-3 text-xs text-muted-foreground">Auto-generated unique identifier</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">research_run_id</td>
                    <td className="p-3 font-mono text-xs">UUID</td>
                    <td className="p-3 text-xs">NOT NULL, FK → research_runs</td>
                    <td className="p-3 text-xs text-muted-foreground">Parent research run</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">order_index</td>
                    <td className="p-3 font-mono text-xs">INTEGER</td>
                    <td className="p-3 text-xs">NOT NULL</td>
                    <td className="p-3 text-xs text-muted-foreground">Step number (1-19)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">title</td>
                    <td className="p-3 font-mono text-xs">TEXT</td>
                    <td className="p-3 text-xs">NOT NULL</td>
                    <td className="p-3 text-xs text-muted-foreground">Step title</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">notes</td>
                    <td className="p-3 font-mono text-xs">TEXT</td>
                    <td className="p-3 text-xs">NOT NULL</td>
                    <td className="p-3 text-xs text-muted-foreground">Guidance/instructions for step</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">status</td>
                    <td className="p-3 font-mono text-xs">TEXT</td>
                    <td className="p-3 text-xs">NOT NULL, DEFAULT 'not_started'</td>
                    <td className="p-3 text-xs text-muted-foreground">not_started | in_progress | done | blocked</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">due_date</td>
                    <td className="p-3 font-mono text-xs">DATE</td>
                    <td className="p-3 text-xs">—</td>
                    <td className="p-3 text-xs text-muted-foreground">Optional due date</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">created_at</td>
                    <td className="p-3 font-mono text-xs">TIMESTAMPTZ</td>
                    <td className="p-3 text-xs">NOT NULL, DEFAULT NOW()</td>
                    <td className="p-3 text-xs text-muted-foreground">Creation timestamp</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">updated_at</td>
                    <td className="p-3 font-mono text-xs">TIMESTAMPTZ</td>
                    <td className="p-3 text-xs">—</td>
                    <td className="p-3 text-xs text-muted-foreground">Auto-updated on changes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs font-semibold mb-1">Constraints:</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• <code className="bg-background px-1 py-0.5 rounded">UNIQUE(research_run_id, order_index)</code> — Each run has exactly one of each step</li>
                  <li>• <code className="bg-background px-1 py-0.5 rounded">CHECK (status IN (...))</code> — Valid status values only</li>
                </ul>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs font-semibold mb-1">Indexes:</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• <code className="bg-background px-1 py-0.5 rounded">idx_research_steps_run_id</code> on <code className="bg-background px-1 py-0.5 rounded">research_run_id</code></li>
                  <li>• <code className="bg-background px-1 py-0.5 rounded">idx_research_steps_order</code> on <code className="bg-background px-1 py-0.5 rounded">(research_run_id, order_index)</code></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sources */}
          <section>
            <div className="mb-6 rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4">
              <h2 className="text-2xl font-semibold text-purple-700">
                sources
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete evidence log with all research sources and citations
              </p>
            </div>

            <div className="rounded-lg border bg-card overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="border-b">
                    <th className="p-3 text-left font-semibold">Column</th>
                    <th className="p-3 text-left font-semibold">Type</th>
                    <th className="p-3 text-left font-semibold">Constraints</th>
                    <th className="p-3 text-left font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs">
                  <tr>
                    <td className="p-3 font-mono">id</td>
                    <td className="p-3 font-mono">UUID</td>
                    <td className="p-3">PRIMARY KEY</td>
                    <td className="p-3 text-muted-foreground">Auto-generated unique identifier</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">project_id</td>
                    <td className="p-3 font-mono">UUID</td>
                    <td className="p-3">NOT NULL, FK → projects</td>
                    <td className="p-3 text-muted-foreground">Parent project</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">research_run_id</td>
                    <td className="p-3 font-mono">UUID</td>
                    <td className="p-3">NOT NULL, FK → research_runs</td>
                    <td className="p-3 text-muted-foreground">Associated research run</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">research_step_id</td>
                    <td className="p-3 font-mono">UUID</td>
                    <td className="p-3">NULLABLE, FK → research_steps</td>
                    <td className="p-3 text-muted-foreground">Optional step linkage</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">title</td>
                    <td className="p-3 font-mono">TEXT</td>
                    <td className="p-3">NOT NULL</td>
                    <td className="p-3 text-muted-foreground">Source title or description</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">url</td>
                    <td className="p-3 font-mono">TEXT</td>
                    <td className="p-3">—</td>
                    <td className="p-3 text-muted-foreground">Link to source (if applicable)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">citation</td>
                    <td className="p-3 font-mono">TEXT</td>
                    <td className="p-3">—</td>
                    <td className="p-3 text-muted-foreground">Full citation (APA, MLA, etc.)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">source_type</td>
                    <td className="p-3 font-mono">TEXT</td>
                    <td className="p-3">NOT NULL</td>
                    <td className="p-3 text-muted-foreground">industry_report | academic | government | etc.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">confidence</td>
                    <td className="p-3 font-mono">TEXT</td>
                    <td className="p-3">NOT NULL, DEFAULT 'medium'</td>
                    <td className="p-3 text-muted-foreground">high | medium | low</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">notes</td>
                    <td className="p-3 font-mono">TEXT</td>
                    <td className="p-3">—</td>
                    <td className="p-3 text-muted-foreground">Additional context or key findings</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">date_accessed</td>
                    <td className="p-3 font-mono">DATE</td>
                    <td className="p-3">—</td>
                    <td className="p-3 text-muted-foreground">When source was accessed</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono">created_at</td>
                    <td className="p-3 font-mono">TIMESTAMPTZ</td>
                    <td className="p-3">NOT NULL, DEFAULT NOW()</td>
                    <td className="p-3 text-muted-foreground">Creation timestamp</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2">
              <div className="rounded-lg bg-muted p-3">
                <div className="text-xs font-semibold mb-1">Indexes:</div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• <code className="bg-background px-1 py-0.5 rounded">idx_sources_project_id</code> on <code className="bg-background px-1 py-0.5 rounded">project_id</code></li>
                  <li>• <code className="bg-background px-1 py-0.5 rounded">idx_sources_run_id</code> on <code className="bg-background px-1 py-0.5 rounded">research_run_id</code></li>
                  <li>• <code className="bg-background px-1 py-0.5 rounded">idx_sources_step_id</code> on <code className="bg-background px-1 py-0.5 rounded">research_step_id</code></li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Row Level Security */}
        <div className="mt-16 rounded-lg border-2 border-primary/20 bg-primary/5 p-8">
          <h2 className="text-2xl font-semibold mb-4">Row Level Security (RLS)</h2>
          <p className="text-muted-foreground mb-4">
            All tables have Row Level Security enabled with permissive policies for authenticated users.
            This allows for future multi-tenancy and access control without schema changes.
          </p>
          <div className="rounded-lg bg-background p-4 font-mono text-xs">
            <pre className="text-muted-foreground whitespace-pre-wrap">
{`-- Example RLS policy
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for authenticated users"
  ON projects
  FOR ALL
  USING (true)
  WITH CHECK (true);`}
            </pre>
          </div>
        </div>

        {/* Auto-Update Triggers */}
        <div className="mt-8 rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Auto-Update Triggers</h2>
          <p className="text-sm text-muted-foreground mb-4">
            All tables with <code className="bg-muted px-1 py-0.5 rounded text-xs">updated_at</code> columns have triggers
            that automatically set the timestamp on every UPDATE operation.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex gap-4">
          <Link
            href="/documentation/protocol"
            className="flex-1 rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Previous</p>
                <h3 className="font-semibold">19-Step Protocol</h3>
              </div>
              <svg className="h-5 w-5 text-muted-foreground rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          <Link
            href="/documentation/examples"
            className="flex-1 rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Next</p>
                <h3 className="font-semibold">Examples</h3>
              </div>
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
