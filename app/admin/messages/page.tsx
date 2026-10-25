import React from "react";
import { getContactSubmissions } from "@/lib/data/store";
import { MessagesManager } from "@/components/admin/MessagesManager";

export default async function AdminMessagesPage() {
  const submissions = await getContactSubmissions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          Inquiries & Messages
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, categorize, and follow up on client project inquiries and senior role leads.
        </p>
      </div>

      <MessagesManager initialSubmissions={submissions} />
    </div>
  );
}
