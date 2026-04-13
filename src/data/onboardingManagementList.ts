export type OnboardingStatus =
  | "pendingUpload"
  | "validated"
  | "pendingValidation"
  | "pendingSubmission";

export interface OnboardingManagementListRow {
  vendorName: string;
  vendorId: string;
  trainingTitle: string;
  approvalDate: string;
  onboardingStatus: OnboardingStatus;
}

export const ONBOARDING_MANAGEMENT_LIST: OnboardingManagementListRow[] = [
  {
    vendorName: "TechSkills Training Ltd",
    vendorId: "APP-001",
    trainingTitle: "Software Development",
    approvalDate: "02/05/25",
    onboardingStatus: "pendingUpload",
  },
  {
    vendorName: "Global Leadership Institute",
    vendorId: "APP-002",
    trainingTitle: "Leadership & Management",
    approvalDate: "02/05/25",
    onboardingStatus: "pendingUpload",
  },
  {
    vendorName: "Data Science Academy",
    vendorId: "APP-003",
    trainingTitle: "Data Analytics Fundamentals",
    approvalDate: "02/05/25",
    onboardingStatus: "validated",
  },
  {
    vendorName: "Communication Excellence",
    vendorId: "APP-004",
    trainingTitle: "Soft Skills Development",
    approvalDate: "02/05/25",
    onboardingStatus: "pendingValidation",
  },
  {
    vendorName: "Cybersecurity Training Pro",
    vendorId: "APP-005",
    trainingTitle: "IT Security Essentials",
    approvalDate: "02/05/25",
    onboardingStatus: "validated",
  },
  ...Array.from({ length: 35 }, (_, i) => {
    const n = i + 6;
    const statuses: OnboardingStatus[] = [
      "pendingSubmission",
      "pendingUpload",
      "validated",
      "pendingValidation",
    ];
    return {
      vendorName: `Cybersecurity Training Pro`,
      vendorId: `APP-${String(Math.min(n, 40)).padStart(3, "0")}`,
      trainingTitle:
        n % 5 === 1 ? "IT Security Essentials" : `Professional Skills Track ${n}`,
      approvalDate: "02/05/25",
      onboardingStatus: statuses[n % statuses.length],
    } satisfies OnboardingManagementListRow;
  }),
];
