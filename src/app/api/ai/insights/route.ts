import { NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini/client";
import { buildAnalystPrompt } from "@/lib/prompts/analyst";
import { revenueData, acquisitionData, retentionData } from "@/data/mock-analytics";
import { AIAnalysisResponse } from "@/types/ai";
import { aiRouteGuard } from "@/lib/ops/rate-limit";
import { logger } from "@/lib/ops/logger";

export async function GET(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const guard = aiRouteGuard(ip);
    if (!guard.success) {
      logger.warn("AI insights rate limit exceeded", { ip });
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const model = getGeminiModel();
    
    // Fallback if no Gemini key is provided
    if (!model) {
      return NextResponse.json<AIAnalysisResponse>({
        summary: "Your startup is showing strong revenue growth, but retention needs attention. (Fallback Data: Configure GEMINI_API_KEY for live analysis).",
        risks: [
          { title: "Cohort Churn", description: "Week 4 retention drops below 70%, indicating onboarding friction.", impact: "High" }
        ],
        opportunities: [
          { title: "Paid Acq Scale", description: "Paid traffic converts exceptionally well. Increase ad spend by 15%.", action: "Scale Spend", confidence: 88 }
        ],
        recommendations: [
          "Deploy automated re-engagement emails on Day 21.",
          "Conduct user interviews for the Week 4 churn group."
        ],
        confidenceScore: 92,
        priority: "High",
        trendDirection: "Up"
      });
    }

    const payload = {
      revenue: revenueData,
      acquisition: acquisitionData,
      retention: retentionData
    };

    const prompt = buildAnalystPrompt(payload);
    const result = await model.generateContent(prompt);
    const textResponse = result.response.text();
    
    const parsedData: AIAnalysisResponse = JSON.parse(textResponse);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error("AI Insight Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI insights." },
      { status: 500 }
    );
  }
}
