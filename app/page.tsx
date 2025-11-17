import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createServerSupabaseClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, description, created_at")
    .order("created_at", { ascending: false })
    .returns<Project[]>();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Market Research Protocol
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A cross-project standard for generating accurate, defensible, source-backed insights
            across the PVT Ecosystem.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Create New Project Card */}
          <Link
            href="/projects/new"
            className="group relative overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-primary hover:bg-accent"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">New Project</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start a new market research project
              </p>
            </div>
          </Link>

          {/* Project Cards */}
          {projects?.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold group-hover:text-primary">
                {project.name}
              </h3>
              {project.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
              <div className="mt-4 text-xs text-muted-foreground">
                Created {new Date(project.created_at).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <Link
            href="/sources"
            className="rounded-lg border bg-card p-6 transition-all hover:shadow-md"
          >
            <h3 className="font-semibold">Source Log</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse all research sources across projects
            </p>
          </Link>
          <Link
            href="/research-runs"
            className="rounded-lg border bg-card p-6 transition-all hover:shadow-md"
          >
            <h3 className="font-semibold">Research Runs</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              View all active and completed research runs
            </p>
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border bg-card p-6 transition-all hover:shadow-md"
          >
            <h3 className="font-semibold">Documentation</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn about the market research methodology
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
