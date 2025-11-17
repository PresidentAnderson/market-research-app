import Link from "next/link";
import { createProject } from "@/app/actions";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16">
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Create New Project
          </h1>
          <p className="text-lg text-muted-foreground">
            Projects organize your market research work across ventures in the PVT Ecosystem.
            Each project can contain multiple research runs over time.
          </p>
        </div>

        {/* Form */}
        <form action={createProject} className="space-y-6">
          <div className="rounded-lg border bg-card p-6 space-y-6">
            {/* Project Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Project Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g., Aurora, WisdomOS, PVT Hostel"
                className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Choose a clear name that identifies the venture or product
              </p>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Brief description of the project and its strategic goals..."
                className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Optional: Provide context about this project's objectives and scope
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg border bg-blue-50 border-blue-200 p-4">
            <div className="flex items-start gap-3">
              <svg className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">What happens next?</p>
                <p className="text-blue-800">
                  After creating your project, you'll be able to start research runs. Each run will
                  automatically initialize the 19-step Market Research Protocol with source logging,
                  step tracking, and progress monitoring.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>

        {/* Examples */}
        <div className="mt-12 rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Example Projects</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Aurora</div>
                <div className="text-muted-foreground">
                  AI-native OTA alternative for global hostel booking
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-medium">WisdomOS</div>
                <div className="text-muted-foreground">
                  Self-improvement platform with AI coaching and habit tracking
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-medium">PVT Hostel</div>
                <div className="text-muted-foreground">
                  Hybrid hostel/co-living space in Montreal
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-primary/10 p-1">
                <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="font-medium">Luggage Storage Marketplace</div>
                <div className="text-muted-foreground">
                  Peer-to-peer luggage storage platform for travelers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
