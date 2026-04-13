export const EVALUATION_SCORE_CRITERIA = [
  { id: "technical", label: "Technical Expertise (1-10)", displayLabel: "Technical Expertise" },
  { id: "communication", label: "Communication Skills (1-10)", displayLabel: "Communication Skills" },
  { id: "experience", label: "Relevant Experience (1-10)", displayLabel: "Relevant Experience" },
  {
    id: "cultural",
    label: "Cultural Fit & Alignment (1-10)",
    displayLabel: "Cultural Fit & Alignment",
  },
  { id: "training", label: "Training Quality (1-10)", displayLabel: "Training Quality" },
  { id: "cost", label: "Cost Effectiveness (1-10)", displayLabel: "Cost Effectiveness" },
  {
    id: "implementation",
    label: "Implementation Approach (1-10)",
    displayLabel: "Implementation Approach",
  },
  { id: "strategic", label: "Strategic Fit (1-10)", displayLabel: "Strategic Fit" },
] as const;

/** Nunito Sans / Body / Sm / Regular — for score criterion labels in modal + tab */
export const evaluationCriterionLabelClassName =
  "[font-family:var(--font-nunito-sans),sans-serif] text-[14px] font-normal leading-5 text-[#4A5565]";

export type EvaluationSubmittedPayload = {
  averageDisplay: string;
  scores: Record<string, string>;
  evaluationNote: string;
  recommendation: string;
};

export function formatRecommendationLabel(value: string): {
  text: string;
  variant: "approve" | "neutral" | "decline";
} {
  switch (value) {
    case "approve":
      return { text: "Approve", variant: "approve" };
    case "keep-in-pool":
      return { text: "Keep In Pool", variant: "neutral" };
    case "decline":
      return { text: "Decline", variant: "decline" };
    default:
      return { text: value || "—", variant: "neutral" };
  }
}
