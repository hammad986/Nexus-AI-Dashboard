import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini/client";
import { buildChatContextPrompt } from "@/lib/prompts/chat";
import { ChatRequest } from "@/types/chat";
import { aiRouteGuard } from "@/lib/ops/rate-limit";
import { logger } from "@/lib/ops/logger";

const MOCK_FALLBACKS: Record<string, string> = {
  'Hyper-growth': "I'm running in offline mode. In the Hyper-growth scenario, MRR is up ~35% with strong paid acquisition driving the lift. Key watch-out: unit economics — if CAC is scaling faster than LTV, growth becomes unsustainable. Add GEMINI_API_KEY to .env.local for live analysis.",
  'Retention Crisis': "I'm running in offline mode. In the Retention Crisis scenario, W4 retention has dropped to ~50% — significantly below the healthy 70% baseline. Immediate re-engagement campaigns targeting cohort 2024-Q3 are critical. Add GEMINI_API_KEY to .env.local for live analysis.",
  'Revenue Anomaly': "I'm running in offline mode. In the Revenue Anomaly scenario, there's a sharp revenue spike in November (+60%). First priority: determine if this is a real signal (new enterprise deal, viral event) or a billing artifact. Add GEMINI_API_KEY to .env.local for live analysis.",
  'Acquisition Spike': "I'm running in offline mode. In the Acquisition Spike scenario, paid acquisition is up 3× for one day — likely a successful ad campaign or a viral moment. Focus on conversion quality: high volume traffic with poor retention is expensive. Add GEMINI_API_KEY to .env.local for live analysis.",
};

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const guard = aiRouteGuard(ip);
    if (!guard.success) {
      logger.warn("AI route rate limit exceeded", { ip });
      return NextResponse.json({ error: "Rate limit exceeded. Please upgrade plan." }, { status: 429 });
    }

    const body: ChatRequest = await req.json();
    const { messages, context } = body;
    const scenarioName = context?.scenarioName as string | undefined;
    const scenarioMetrics = context?.metrics;

    const model = getGeminiModel();

    if (!model) {
      const mockText = MOCK_FALLBACKS[scenarioName ?? '']
        ?? "I'm currently running in offline mode. Please add your GEMINI_API_KEY to .env.local to unlock live conversational analysis. Based on the mock data, your W4 retention is dropping to 70%. Consider setting up automated re-engagement.";

      return new NextResponse(
        new ReadableStream({
          start(controller) {
            let i = 0;
            const interval = setInterval(() => {
              if (i < mockText.length) {
                controller.enqueue(new TextEncoder().encode(mockText[i]));
                i++;
              } else {
                clearInterval(interval);
                controller.close();
              }
            }, 18);
          }
        }),
        { headers: { "Content-Type": "text/plain" } }
      );
    }

    const systemPrompt = buildChatContextPrompt(scenarioMetrics, scenarioName);

    const chat = model.startChat({
      systemInstruction: systemPrompt,
      history: messages.slice(0, -1).map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }))
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessageStream(userMessage);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            controller.enqueue(new TextEncoder().encode(chunk.text()));
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
