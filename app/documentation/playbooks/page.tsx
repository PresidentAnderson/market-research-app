import Link from "next/link";

export default function PlaybooksPage() {
  const playbooks = [
    {
      title: "60-Minute Rapid Research",
      icon: "⚡",
      difficulty: "Beginner",
      time: "1 hour",
      description: "Quick desk research for early validation and directional insights",
      steps: [
        "Define 1-3 specific questions (10 min)",
        "Identify 5-10 high-quality sources (15 min)",
        "Extract key facts and quotes (20 min)",
        "Synthesize findings into bullet points (10 min)",
        "Document sources in Source Log (5 min)",
      ],
      whenToUse: "Initial market validation, quick competitive scan, pre-kickoff scoping",
      output: "1-page summary with 5-10 key findings and source links",
    },
    {
      title: "Defensible Market Sizing",
      icon: "📊",
      difficulty: "Intermediate",
      time: "3-5 days",
      description: "Build TAM/SAM/SOM model with transparent assumptions and sensitivity analysis",
      steps: [
        "Define market boundaries precisely (Step 2)",
        "Build source map for market data (Step 4)",
        "Collect secondary data on market size and growth (Step 5)",
        "Model TAM/SAM/SOM with explicit assumptions (Step 14)",
        "Run sensitivity analysis on key variables (Step 16)",
        "Document every input with source citation",
        "Create low/base/high scenarios",
      ],
      whenToUse: "Investor decks, strategic planning, product roadmap validation",
      output: "TAM/SAM/SOM model (Excel/Google Sheets) with full source log and sensitivity table",
    },
    {
      title: "Validating Contradictory Data",
      icon: "🔍",
      difficulty: "Advanced",
      time: "2-3 hours",
      description: "Resolve conflicting data points across multiple sources",
      steps: [
        "Document all conflicting figures with sources",
        "Check source tier and reliability scores",
        "Investigate methodology differences (sample size, date, geography)",
        "Weight sources by credibility and recency",
        "If unresolvable, present range with confidence intervals",
        "Flag the contradiction explicitly in report",
      ],
      whenToUse: "When two credible sources provide different numbers for the same metric",
      output: "Reconciliation note explaining the discrepancy and recommended figure",
    },
    {
      title: "Detecting Market Patterns",
      icon: "📈",
      difficulty: "Intermediate",
      time: "1-2 weeks",
      description: "Identify emerging trends and predict market direction",
      steps: [
        "Define hypothesis about the pattern (Step 3)",
        "Gather time-series data from multiple sources (Steps 4-5)",
        "Run qualitative interviews to understand drivers (Step 11)",
        "Validate pattern with quantitative survey (Step 12)",
        "Cross-check against adjacent markets or geographies",
        "Assess confidence based on data quality and consistency",
      ],
      whenToUse: "Product innovation, timing market entry, forecasting demand",
      output: "Trend report with supporting evidence, confidence level, and strategic implications",
    },
    {
      title: "Risk & Uncertainty Assessment",
      icon: "⚠️",
      difficulty: "Advanced",
      time: "3-5 days",
      description: "Quantify known risks and identify unknown unknowns",
      steps: [
        "List all assumptions in research and business model",
        "Classify each assumption: validated, probable, or speculative",
        "Identify fragile assumptions (high impact, low confidence)",
        "Run Monte Carlo simulation or scenario planning",
        "Document risk mitigations and contingency plans",
        "Highlight areas requiring further research",
      ],
      whenToUse: "Pre-launch planning, investor due diligence, strategic decision-making",
      output: "Risk matrix with probability/impact scores and mitigation strategies",
    },
    {
      title: "Research for Legal Filings",
      icon: "⚖️",
      difficulty: "Advanced",
      time: "1-2 weeks",
      description: "Prepare audit-ready research for regulatory submissions, legal defense, or compliance",
      steps: [
        "Ensure all sources are Tier 1-3 (no social media or blogs)",
        "Verify every citation is complete and accurate",
        "Include methodology notes for all primary research",
        "Add ethics and data handling documentation (Step 7)",
        "Lock research run and create immutable archive",
        "Prepare appendices with raw data and instruments",
      ],
      whenToUse: "Regulatory filings, legal disputes, patent applications, compliance audits",
      output: "Full research package with source log, methodology appendix, and governance attestation",
    },
    {
      title: "Research for Investor Decks",
      icon: "💼",
      difficulty: "Intermediate",
      time: "1 week",
      description: "Create compelling, defensible market narratives for fundraising",
      steps: [
        "Focus on Steps 5-6, 14-18 (market size, competition, insights, recommendations)",
        "Build TAM/SAM/SOM with clear bottoms-up logic",
        "Create competitor matrix with differentiation narrative",
        "Extract 5-10 headline insights for slides",
        "Prepare appendix with full source log (for DD)",
        "Include confidence levels for all key claims",
      ],
      whenToUse: "Fundraising, board presentations, strategic partnership pitches",
      output: "Market slides + appendix with source log ready for investor due diligence",
    },
    {
      title: "Team Onboarding: First Research Run",
      icon: "🎓",
      difficulty: "Beginner",
      time: "Half day",
      description: "Teach new team members the protocol by running a simple research project",
      steps: [
        "Assign a low-stakes research question (e.g., 'What is the size of the X market in Canada?')",
        "Walk through Steps 1-6 together",
        "Show how to log sources properly",
        "Practice extracting facts vs. opinions",
        "Review output and provide feedback",
        "Explain how this connects to strategic decisions",
      ],
      whenToUse: "Onboarding analysts, contractors, interns, or cross-functional team members",
      output: "Completed research run + trained team member",
    },
  ];

  const difficultyColor = {
    Beginner: "bg-green-100 text-green-700 border-green-200",
    Intermediate: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Advanced: "bg-orange-100 text-orange-700 border-orange-200",
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
            Playbooks
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Operational guides for common research scenarios across the PVT Ecosystem—from
            rapid validation to audit-ready documentation.
          </p>
        </div>

        {/* Overview */}
        <div className="mb-12 rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">How to Use Playbooks</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Each playbook is a step-by-step guide for a specific research scenario. They reference
            the 19-step protocol but focus on practical execution for real-world use cases.
          </p>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              <span><strong>Beginner:</strong> Suitable for new team members or quick projects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              <span><strong>Intermediate:</strong> Requires familiarity with the protocol and research methods</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              <span><strong>Advanced:</strong> Complex scenarios requiring expert judgment and rigor</span>
            </li>
          </ul>
        </div>

        {/* Playbooks */}
        <div className="space-y-6">
          {playbooks.map((playbook, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Header */}
              <div className="border-b bg-muted/50 p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{playbook.icon}</div>
                    <div>
                      <h2 className="text-xl font-semibold mb-1">
                        {playbook.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {playbook.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end shrink-0">
                    <div className={`px-3 py-1 rounded-full border text-xs font-medium ${difficultyColor[playbook.difficulty as keyof typeof difficultyColor]}`}>
                      {playbook.difficulty}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {playbook.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Steps */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      Steps
                    </h3>
                    <ol className="space-y-2">
                      {playbook.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="font-semibold text-primary mt-0.5 shrink-0">
                            {i + 1}.
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Context */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        When to Use
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {playbook.whenToUse}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Output
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {playbook.output}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Best Practices */}
        <div className="mt-16 rounded-lg border-2 border-primary/20 bg-primary/5 p-8">
          <h2 className="text-2xl font-semibold mb-6">General Best Practices</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Before You Start</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Clarify the decision this research will inform</li>
                <li>• Set clear success criteria and deadlines</li>
                <li>• Identify stakeholders who need the output</li>
                <li>• Choose the right playbook for your scenario</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">During Research</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Log sources as you find them, not at the end</li>
                <li>• Separate facts from your interpretations</li>
                <li>• Note confidence levels for all estimates</li>
                <li>• Document assumptions explicitly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">When Reporting</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Lead with key insights, not methodology</li>
                <li>• Link every claim to a source</li>
                <li>• Provide ranges instead of single-point estimates</li>
                <li>• Highlight risks and unknowns transparently</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">After Completion</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Archive raw data and instruments</li>
                <li>• Update the knowledge base for future reuse</li>
                <li>• Share learnings with the team</li>
                <li>• Note what you'd do differently next time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex gap-4">
          <Link
            href="/documentation/examples"
            className="flex-1 rounded-lg border bg-card p-6 transition-all hover:shadow-md hover:border-primary"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Previous</p>
                <h3 className="font-semibold">Examples</h3>
              </div>
              <svg className="h-5 w-5 text-muted-foreground rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          <Link
            href="/"
            className="flex-1 rounded-lg border-2 border-primary bg-primary/5 p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary mb-1">Start</p>
                <h3 className="font-semibold">Create Your First Project</h3>
              </div>
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
