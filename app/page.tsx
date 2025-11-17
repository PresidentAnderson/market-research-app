import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export default async function HomePage() {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-yellow-100 p-4">
              <svg className="h-12 w-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Database Configuration Required
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The Market Research App is deployed, but Supabase environment variables are not configured.
          </p>
          <div className="rounded-lg border bg-card p-6 text-left">
            <h2 className="font-semibold mb-4">Next Steps:</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Create a Supabase project at <a href="https://supabase.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">supabase.com</a></li>
              <li>Run the database migration from <code className="bg-muted px-1 py-0.5 rounded">supabase/migrations/001_initial_schema.sql</code></li>
              <li>Add environment variables in <a href="https://vercel.com/axaiinovation/market-research-app/settings/environment-variables" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Vercel Settings</a>:
                <ul className="list-disc list-inside ml-4 mt-2">
                  <li><code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                </ul>
              </li>
              <li>Redeploy the application</li>
            </ol>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            See <code className="bg-muted px-1 py-0.5 rounded">DEPLOYMENT.md</code> for detailed instructions.
          </p>
        </div>
      </div>
    );
  }

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
            href="/documentation"
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
