import Link from "next/link";
import { MR_STEPS } from "@/lib/marketResearchSteps";

export default function ProtocolPage() {
  const phases = [
    {
      name: "Setup & Framing",
      color: "blue",
      steps: MR_STEPS.slice(0, 3),
    },
    {
      name: "Secondary Research",
      color: "green",
      steps: MR_STEPS.slice(3, 6),
    },
    {
      name: "Primary Research Design",
      color: "yellow",
      steps: MR_STEPS.slice(6, 10),
    },
    {
      name: "Fieldwork & Analysis",
      color: "orange",
      steps: MR_STEPS.slice(10, 16),
    },
    {
      name: "Synthesis & Documentation",
      color: "purple",
      steps: MR_STEPS.slice(16, 19),
    },
  ];

  const colorMap: Record<string, { border: string; bg: string; text: string }> = {
    blue: { border: "border-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
    green: { border: "border-green-500", bg: "bg-green-50", text: "text-green-700" },
    yellow: { border: "border-yellow-500", bg: "bg-yellow-50", text: "text-yellow-700" },
    orange: { border: "border-orange-500", bg: "bg-orange-50", text: "text-orange-700" },
    purple: { border: "border-purple-500", bg: "bg-purple-50", text: "text-purple-700" },
  };

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
            19-Step Protocol
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A comprehensive methodology for conducting rigorous, source-backed market research
            from initial framing to strategic recommendations.
          </p>
        </div>

        {/* Protocol Overview */}
        <div className="mb-12 rounded-lg border bg-card p-6">
          <h2 className="text-2xl font-semibold mb-4">How to Use This Protocol</h2>
          <p className="text-muted-foreground mb-4">
            The 19 steps are designed to be followed sequentially, though some flexibility is allowed
            based on project needs. Each step produces specific deliverables that feed into subsequent steps.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              <span><strong>Not all steps are mandatory</strong> for every research run (e.g., you may skip primary research for quick desk research)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              <span><strong>Document as you go</strong> — update the Source Log continuously, not at the end</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">→</span>
              <span><strong>Iterate when needed</strong> — research often requires revisiting earlier steps based on new findings</span>
            </li>
          </ul>
        </div>

        {/* Phases */}
        {phases.map((phase, phaseIndex) => (
          <div key={phase.name} className="mb-12">
            <div className={`mb-6 rounded-lg border-l-4 ${colorMap[phase.color].border} ${colorMap[phase.color].bg} p-4`}>
              <h2 className={`text-2xl font-semibold ${colorMap[phase.color].text}`}>
                Phase {phaseIndex + 1}: {phase.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Steps {phase.steps[0].order}–{phase.steps[phase.steps.length - 1].order}
              </p>
            </div>

            <div className="space-y-6">
              {phase.steps.map((step) => (
                <div
                  key={step.order}
                  className="rounded-lg border bg-card p-6 transition-all hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorMap[phase.color].bg} ${colorMap[phase.color].text} font-bold`}>
                      {step.order}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {step.notes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Best Practices */}
        <div className="mt-16 rounded-lg border-2 border-primary/20 bg-primary/5 p-8">
          <h2 className="text-2xl font-semibold mb-6">Best Practices</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Do
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Log every source as you find it, not at the end</li>
                <li>• Document assumptions explicitly in models</li>
                <li>• Include confidence levels for all estimates</li>
                <li>• Cross-check key figures across multiple sources</li>
                <li>• Link deliverables back to specific steps</li>
                <li>• Run sensitivity analysis on fragile assumptions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Don't
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Skip ethics review for primary research</li>
                <li>• Use competitor data without verification</li>
                <li>• Present single-point estimates without ranges</li>
                <li>• Ignore conflicting evidence in synthesis</li>
                <li>• Make recommendations without source backing</li>
                <li>• Forget to archive raw data and instruments</li>
              </ul>
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
                <p className="text-sm text-muted-foreground mb-1">Next</p>
                <h3 className="font-semibold">Database Schema</h3>
              </div>
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-sm text-muted-foreground mb-1">See</p>
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
