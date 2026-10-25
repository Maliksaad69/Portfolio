import { NextRequest, NextResponse } from "next/server";
import { saveCaseStudy, deleteCaseStudy } from "@/lib/data/store";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabase = await createClient();
    if (supabase) {
      await supabase.from("case_studies").upsert(body);
    }

    const caseStudy = await saveCaseStudy(body);
    return NextResponse.json({ success: true, caseStudy });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const supabase = await createClient();
    if (supabase) {
      await supabase.from("case_studies").delete().eq("id", id);
    }

    const success = await deleteCaseStudy(id);
    return NextResponse.json({ success });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
