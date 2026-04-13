export type VendorApplicationDecision = "keepInPool" | "approved" | "declined";

export interface VendorApplicationListRow {
  vendorName: string;
  vendorId: string;
  trainingTitle: string;
  date: string;
  decision: VendorApplicationDecision;
}

/** Same vendor IDs as dashboard samples where they overlap; links to `/vendors/[id]`. */
export const VENDOR_APPLICATIONS_LIST: VendorApplicationListRow[] = [
  {
    vendorName: "TechSkills Training Ltd",
    vendorId: "APP-001",
    trainingTitle: "Software Development",
    date: "02/05/25",
    decision: "keepInPool",
  },
  {
    vendorName: "Global Leadership Institute",
    vendorId: "APP-002",
    trainingTitle: "Leadership & Management",
    date: "02/05/25",
    decision: "keepInPool",
  },
  {
    vendorName: "Data Science Academy",
    vendorId: "APP-003",
    trainingTitle: "Data Analytics Fundamentals",
    date: "02/05/25",
    decision: "approved",
  },
  {
    vendorName: "Communication Excellence",
    vendorId: "APP-004",
    trainingTitle: "Soft Skills Development",
    date: "02/05/25",
    decision: "declined",
  },
  {
    vendorName: "Cybersecurity Training Pro",
    vendorId: "APP-005",
    trainingTitle: "IT Security Essentials",
    date: "02/05/25",
    decision: "approved",
  },
  {
    vendorName: "Agile Coaches Collective",
    vendorId: "APP-006",
    trainingTitle: "Agile & Scrum Fundamentals",
    date: "03/05/25",
    decision: "keepInPool",
  },
  {
    vendorName: "Finance Skills Hub",
    vendorId: "APP-007",
    trainingTitle: "Corporate Finance Basics",
    date: "03/05/25",
    decision: "declined",
  },
  {
    vendorName: "Design Studio Partners",
    vendorId: "APP-008",
    trainingTitle: "UX Research Methods",
    date: "04/05/25",
    decision: "approved",
  },
  {
    vendorName: "Operations Excellence Ltd",
    vendorId: "APP-009",
    trainingTitle: "Process Improvement",
    date: "04/05/25",
    decision: "keepInPool",
  },
  ...Array.from({ length: 31 }, (_, i) => {
    const n = i + 10;
    const decisions: VendorApplicationDecision[] = [
      "keepInPool",
      "approved",
      "declined",
    ];
    const decision = decisions[n % 3];
    return {
      vendorName: `Training Partner ${n}`,
      vendorId: `APP-${String(n).padStart(3, "0")}`,
      trainingTitle: `Professional Skills Track ${n}`,
      date: `${String((n % 28) + 1).padStart(2, "0")}/05/25`,
      decision,
    } satisfies VendorApplicationListRow;
  }),
];
