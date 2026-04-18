import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import knowledgeBase from "@/data/knowledgeBase.json";

const SYSTEM_PROMPT = `
You are the AI Assistant for Adbhutha Beere's Portfolio. Your goal is to provide insightful, professional, and friendly information about her to recruiters, collaborators, and visitors. 

### ADHUTHA BEERE'S KNOWLEDGE BASE:
${JSON.stringify(knowledgeBase, null, 2)}

### GUIDELINES:
1. Always speak in the 3rd person ("Adbhutha has...", "She built...").
2. Use the provided Knowledge Base to answer granular questions about her 30+ projects, research, and skills.
3. If asked about contact details, mention LinkedIn (linkedin.com/in/adbhutha) or GitHub (github.com/Adbhutha10).
4. If you don't know the answer, politely suggest checking the specific sections on the portfolio (Projects, Experience, About).
5. Highlight her ambition to build scalable, AI-driven solutions for real-world impact.
6. Be concise but maintain technical depth when asked about ML, Cloud, or Full-Stack details.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("GROQ_API_KEY is not defined in .env.local");
    }

    const groq = new Groq({ apiKey: apiKey.trim() });

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const text = response.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("Groq API Error details:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch response from AI." },
      { status: 500 }
    );
  }
}
