import Link from "next/link";

export default function DocumentationPage() {
  const sections = [
    {
      title: "Overview",
      href: "/documentation/overview",
      icon: "📖",
      description: "Introduction to the 19-step Market Research Protocol and its purpose across the PVT Ecosystem",
    },
    {
      title: "Protocol",
      href: "/documentation/protocol",
      icon: "📋",
      description: "Detailed breakdown of each step in the research methodology with examples and best practices",
    },
    {
      title: "Schema",
      href: "/documentation/schema",
      icon: "🗄️",
      description: "Database architecture, table relationships, and data model documentation",
    },
    {
      title: "Examples",
      href: "/documentation/examples",
      icon: "💡",
      description: "Real-world examples of research runs across Aurora, WisdomOS, PVT Hostel, and other ventures",
    },
    {
      title: "Playbooks",
      href: "/documentation/playbooks",
      icon: "🎯",
      description: "Team onboarding guides, standard operating procedures, and workflow templates",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">
            Documentation
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Complete guide to the Market Research Protocol — a standardized methodology for
            conducting rigorous, source-backed market research across all ventures in the PVT Ecosystem.
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-12 rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
          <h2 className="text-xl font-semibold mb-3">Quick Start</h2>
          <p className="text-muted-foreground mb-4">
            New to the Market Research Protocol? Start with the <Link href="/documentation/overview" className="text-primary font-medium hover:underline">Overview</Link>,
            then review the <Link href="/documentation/protocol" className="text-primary font-medium hover:underline">Protocol Steps</Link>,
            and check out <Link href="/documentation/examples" className="text-primary font-medium hover:underline">Examples</Link> to see it in action.
          </p>
          <div className="flex gap-3">
            <Link
              href="/documentation/overview"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
              <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/projects/new"
              className="inline-flex items-center px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Create Your First Project
            </Link>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl" aria-hidden="true">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 rounded-lg border bg-card p-8">
          <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">README Files</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <code className="bg-muted px-1 py-0.5 rounded">README.md</code> - Complete setup guide</li>
                <li>• <code className="bg-muted px-1 py-0.5 rounded">QUICK_START.md</code> - 5-minute getting started</li>
                <li>• <code className="bg-muted px-1 py-0.5 rounded">DEPLOYMENT.md</code> - Vercel deployment instructions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Technical Documentation</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <code className="bg-muted px-1 py-0.5 rounded">DATABASE_SCHEMA.md</code> - Database structure</li>
                <li>• <code className="bg-muted px-1 py-0.5 rounded">IMPLEMENTATION_SUMMARY.md</code> - Technical overview</li>
                <li>• <code className="bg-muted px-1 py-0.5 rounded">GITHUB_DEPLOYMENT.md</code> - GitHub integration</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Questions or feedback?{" "}
            <a
              href="https://github.com/PresidentAnderson/market-research-app/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open an issue on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
