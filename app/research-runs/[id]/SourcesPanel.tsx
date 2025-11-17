// app/research-runs/[id]/SourcesPanel.tsx
"use client";

import { useState, useTransition, useMemo } from "react";
import { Plus, Eye, Edit2, Copy, X } from "lucide-react";
import { createSource } from "@/app/actions";
import type { Source, ResearchStep, SourceType, Confidence, MetricCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SourcesPanelProps {
  runId: string;
  projectId?: string;
  steps: ResearchStep[];
  initialSources: Source[];
  selectedStepId: string | null;
}

const CONFIDENCE_COLORS: Record<Confidence, string> = {
  high: "border-l-4 border-l-green-500",
  medium: "border-l-4 border-l-yellow-500",
  low: "border-l-4 border-l-red-500",
};

export function SourcesPanel({
  runId,
  projectId,
  steps,
  initialSources,
  selectedStepId,
}: SourcesPanelProps) {
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [filterStepId, setFilterStepId] = useState<string>("all");
  const [filterConfidence, setFilterConfidence] = useState<string>("all");
  const [filterSourceType, setFilterSourceType] = useState<string>("all");
  const [isPending, startTransition] = useTransition();

  // Add source form state
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    source_type: "industry_report" as SourceType,
    metric_category: "market_size" as MetricCategory,
    confidence: "medium" as Confidence,
    research_step_id: selectedStepId || "",
    key_figures: "",
    usage_notes: "",
    publisher: "",
    year: new Date().getFullYear(),
    geography: "",
  });

  // Filter sources
  const filteredSources = useMemo(() => {
    return initialSources.filter((source) => {
      if (filterStepId !== "all" && source.research_step_id !== filterStepId) {
        return false;
      }
      if (filterConfidence !== "all" && source.confidence !== filterConfidence) {
        return false;
      }
      if (filterSourceType !== "all" && source.source_type !== filterSourceType) {
        return false;
      }
      return true;
    });
  }, [initialSources, filterStepId, filterConfidence, filterSourceType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await createSource({
          ...formData,
          research_run_id: runId,
          project_id: projectId,
          date_accessed: new Date().toISOString().split("T")[0],
        });

        // Reset form and close panel
        setFormData({
          title: "",
          url: "",
          source_type: "industry_report",
          metric_category: "market_size",
          confidence: "medium",
          research_step_id: selectedStepId || "",
          key_figures: "",
          usage_notes: "",
          publisher: "",
          year: new Date().getFullYear(),
          geography: "",
        });
        setShowAddPanel(false);
      } catch (error) {
        console.error("Failed to create source:", error);
        alert("Failed to create source. Please try again.");
      }
    });
  };

  const copyCitation = (source: Source) => {
    const citation = `${source.title}${source.publisher ? `. ${source.publisher}` : ""}${source.year ? ` (${source.year})` : ""}${source.url ? `. ${source.url}` : ""}`;
    navigator.clipboard.writeText(citation);
  };

  const getStepTitle = (stepId?: string) => {
    if (!stepId) return "—";
    const step = steps.find((s) => s.id === stepId);
    return step ? `${step.order_index}. ${step.title}` : "—";
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterStepId}
          onChange={(e) => setFilterStepId(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        >
          <option value="all">All Steps</option>
          {steps.map((step) => (
            <option key={step.id} value={step.id}>
              {step.order_index}. {step.title}
            </option>
          ))}
        </select>

        <select
          value={filterConfidence}
          onChange={(e) => setFilterConfidence(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        >
          <option value="all">All Confidence</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filterSourceType}
          onChange={(e) => setFilterSourceType(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-1.5 text-sm"
        >
          <option value="all">All Types</option>
          <option value="industry_report">Industry Report</option>
          <option value="academic">Academic</option>
          <option value="government">Government</option>
          <option value="competitor">Competitor</option>
          <option value="interview">Interview</option>
          <option value="survey">Survey</option>
          <option value="internal">Internal</option>
          <option value="news">News</option>
          <option value="other">Other</option>
        </select>

        <button
          onClick={() => setShowAddPanel(true)}
          className="ml-auto inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Source
        </button>
      </div>

      {/* Source count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredSources.length} of {initialSources.length} sources
      </div>

      {/* Sources list */}
      <div className="space-y-2">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className={cn(
              "rounded-lg border bg-card p-4",
              source.confidence && CONFIDENCE_COLORS[source.confidence]
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{source.title}</h4>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="capitalize">{source.source_type?.replace("_", " ")}</span>
                  {source.metric_category && (
                    <span className="capitalize">{source.metric_category.replace("_", " ")}</span>
                  )}
                  {source.confidence && (
                    <span className={cn(
                      "rounded-full px-2 py-0.5 font-medium",
                      source.confidence === "high" && "bg-green-100 text-green-700",
                      source.confidence === "medium" && "bg-yellow-100 text-yellow-700",
                      source.confidence === "low" && "bg-red-100 text-red-700"
                    )}>
                      {source.confidence}
                    </span>
                  )}
                  <span>{getStepTitle(source.research_step_id)}</span>
                  {source.date_accessed && (
                    <span>Accessed: {new Date(source.date_accessed).toLocaleDateString()}</span>
                  )}
                </div>
                {source.key_figures && (
                  <p className="mt-2 text-xs bg-muted/50 rounded p-2">{source.key_figures}</p>
                )}
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => copyCitation(source)}
                  className="rounded p-1 hover:bg-accent"
                  title="Copy citation"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  className="rounded p-1 hover:bg-accent"
                  title="Edit source"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  className="rounded p-1 hover:bg-accent"
                  title="View details"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredSources.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No sources found. Click "Add Source" to create one.
          </div>
        )}
      </div>

      {/* Add Source Sliding Panel */}
      {showAddPanel && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowAddPanel(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background p-4">
              <h3 className="text-lg font-semibold">Add Source</h3>
              <button
                onClick={() => setShowAddPanel(false)}
                className="rounded p-1 hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Source Type</label>
                <select
                  value={formData.source_type}
                  onChange={(e) => setFormData({ ...formData, source_type: e.target.value as SourceType })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="industry_report">Industry Report</option>
                  <option value="academic">Academic</option>
                  <option value="government">Government</option>
                  <option value="competitor">Competitor</option>
                  <option value="interview">Interview</option>
                  <option value="survey">Survey</option>
                  <option value="internal">Internal</option>
                  <option value="news">News</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Research Step</label>
                <select
                  value={formData.research_step_id}
                  onChange={(e) => setFormData({ ...formData, research_step_id: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Not linked to a step</option>
                  {steps.map((step) => (
                    <option key={step.id} value={step.id}>
                      {step.order_index}. {step.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Metric Category</label>
                <select
                  value={formData.metric_category}
                  onChange={(e) => setFormData({ ...formData, metric_category: e.target.value as MetricCategory })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="market_size">Market Size</option>
                  <option value="growth_rate">Growth Rate</option>
                  <option value="pricing">Pricing</option>
                  <option value="adoption">Adoption</option>
                  <option value="competitive">Competitive</option>
                  <option value="segment">Segment</option>
                  <option value="behavioral">Behavioral</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confidence</label>
                <select
                  value={formData.confidence}
                  onChange={(e) => setFormData({ ...formData, confidence: e.target.value as Confidence })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Publisher</label>
                <input
                  type="text"
                  value={formData.publisher}
                  onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Geography</label>
                <input
                  type="text"
                  value={formData.geography}
                  onChange={(e) => setFormData({ ...formData, geography: e.target.value })}
                  placeholder="e.g., Global, North America, UK"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Key Figures</label>
                <textarea
                  value={formData.key_figures}
                  onChange={(e) => setFormData({ ...formData, key_figures: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Important numbers, statistics, or findings..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Usage Notes</label>
                <textarea
                  value={formData.usage_notes}
                  onChange={(e) => setFormData({ ...formData, usage_notes: e.target.value })}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="How to use this source, caveats, etc..."
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isPending ? "Creating..." : "Create Source"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPanel(false)}
                  className="rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
