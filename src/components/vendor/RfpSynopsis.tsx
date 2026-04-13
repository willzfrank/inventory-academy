import Badge from "@/components/ui/Badge";
import DecisionBadge from "@/components/vendor-applications/DecisionBadge";
import { Icon } from "@iconify/react";
import {
  vendorProfileCardClass,
  vendorProfileCompanyProfileTitleClass,
  vendorProfileFieldRowClass,
  vendorProfileLabelClass,
  vendorProfileMultilineBodyClass,
  vendorProfileSectionTitleClass,
  vendorProfileSubsectionLabelClass,
  vendorProfileValueClass,
} from "@/components/vendor/vendorProfileUi";

const outlineItems = [
  "Cloud Fundamentals & Architecture Patterns",
  "Containerization & Kubernetes",
  "CI/CD & Devops Automation",
];

const learningObjectives = [
  "Design and implement scalable cloud-native architectures",
  "Design and implement scalable cloud-native architectures",
  "Design and implement scalable cloud-native architectures",
];

const feeLines: { label: string; amount: string; bold?: boolean }[] = [
  { label: "Total Proposed Fee", amount: "₦15,000,000.00", bold: true },
  { label: "Training Delivery (36 sessions x 3 hours)", amount: "₦10,800,000.00" },
  { label: "Course Materials & Lab Environment Setup", amount: "₦1,500,000.00" },
  { label: "Post-Training Support (3 months)", amount: "₦1,200,000.00" },
  { label: "Certification Exam Vouchers (AWS/Azure)", amount: "₦1,000,000.00" },
  { label: "Project Mentorship & Code Review", amount: "₦500,000.00" },
];

const feeRowClass =
  "flex min-w-0 items-start justify-between gap-4 text-base font-normal leading-6 text-neutral-black1";

export default function RfpSynopsis() {
  return (
    <div className="space-y-4">
      <section className={vendorProfileCardClass}>
        <div className="py-2.5">
          <h2 className={vendorProfileSectionTitleClass}>
            System-Generated RFP Synopsis Details
          </h2>
          <p className="mt-1 text-base font-normal leading-6 text-neutral-black4">
            Comprehensive Overview of the Vendor&apos;s Proposal
          </p>
        </div>
        <h3 className={`${vendorProfileSectionTitleClass} mt-6`}>Vendor Details</h3>
        <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2">
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Vendor Name:</span>
            <span className={vendorProfileValueClass}>TechSkills Training Ltd</span>
          </p>
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Vendor ID:</span>
            <span className={vendorProfileValueClass}>VEN-2026-001</span>
          </p>
          <p className={`${vendorProfileFieldRowClass} md:col-span-2`}>
            <span className={vendorProfileLabelClass}>Area of Specialization:</span>
            <span className={vendorProfileValueClass}>
              Software Development &amp; Cloud Computing
            </span>
          </p>
        </div>
      </section>

      <section className={vendorProfileCardClass}>
        <h3 className={vendorProfileSectionTitleClass}>Training Program Details</h3>
        <p className={`${vendorProfileFieldRowClass} mt-3`}>
          <span className={vendorProfileLabelClass}>Training Title:</span>
          <span className={vendorProfileValueClass}>
            Advanced Cloud Architecture &amp; Devops Transformation Program
          </span>
        </p>
        <div className="mt-4 min-w-0">
          <span className={vendorProfileCompanyProfileTitleClass}>Content Overview:</span>
          <span className={vendorProfileMultilineBodyClass}>
            This 12-week intensive program is designed to upskill IT professionals in modern cloud
            infrastructure, container orchestration, and automated deployment pipelines.
            Participants will gain hands-on experience with industry-leading tools and best
            practices aligned with Sterling Bank&apos;s digital transformation roadmap.
          </span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-x-12 gap-y-3 md:grid-cols-2">
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Training Duration:</span>
            <span className={vendorProfileValueClass}>12 weeks</span>
          </p>
          <p className="flex min-w-0 items-center gap-x-1 text-base font-normal leading-6 text-neutral-black1">
            <span className={vendorProfileLabelClass}>Mode of Delivery:</span>
            <span className="min-w-0">
              <Badge label="Hybrid" />
            </span>
          </p>
        </div>
      </section>

      <section className={vendorProfileCardClass}>
        <h3 className={vendorProfileSectionTitleClass}>Course Overview</h3>
        <div className="mt-3 min-w-0">
          <span className={vendorProfileCompanyProfileTitleClass}>Content:</span>
          <span className={vendorProfileMultilineBodyClass}>
            The curriculum covers foundational cloud concepts through advanced topics including
            microservices architecture, infrastructure as code, security hardening, and
            observability. Each module includes practical labs and capstone projects simulating
            real-world banking technology scenarios.
          </span>
        </div>
        <p className={`${vendorProfileSubsectionLabelClass} mt-4`}>Outline:</p>
        <div className="mt-2 space-y-2">
          {outlineItems.map((item) => (
            <div
              key={item}
              className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#374151]"
            >
              {item}
            </div>
          ))}
        </div>
        <p className={`${vendorProfileSubsectionLabelClass} mt-4`}>Learning Objectives:</p>
        <div className="mt-2 space-y-2">
          {learningObjectives.map((obj, i) => (
            <div
              key={`${obj}-${i}`}
              className="flex items-start gap-3 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#374151]"
            >
              <Icon icon="prime:check-circle" width="24" height="24" color="#22C55E" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={vendorProfileCardClass}>
        <h3 className={vendorProfileSectionTitleClass}>Proposed Fee &amp; Cost Structure</h3>
        <div className="mt-4 space-y-3">
          {feeLines.map((line) => (
            <div key={line.label} className={feeRowClass}>
              <span
                className={`min-w-0 flex-1 ${line.bold ? "font-bold" : "truncate"}`}
              >
                {line.label}
              </span>
              <span
                className={`shrink-0 tabular-nums ${line.bold ? "font-bold" : ""}`}
              >
                {line.amount}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={vendorProfileCardClass}>
        <h3 className={vendorProfileSectionTitleClass}>Screening Analysis</h3>
        <div className="mt-4 space-y-3">
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Screening Officer:</span>
            <span className={vendorProfileValueClass}>Mayowa Ojo</span>
          </p>
          <p className={vendorProfileFieldRowClass}>
            <span className={vendorProfileLabelClass}>Date of Screening:</span>
            <span className={vendorProfileValueClass}>06/03/2026</span>
          </p>
          <p className="flex min-w-0 flex-wrap items-center gap-x-1 gap-y-2 text-base font-normal leading-6 text-neutral-black1">
            <span className={vendorProfileLabelClass}>Recommendation Status:</span>
            <DecisionBadge decision="approved" />
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <div className="min-w-0">
            <p className={vendorProfileSubsectionLabelClass}>SA Officer Screening Remarks</p>
            <div className="mt-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3 text-sm leading-6 text-[#1E3A5F]">
              Vendor demonstrates strong technical competency and relevant industry experience.
              Proposal aligns well with Sterling Academy&apos;s cloud modernization objectives.
              Recommended to proceed to evaluation scoring phase.
            </div>
          </div>
          <div className="min-w-0">
            <p className={vendorProfileSubsectionLabelClass}>
              Relevance to Current Training Needs
            </p>
            <div className="mt-2 rounded-lg border border-[#BFDBFE] bg-[#F0FDF4] px-4 py-3 text-sm leading-6 text-primary-sterling-black">
              The proposed curriculum directly addresses identified skill gaps in our IT
              infrastructure team. Hybrid delivery model accommodates both on-site and remote
              learning preferences, ensuring maximum participation across departments.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
