"use client";

import { useState } from "react";
import { summarizeLead } from "@/app/lib/api";

export default function LeadSummaryForm() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await summarizeLead(inputText);
      setResult(res);
    } catch (err) {
      setError(`Something went wrong: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={6}
        className="w-full border rounded p-2"
        placeholder="Paste lead message here..."
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Summarize"}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {result && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h2 className="font-bold mb-2">Summary:</h2>
          <p>{result.summary}</p>
          <h2 className="font-bold mt-4">Qualification Score:</h2>
          <p>{result.qualification_score}</p>
          <h2 className="font-bold mt-4">BANT Signals:</h2>
          <ul className="list-disc pl-5">
            {Object.entries(result.signals).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value as string}
              </li>
            ))}
          </ul>
          <h2 className="font-bold mt-4">Recommendation:</h2>
          <p>{result.recommendation}</p>
        </div>
      )}
    </form>
  );
}
