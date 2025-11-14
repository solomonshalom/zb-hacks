import type { NextApiRequest, NextApiResponse } from "next";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, projects } = req.body;

  const systemPrompt = `You are a helpful AI assistant for the Zerobase X Lovable Hackathon. You have access to information about all the projects submitted to the hackathon.

Here are the projects:
${projects.map((p: any) => `
Project: ${p.title}
Created by: ${p.name}
One-liner: ${p.oneLiner}
Link: ${p.link}
Results/Achievements: ${p.results}
---
`).join("\n")}

Answer questions about these projects in a friendly and informative way. Help users discover interesting projects and provide insights about what people have built.`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: true,
    });

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
