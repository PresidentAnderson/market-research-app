// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { StepStatus, Source, Project, ResearchRun } from "@/lib/types";
import { MR_STEPS } from "@/lib/marketResearchSteps";

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

/**
 * Create a new project
 */
export async function createProject(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) {
    throw new Error("Project name is required");
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .insert({
      name,
      description: description || null,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (projectError) {
    console.error("Error creating project:", projectError);
    throw new Error("Failed to create project");
  }

  revalidatePath("/");
  redirect(`/projects/${project.id}`);
}

/**
 * Create a new research run within a project
 */
export async function createResearchRun(projectId: string, formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const label = formData.get("label") as string;
  const description = formData.get("description") as string;
  const startDate = formData.get("start_date") as string;

  if (!label) {
    throw new Error("Research run label is required");
  }

  // Create the research run
  const { data: run, error: runError } = await supabase
    .from("research_runs")
    .insert({
      project_id: projectId,
      label,
      description: description || null,
      start_date: startDate || null,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (runError) {
    console.error("Error creating research run:", runError);
    throw new Error("Failed to create research run");
  }

  // Initialize all 19 steps for this run
  const steps = MR_STEPS.map((step) => ({
    research_run_id: run.id,
    order_index: step.order,
    title: step.title,
    notes: step.notes,
    status: "not_started" as const,
    created_at: new Date().toISOString(),
  }));

  const { error: stepsError } = await supabase.from("research_steps").insert(steps);

  if (stepsError) {
    console.error("Error creating research steps:", stepsError);
    throw new Error("Failed to initialize research steps");
  }

  revalidatePath(`/projects/${projectId}`);
  redirect(`/research-runs/${run.id}`);
}
