export const revenueData = [
  { name: "Jan", current: 45000, previous: 38000, predicted: 45000 },
  { name: "Feb", current: 52000, previous: 41000, predicted: 52000 },
  { name: "Mar", current: 48000, previous: 45000, predicted: 48000 },
  { name: "Apr", current: 61000, previous: 48000, predicted: 61000 },
  { name: "May", current: 59000, previous: 52000, predicted: 59000 },
  { name: "Jun", current: 68000, previous: 56000, predicted: 68000 },
  { name: "Jul", current: 74000, previous: 61000, predicted: 74000 },
  { name: "Aug", current: 81000, previous: 64000, predicted: 81000 },
  { name: "Sep", current: 86000, previous: 68000, predicted: 86000 },
  { name: "Oct", current: 92000, previous: 73000, predicted: 92000 },
  { name: "Nov", current: 0, previous: 78000, predicted: 98000 },
  { name: "Dec", current: 0, previous: 85000, predicted: 106000 },
]

export const acquisitionData = [
  { name: "Mon", organic: 340, paid: 120, referral: 80 },
  { name: "Tue", organic: 410, paid: 180, referral: 95 },
  { name: "Wed", organic: 390, paid: 150, referral: 88 },
  { name: "Thu", organic: 480, paid: 210, referral: 120 },
  { name: "Fri", organic: 520, paid: 230, referral: 140 },
  { name: "Sat", organic: 290, paid: 90, referral: 60 },
  { name: "Sun", organic: 250, paid: 70, referral: 50 },
]

export const retentionData = [
  { cohort: "Week 1", retention: 100 },
  { cohort: "Week 2", retention: 85 },
  { cohort: "Week 3", retention: 76 },
  { cohort: "Week 4", retention: 70 },
  { cohort: "Week 5", retention: 65 },
  { cohort: "Week 6", retention: 62 },
  { cohort: "Week 7", retention: 58 },
  { cohort: "Week 8", retention: 55 },
]

export const aiInsights = [
  {
    id: "ins-1",
    type: "opportunity",
    title: "Upsell Opportunity Detected",
    description: "28 mid-tier customers exhibit usage patterns identical to your enterprise segment. Auto-triggering upgrade campaign could yield ~$14k MRR.",
    confidence: 94,
    impact: "High",
    action: "Review Segment",
  },
  {
    id: "ins-2",
    type: "warning",
    title: "Elevated Churn Risk",
    description: "Login frequency for cohort 2024-Q3 has dropped by 18% over the last two weeks. Immediate activation of re-engagement sequence recommended.",
    confidence: 87,
    impact: "Critical",
    action: "View Cohort",
  },
  {
    id: "ins-3",
    type: "neutral",
    title: "Feature Adoption Anomaly",
    description: "The 'Advanced Reporting' module usage spiked 300% after yesterday's newsletter. Consider adding a quick-tour tool tip to improve completion rates.",
    confidence: 91,
    impact: "Medium",
    action: "Analyze Usage",
  }
]
