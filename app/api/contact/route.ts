import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { saveContactSubmission } from "@/lib/data/store";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message, project_type } = result.data;

    // Check if Supabase is active
    const supabase = await createClient();
    if (supabase) {
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name,
        email,
        subject,
        message,
        project_type,
        status: "unread",
      });
      if (dbError) {
        console.error("Supabase insert error:", dbError);
      }
    }

    // Always record in local store as well
    const submission = await saveContactSubmission({
      name,
      email,
      subject,
      message,
      project_type,
    });

    return NextResponse.json(
      { success: true, message: "Thank you! Your message has been received.", id: submission.id },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
