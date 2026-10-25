import { NextRequest, NextResponse } from "next/server";
import { updateSubmissionStatus } from "@/lib/data/store";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const supabase = await createClient();
    if (supabase) {
      await supabase.from("contact_submissions").update({ status }).eq("id", id);
    }

    const ok = await updateSubmissionStatus(id, status);
    return NextResponse.json({ success: ok });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update status";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
