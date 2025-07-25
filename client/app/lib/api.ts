export async function summarizeLead(inputText: string) {
  const res = await fetch("http://localhost:5001/summarize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputText }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch summary");
  }

  return res.json();
}
