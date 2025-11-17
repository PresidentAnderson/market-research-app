import Link from "next/link";

export default function ExamplesPage() {
  const examples = [
    {
      project: "Aurora",
      title: "Global OTA/Hostel Market Sizing",
      label: "MR-2025-Q1",
      description: "Comprehensive market analysis for AI-native hostel booking platform targeting digital nomads and budget travelers",
      keyInsights: [
        "Global hostel market valued at $5.8B (2024) with 12% CAGR through 2028",
        "88% of hostels still use legacy OTA platforms with 15-25% commission rates",
        "Digital nomads represent 35M travelers globally, with 68% booking hostels",
        "AI-driven booking could reduce search time by 73% (user interviews, n=42)",
      ],
      tam: "$5.8B Global Hostel Market",
      sam: "$890M AI-Enhanced Hostel Booking",
      som: "$45M Year-1 Target (Montreal, Toronto, Vancouver markets)",
      sources: 42,
      steps: 19,
      confidence: "high" as const,
    },
    {
      project: "WisdomOS",
      title: "Self-Improvement Platform Market Analysis",
      label: "MR-2024-Q4",
      description: "Market research for AI-powered personal development platform combining coaching, habit tracking, and community",
      keyInsights: [
        "Self-improvement app market: $4.2B (2024), growing 23% YoY",
        "77% of users abandon habit apps within 30 days (cohort analysis)",
        "AI coaching perceived as 'more objective' by 61% of surveyed users (n=128)",
        "Willingness-to-pay for premium AI coaching: $29-49/month (conjoint analysis)",
      ],
      tam: "$4.2B Personal Development Software",
      sam: "$1.1B AI-Enhanced Coaching Apps",
      som: "$8.5M Year-1 Target (North American English speakers)",
      sources: 38,
      steps: 17,
      confidence: "high" as const,
    },
    {
      project: "PVT Hostel",
      title: "Montreal Hostel Demand & Competitive Landscape",
      label: "MR-2024-Q3",
      description: "Localized market research for hybrid hostel/co-living space targeting students, young professionals, and travelers",
      keyInsights: [
        "Montreal receives 11M tourists annually, 18% stay in hostels/budget accommodation",
        "Average hostel occupancy: 72% (summer), 45% (winter) — opportunity for long-term residents",
        "Student housing shortage: 4,200 units needed by 2026 (CMHC data)",
        "Co-living model increases revenue per bed by 35% vs traditional hostel (competitor benchmarking)",
      ],
      tam: "$180M Montreal Short-Term Accommodation",
      sam: "$42M Hybrid Hostel/Co-Living Segment",
      som: "$1.2M Year-1 Revenue (single 80-bed property)",
      sources: 29,
      steps: 15,
      confidence: "high" as const,
    },
    {
      project: "Luggage Storage",
      title: "Luggage Storage Marketplace Opportunity",
      label: "MR-2025-Q2",
      description: "Market sizing and competitive analysis for peer-to-peer luggage storage platform in major transit hubs",
      keyInsights: [
        "Traditional luggage storage: $420M global market, fragmented across 12,000+ locations",
        "62% of travelers experience 'luggage anxiety' during layovers (survey, n=310)",
        "P2P model can offer 40-60% lower prices than lockers while increasing host income",
        "Prime locations (airports, train stations): $8-15/bag/day willingness-to-pay",
      ],
      tam: "$420M Global Luggage Storage",
      sam: "$85M P2P Luggage Storage",
      som: "$2.1M Year-1 (YYZ, YUL, YVR)",
      sources: 26,
      steps: 16,
      confidence: "medium" as const,
    },
  ];

  const confidenceBadge = {
    high: "bg-green-100 text-green-700 border-green-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16">
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
            Examples
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Real-world research runs from across the PVT Ecosystem, demonstrating the protocol
            in action across different markets and use cases.
          </p>
        </div>

        {/* Note */}
        <div className="mb-12 rounded-lg border bg-blue-50 border-blue-200 p-6">
          <div className="flex items-start gap-3">
            <svg className="h-6 w-6 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">About These Examples</h3>
              <p className="text-sm text-blue-800">
                These are anonymized summaries of actual research runs conducted using the Market Research Protocol.
                Some figures have been simplified for illustration. Full research runs include complete source logs,
                raw data, models, and detailed appendices not shown here.
              </p>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="space-y-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Header */}
              <div className="border-b bg-muted/50 p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-primary">
                        {example.project}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {example.label}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold">
                      {example.title}
                    </h2>
                  </div>
                  <div className={`px-3 py-1 rounded-full border text-xs font-medium ${confidenceBadge[example.confidence]}`}>
                    {example.confidence} confidence
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {example.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Key Insights */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Key Insights
                  </h3>
                  <ul className="space-y-2">
                    {example.keyInsights.map((insight, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-primary mt-0.5">→</span>
                        <span className="text-muted-foreground">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* TAM/SAM/SOM */}
                <div className="mb-6 grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg border bg-blue-50 border-blue-200 p-4">
                    <div className="text-xs font-semibold text-blue-600 mb-1">TAM (Total Addressable Market)</div>
                    <div className="text-sm font-bold text-blue-900">{example.tam}</div>
                  </div>
                  <div className="rounded-lg border bg-green-50 border-green-200 p-4">
                    <div className="text-xs font-semibold text-green-600 mb-1">SAM (Serviceable Addressable Market)</div>
                    <div className="text-sm font-bold text-green-900">{example.sam}</div>
                  </div>
                  <div className="rounded-lg border bg-purple-50 border-purple-200 p-4">
                    <div className="text-xs font-semibold text-purple-600 mb-1">SOM (Serviceable Obtainable Market)</div>
                    <div className="text-sm font-bold text-purple-900">{example.som}</div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{example.sources} sources logged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span>{example.steps} steps completed</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Templates */}
        <div className="mt-16 rounded-lg border-2 border-primary/20 bg-primary/5 p-8">
          <h2 className="text-2xl font-semibold mb-6">Research Templates</h2>
          <p className="text-muted-foreground mb-6">
            Common research project types with recommended step sequences and deliverable templates:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">Market Sizing Report</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Quantify TAM/SAM/SOM with transparent assumptions and sensitivity analysis
              </p>
              <div className="text-xs text-muted-foreground">
                Steps: 1-6, 13-16
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">Competitor Benchmark</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Map competitive landscape, positioning, pricing, and feature gaps
              </p>
              <div className="text-xs text-muted-foreground">
                Steps: 1-2, 4, 6, 17-18
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">Pricing Analysis</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Determine willingness-to-pay and optimal pricing strategy
              </p>
              <div className="text-xs text-muted-foreground">
                Steps: 1-3, 6-12, 15-16
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">Trend Forecasting</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Identify emerging patterns and predict market direction
              </p>
              <div className="text-xs text-muted-foreground">
                Steps: 1-5, 11-12, 16-18
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">Regulatory Analysis</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Assess compliance requirements, risks, and strategic implications
              </p>
              <div className="text-xs text-muted-foreground">
                Steps: 1-2, 4-5, 7, 17-19
              </div>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold mb-2">Audience Segmentation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Define customer segments with behavioral and demographic profiles
              </p>
              <div className="text-xs text-muted-foreground">
                Steps: 1-3, 8-14, 17-18
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex gap-4">
          <Link
            href="/documentation/schema"
            className="flex-1 rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Previous</p>
                <h3 className="font-semibold">Database Schema</h3>
              </div>
              <svg className="h-5 w-5 text-muted-foreground rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          <Link
            href="/documentation/playbooks"
            className="flex-1 rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Next</p>
                <h3 className="font-semibold">Playbooks</h3>
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
