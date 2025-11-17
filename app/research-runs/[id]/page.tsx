// app/research-runs/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ResearchStepsList } from "./ResearchStepsList";
import { SourcesPanel } from "./SourcesPanel";
import type { ResearchRun, Project, ResearchStep, Source } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ stepId?: string }>;
}

export default async function ResearchRunPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { stepId } = await searchParams;

  const supabase = await createServerSupabaseClient();

  // Fetch research run
  const { data: run, error: runError } = await supabase
    .from("research_runs")
    .select("id, label, description, start_date, end_date, project_id")
    .eq("id", id)
    .single<ResearchRun>();

  if (runError || !run) {
    console.error("Error fetching research run:", runError);
    return notFound();
  }

  // Fetch project
  const { data: project } = await supabase
    .from("projects")
    .select("id, name")
    .eq("id", run.project_id)
    .single<Project>();

  // Fetch research steps
  const { data: steps } = await supabase
    .from("research_steps")
    .select("id, order_index, title, notes, status, due_date, research_run_id, created_at, updated_at")
    .eq("research_run_id", run.id)
    .order("order_index", { ascending: true })
    .returns<ResearchStep[]>();

  // Fetch sources
  const { data: sources } = await supabase
    .from("sources")
    .select("id, title, source_type, metric_category, confidence, date_accessed, research_step_id, research_run_id, project_id, url, publisher, year, geography, key_figures, usage_notes, methodology, limitations, created_at, updated_at")
    .eq("research_run_id", run.id)
    .returns<Source[]>();

  // Compute progress
  const totalSteps = steps?.length ?? 0;
  const doneSteps = steps?.filter((s) => s.status === "done").length ?? 0;
  const inProgressSteps = steps?.filter((s) => s.status === "in_progress").length ?? 0;

  // Determine overall status
  const overallStatus =
    doneSteps === totalSteps ? "Completed" :
    inProgressSteps > 0 ? "In Progress" :
    "Not Started";

  const selectedStepId = stepId ?? null;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* HEADER */}
          <header className="border-b pb-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/projects" className="hover:text-foreground">
                  Projects
                </Link>
                <span>/</span>
                {project && (
                  <>
                    <Link
                      href={`/projects/${project.id}`}
                      className="hover:text-foreground"
                    >
                      {project.name}
                    </Link>
                    <span>/</span>
                  </>
                )}
                <span>Research Runs</span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight">
                  {project?.name} — {run.label}
                </h1>
                {run.description && (
                  <p className="mt-2 text-muted-foreground">{run.description}</p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Progress:</span>
                    <span className="text-muted-foreground">
                      {doneSteps} / {totalSteps} steps complete
                    </span>
                  </div>
                  {run.start_date && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Start:</span>
                      <span className="text-muted-foreground">
                        {new Date(run.start_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {run.end_date && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">End:</span>
                      <span className="text-muted-foreground">
                        {new Date(run.end_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    overallStatus === "Completed"
                      ? "bg-green-100 text-green-700"
                      : overallStatus === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {overallStatus}
                </span>
                <div className="flex gap-2">
                  <button className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent">
                    Edit Run
                  </button>
                  <button className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent">
                    Export
                  </button>
                  <Link
                    href={`/sources?researchRunId=${run.id}`}
                    className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
                  >
                    Source Log
                  </Link>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${totalSteps > 0 ? (doneSteps / totalSteps) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <section>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Research Steps
              </h2>
              <ResearchStepsList
                steps={steps ?? []}
                sources={sources ?? []}
                selectedStepId={selectedStepId}
              />
            </section>

            <section>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Sources for this Run
              </h2>
              <SourcesPanel
                runId={run.id}
                projectId={project?.id}
                steps={steps ?? []}
                initialSources={sources ?? []}
                selectedStepId={selectedStepId}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
