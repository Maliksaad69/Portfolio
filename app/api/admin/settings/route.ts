import { NextRequest, NextResponse } from "next/server";
import { updateProfile, updateSiteSettings } from "@/lib/data/store";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { profile, settings } = await req.json();

    const supabase = await createClient();
    if (supabase) {
      if (profile) await supabase.from("profiles").upsert(profile);
      if (settings) {
        await supabase.from("site_settings").upsert({
          key: "general",
          value: settings,
        });
      }
    }

    if (profile) await updateProfile(profile);
    if (settings) await updateSiteSettings(settings);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update settings";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
