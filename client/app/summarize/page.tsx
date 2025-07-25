"use client";

import LeadSummaryForm from "@/app/components/LeadSummaryForm";

export default function SummarizePage() {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Lead Qualification Summarizer</h1>
      <LeadSummaryForm />
    </div>
  );
}
