import { NextRequest, NextResponse } from "next/server";
import { saveProject, deleteProject } from "@/lib/data/store";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if Supabase client is connected
    const supabase = await createClient();
    if (supabase) {
      // If Supabase is active, upsert
      const { error } = await supabase.from("projects").upsert(body);
      if (error) {
        console.error("Supabase project upsert error:", error);
      }
    }

    // Always update local data store
    const project = await saveProject(body);

    return NextResponse.json({ success: true, project });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save project";
    console.error("Project API error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing project ID" }, { status: 400 });
    }

    const supabase = await createClient();
    if (supabase) {
      await supabase.from("projects").delete().eq("id", id);
    }

    const success = await deleteProject(id);
    return NextResponse.json({ success });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
