export interface AIInsightRisk {
  title: string;
  description: string;
  impact: "Low" | "Medium" | "High" | "Critical";
}

export interface AIInsightOpportunity {
  title: string;
  description: string;
  confidence: number;
  action: string;
}

export interface AIAnalysisResponse {
  summary: string;
  risks: AIInsightRisk[];
  opportunities: AIInsightOpportunity[];
  recommendations: string[];
  confidenceScore: number;
  priority: "Low" | "Medium" | "High" | "Critical";
  trendDirection: "Up" | "Down" | "Stable";
}
