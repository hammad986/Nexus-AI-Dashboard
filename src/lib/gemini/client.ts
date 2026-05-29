import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini Client
// We instantiate this lazily to allow providing the API key at runtime if needed,
// but pull from process.env natively.
export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY || "";
  
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will run in fallback mode.");
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Use 1.5-flash for fast, structured JSON generation
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2, // Low temp for analytical consistency
    }
  });
}
