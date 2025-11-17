// app/research-runs/[id]/ResearchStepsList.tsx
"use client";

import { useState, useTransition } from "react";
import { ChevronDown, ChevronRight, Copy, Plus } from "lucide-react";
import { updateStepStatus } from "@/app/actions";
import type { ResearchStep, Source, StepStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ResearchStepsListProps {
  steps: ResearchStep[];
  sources: Source[];
  selectedStepId: string | null;
}

const STATUS_COLORS: Record<StepStatus, string> = {
  not_started: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  in_progress: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  done: "bg-green-100 text-green-700 hover:bg-green-200",
  blocked: "bg-red-100 text-red-700 hover:bg-red-200",
};

const STATUS_LABELS: Record<StepStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  done: "Done",
  blocked: "Blocked",
};

export function ResearchStepsList({
  steps,
  sources,
  selectedStepId,
}: ResearchStepsListProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const toggleExpand = (stepId: string) => {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  };

  const handleStatusChange = (stepId: string, newStatus: StepStatus) => {
    startTransition(async () => {
      try {
        await updateStepStatus(stepId, newStatus);
      } catch (error) {
        console.error("Failed to update status:", error);
        alert("Failed to update step status. Please try again.");
      }
    });
  };

  const copyNotes = async (notes: string) => {
    try {
      await navigator.clipboard.writeText(notes);
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy notes:", error);
    }
  };

  const getSourceCountForStep = (stepId: string) => {
    return sources.filter((s) => s.research_step_id === stepId).length;
  };

  return (
    <div className="space-y-2">
      {steps.map((step) => {
        const isExpanded = expandedSteps.has(step.id);
        const sourceCount = getSourceCountForStep(step.id);

        return (
          <div
            key={step.id}
            className={cn(
              "rounded-lg border bg-card transition-colors",
              selectedStepId === step.id && "ring-2 ring-primary"
            )}
          >
            {/* Compact Row */}
            <div className="flex items-center gap-3 p-4">
              {/* Order indicator */}
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {step.order_index.toString().padStart(2, "0")}
              </div>

              {/* Title and metadata */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm leading-tight">
                  {step.title}
                </h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  {step.due_date && (
                    <span>Due: {new Date(step.due_date).toLocaleDateString()}</span>
                  )}
                  <span>{sourceCount} {sourceCount === 1 ? "source" : "sources"}</span>
                </div>
              </div>

              {/* Status dropdown */}
              <select
                value={step.status}
                onChange={(e) => handleStatusChange(step.id, e.target.value as StepStatus)}
                disabled={isPending}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer border-0 focus:ring-2 focus:ring-offset-2",
                  STATUS_COLORS[step.status]
                )}
                onClick={(e) => e.stopPropagation()}
              >
                {(Object.keys(STATUS_LABELS) as StepStatus[]).map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>

              {/* Expand button */}
              <button
                onClick={() => toggleExpand(step.id)}
                className="flex-shrink-0 rounded p-1 hover:bg-accent"
              >
                {isExpanded ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div className="border-t bg-muted/30 p-4">
                <div className="mb-3 text-sm text-muted-foreground whitespace-pre-wrap">
                  {step.notes}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => copyNotes(step.notes)}
                    className="inline-flex items-center gap-1 rounded-md bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
                  >
                    <Copy className="h-3 w-3" />
                    Copy Instructions
                  </button>
                  <button
                    className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="h-3 w-3" />
                    Add Source
                  </button>
                  <button
                    className="inline-flex items-center gap-1 rounded-md bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent"
                  >
                    View Sources ({sourceCount})
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
