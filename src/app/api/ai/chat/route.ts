import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini/client";
import { buildChatContextPrompt } from "@/lib/prompts/chat";
import { ChatRequest } from "@/types/chat";
import { aiRouteGuard } from "@/lib/ops/rate-limit";
import { logger } from "@/lib/ops/logger";

export async function POST(req: Request) {
  try {
    // 1. Enterprise AI Route Guard (Rate Limiting)
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const guard = aiRouteGuard(ip);
    if (!guard.success) {
      logger.warn("AI route rate limit exceeded", { ip });
      return NextResponse.json({ error: "Rate limit exceeded. Please upgrade plan." }, { status: 429 });
    }

    const body: ChatRequest = await req.json();
    const { messages } = body;

    const model = getGeminiModel();

    if (!model) {
      // Mock fallback response for development without API key
      return new NextResponse(
        new ReadableStream({
          start(controller) {
            const mockText = "I'm currently running in offline mode. Please add your `GEMINI_API_KEY` to `.env.local` to unlock live conversational analysis. Based on the mock data, your W4 retention is dropping to 70%. Consider setting up automated re-engagement.";
            let i = 0;
            const interval = setInterval(() => {
              if (i < mockText.length) {
                controller.enqueue(new TextEncoder().encode(mockText[i]));
                i++;
              } else {
                clearInterval(interval);
                controller.close();
              }
            }, 20); // simulate streaming delay
          }
        }),
        { headers: { "Content-Type": "text/plain" } }
      );
    }

    // Construct history for Gemini
    const systemPrompt = buildChatContextPrompt();
    
    // Gemini chat API expects a specific format. 
    // We can also just send the entire conversation as text for simple 1.5 flash, or use startChat.
    const chat = model.startChat({
      systemInstruction: systemPrompt,
      history: messages.slice(0, -1).map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }))
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessageStream(userMessage);

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      }
    });

    return new NextResponse(stream, {
      headers: { "Content-Type": "text/plain" }
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      { error: "Failed to process chat query." },
      { status: 500 }
    );
  }
}
