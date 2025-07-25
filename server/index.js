const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI();

app.post("/summarize", async (req, res) => {
  const { inputText } = req.body;

  const prompt = `
    You are a sales assistant. Analyze the text below for lead qualification. Summarize the message in one sentence, extract BANT criteria, score the lead as Hot/Warm/Cold, and suggest next steps.

    TEXT:
    ${inputText}

    Respond ONLY in this format:
    {
      "summary": "...",
      "qualification_score": "...",
      "signals": {
        "Budget": "...",
        "Authority": "...",
        "Need": "...",
        "Timeline": "..."
      },
      "recommendation": "..."
    }
      `;

  console.log(prompt);

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-nano",
      input: prompt,
    });

    console.log("response: ", response.output_text);

    res.json(JSON.parse(response.output_text));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing request. Please try again.");
  }
});

app.listen(5001, () => console.log("Server running on http://localhost:5001"));
