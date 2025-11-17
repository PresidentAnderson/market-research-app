import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createResearchRun } from "@/app/actions";
import type { Project, ResearchRun } from "@/lib/types";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();

  // Fetch project
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id, name, description, created_at, updated_at")
    .eq("id", id)
    .single();

  if (projectError || !project) {
    notFound();
  }

  // Fetch research runs for this project
  const { data: runs } = await supabase
    .from("research_runs")
    .select("id, label, description, start_date, end_date, created_at")
    .eq("project_id", id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {project.name}
          </h1>
          {project.description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {project.description}
            </p>
          )}
          <div className="mt-4 text-sm text-muted-foreground">
            Created {new Date(project.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Research Runs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Research Runs</h2>
          </div>

          {/* New Run Form */}
          <form
            action={createResearchRun.bind(null, id)}
            className="mb-8 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition-colors hover:border-primary hover:bg-accent/50"
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Start New Research Run</h3>
              <p className="text-sm text-muted-foreground">
                Create a new research cycle with the 19-step Market Research Protocol
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="label"
                  className="block text-sm font-semibold mb-2"
                >
                  Run Label <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="label"
                  name="label"
                  required
                  placeholder="e.g., MR-2025-Q1"
                  className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="start_date"
                  className="block text-sm font-semibold mb-2"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                placeholder="Brief description of this research cycle..."
                className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Create Research Run
            </button>
          </form>

          {/* Existing Runs */}
          {runs && runs.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {runs.map((run) => (
                <Link
                  key={run.id}
                  href={`/research-runs/${run.id}`}
                  className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-lg font-semibold group-hover:text-primary">
                      {run.label}
                    </h3>
                    {run.end_date ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 border border-green-200">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                        Active
                      </span>
                    )}
                  </div>

                  {run.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {run.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>
                      {run.start_date
                        ? `Started ${new Date(run.start_date).toLocaleDateString()}`
                        : `Created ${new Date(run.created_at).toLocaleDateString()}`}
                    </div>
                    <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-muted-foreground/25 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <svg className="h-8 w-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No Research Runs Yet</h3>
              <p className="text-sm text-muted-foreground">
                Create your first research run to start applying the 19-step Market Research Protocol
              </p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Link
            href="/documentation/protocol"
            className="rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">📋</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Review the Protocol</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about the 19-step Market Research methodology before starting your run
                </p>
              </div>
              <svg className="h-5 w-5 text-muted-foreground mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/documentation/examples"
            className="rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">💡</div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">See Examples</h3>
                <p className="text-sm text-muted-foreground">
                  View real-world research runs from across the PVT Ecosystem
                </p>
              </div>
              <svg className="h-5 w-5 text-muted-foreground mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
