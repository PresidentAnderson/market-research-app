// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { StepStatus, Source } from "@/lib/types";

/**
 * Update the status of a research step
 */
export async function updateStepStatus(stepId: string, status: StepStatus) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("research_steps")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", stepId)
    .select("research_run_id")
    .single();

  if (error) {
    console.error("Error updating step status:", error);
    throw new Error("Failed to update step status");
  }

  // Revalidate the research run page
  if (data?.research_run_id) {
    revalidatePath(`/research-runs/${data.research_run_id}`);
  }

  return { success: true };
}

/**
 * Create a new source
 */
export async function createSource(sourceData: Omit<Source, "id" | "created_at" | "updated_at">) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("sources")
    .insert({
      ...sourceData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating source:", error);
    throw new Error("Failed to create source");
  }

  // Revalidate the research run page
  revalidatePath(`/research-runs/${sourceData.research_run_id}`);

  return { success: true, data };
}

/**
 * Update an existing source
 */
export async function updateSource(
  sourceId: string,
  sourceData: Partial<Omit<Source, "id" | "created_at" | "updated_at">>
) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("sources")
    .update({
      ...sourceData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", sourceId)
    .select("research_run_id")
    .single();

  if (error) {
    console.error("Error updating source:", error);
    throw new Error("Failed to update source");
  }

  // Revalidate the research run page
  if (data?.research_run_id) {
    revalidatePath(`/research-runs/${data.research_run_id}`);
  }

  return { success: true };
}

/**
 * Delete a source
 */
export async function deleteSource(sourceId: string, researchRunId: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("sources").delete().eq("id", sourceId);

  if (error) {
    console.error("Error deleting source:", error);
    throw new Error("Failed to delete source");
  }

  // Revalidate the research run page
  revalidatePath(`/research-runs/${researchRunId}`);

  return { success: true };
}
