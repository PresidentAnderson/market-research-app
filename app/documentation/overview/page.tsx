import Link from "next/link";

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16">
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
            Overview
          </h1>
          <p className="text-xl text-muted-foreground">
            Understanding the Market Research Protocol and its role in the PVT Ecosystem
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          {/* What is it */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What is the Market Research Protocol?</h2>
            <p className="text-muted-foreground mb-4">
              The <strong>Market Research Protocol</strong> is a standardized, 19-step methodology for conducting
              rigorous, source-backed market research across all ventures in the PVT Ecosystem—including Aurora,
              WisdomOS, PVT Hostel, Luggage Storage Marketplace, and future projects.
            </p>
            <p className="text-muted-foreground mb-4">
              It is designed to produce <strong>defensible insights</strong> that can inform strategic decisions,
              investor presentations, product roadmaps, and go-to-market strategies. Every claim is traceable to
              a logged source, every model is transparent, and every research run is documented for future reuse.
            </p>
            <div className="rounded-lg border bg-primary/5 p-6 mb-6">
              <h3 className="font-semibold mb-2">Core Principles</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>Source-backed:</strong> Every insight is traceable to documented evidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>Rigorous:</strong> Follows established research methodology with validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>Reusable:</strong> Research runs are documented for cross-project knowledge sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span><strong>Actionable:</strong> Translates findings into strategic recommendations</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Why it exists */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Why Does This Exist?</h2>
            <p className="text-muted-foreground mb-4">
              Across the PVT Ecosystem, multiple ventures operate in parallel—each requiring market intelligence
              to make informed decisions about pricing, positioning, product features, and market entry.
            </p>
            <p className="text-muted-foreground mb-4">
              Without a standardized process, research becomes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
              <li>Inconsistent across projects</li>
              <li>Difficult to audit or defend</li>
              <li>Lost when team members transition</li>
              <li>Hard to reuse across similar ventures</li>
              <li>Time-consuming to validate</li>
            </ul>
            <p className="text-muted-foreground">
              The Market Research Protocol solves these problems by providing a shared framework that ensures
              quality, traceability, and knowledge retention.
            </p>
          </section>

          {/* Who uses it */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Who Uses This?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2">Founders & Operators</h3>
                <p className="text-sm text-muted-foreground">
                  Use research runs to validate market assumptions, size opportunities, and inform strategic decisions
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2">Product Teams</h3>
                <p className="text-sm text-muted-foreground">
                  Reference insights to guide feature prioritization, pricing models, and customer segmentation
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2">Investors & Advisors</h3>
                <p className="text-sm text-muted-foreground">
                  Review source-backed market models and TAM/SAM/SOM calculations for due diligence
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="font-semibold mb-2">Marketing & GTM</h3>
                <p className="text-sm text-muted-foreground">
                  Extract positioning insights, competitive intelligence, and customer language for campaigns
                </p>
              </div>
            </div>
          </section>

          {/* The 19 Steps */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">The 19-Step Process</h2>
            <p className="text-muted-foreground mb-6">
              The protocol breaks market research into 19 sequential steps, organized into 5 phases:
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-blue-500 bg-card p-4">
                <h3 className="font-semibold mb-2">Phase 1: Setup & Framing (Steps 1-3)</h3>
                <p className="text-sm text-muted-foreground">
                  Define research objectives, market boundaries, and initial hypotheses
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-green-500 bg-card p-4">
                <h3 className="font-semibold mb-2">Phase 2: Secondary Research (Steps 4-6)</h3>
                <p className="text-sm text-muted-foreground">
                  Build source maps and gather external data on market size, competitors, and benchmarks
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-yellow-500 bg-card p-4">
                <h3 className="font-semibold mb-2">Phase 3: Primary Research Design (Steps 7-10)</h3>
                <p className="text-sm text-muted-foreground">
                  Design research methods, create instruments, run pilots, and refine approach
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-orange-500 bg-card p-4">
                <h3 className="font-semibold mb-2">Phase 4: Fieldwork & Analysis (Steps 11-16)</h3>
                <p className="text-sm text-muted-foreground">
                  Execute research, clean data, build models (TAM/SAM/SOM), analyze pricing, and validate findings
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-purple-500 bg-card p-4">
                <h3 className="font-semibold mb-2">Phase 5: Synthesis & Documentation (Steps 17-19)</h3>
                <p className="text-sm text-muted-foreground">
                  Synthesize insights, develop recommendations, and document everything in the knowledge base
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/documentation/protocol"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View detailed protocol breakdown
                <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Key Deliverables */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Key Deliverables</h2>
            <p className="text-muted-foreground mb-4">
              Each research run produces:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1">
                  <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <strong>Research Brief:</strong> Objectives, questions, and success metrics
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1">
                  <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <strong>Source Log:</strong> Complete citation trail for every data point
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1">
                  <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <strong>TAM/SAM/SOM Model:</strong> Market sizing with transparent assumptions
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1">
                  <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <strong>Insights Summary:</strong> 5-10 headline findings with evidence
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1">
                  <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <strong>Strategic Recommendations:</strong> Actionable next steps with trade-offs
                </div>
              </li>
            </ul>
          </section>

          {/* Next Steps */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
            <div className="grid gap-4">
              <Link
                href="/documentation/protocol"
                className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary"
              >
                <div className="text-2xl">📋</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Read the Protocol</h3>
                  <p className="text-sm text-muted-foreground">
                    Detailed breakdown of all 19 steps with examples and best practices
                  </p>
                </div>
                <svg className="h-5 w-5 text-muted-foreground mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/documentation/examples"
                className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary"
              >
                <div className="text-2xl">💡</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">See Examples</h3>
                  <p className="text-sm text-muted-foreground">
                    Real-world research runs from Aurora, WisdomOS, and other ventures
                  </p>
                </div>
                <svg className="h-5 w-5 text-muted-foreground mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/projects/new"
                className="flex items-start gap-4 rounded-lg border-2 border-primary bg-primary/5 p-4 transition-all hover:shadow-md"
              >
                <div className="text-2xl">🚀</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Start Your First Research Run</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a new project and begin applying the protocol
                  </p>
                </div>
                <svg className="h-5 w-5 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
