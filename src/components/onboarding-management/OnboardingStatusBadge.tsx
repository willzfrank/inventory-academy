import { CheckCircle2, Clock3 } from "lucide-react";
import type { OnboardingStatus } from "@/data/onboardingManagementList";

const config: Record<
  OnboardingStatus,
  {
    label: string;
    className: string;
  }
> = {
  pendingUpload: {
    label: "Pending Upload",
    className:
      "inline-flex items-center justify-center gap-1 rounded-[30px] bg-[rgba(245,225,164,0.4)] px-2.5 py-1 text-sm font-normal leading-5 text-[#B8910E]",
  },
  validated: {
    label: "Validated",
    className:
      "inline-flex items-center justify-center gap-1 rounded-[30px] bg-[#D7FFF3] px-2.5 py-1 text-sm font-normal leading-5 text-[#4D8F5F]",
  },
  pendingValidation: {
    label: "Pending Validation",
    className:
      "inline-flex items-center justify-center gap-1 rounded-[30px] bg-[#E8F2FF] px-2.5 py-1 text-sm font-normal leading-5 text-[#2E90FA]",
  },
  pendingSubmission: {
    label: "Pending Submission",
    className:
      "inline-flex items-center justify-center gap-1 rounded-[30px] bg-[#F2F4F7] px-2.5 py-1 text-sm font-normal leading-5 text-[#475467]",
  },
};

export default function OnboardingStatusBadge({
  status,
}: {
  status: OnboardingStatus;
}) {
  const c = config[status];
  return (
    <span className={c.className}>
      {status === "validated" ? (
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
      ) : (
        <Clock3 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
      )}
      {c.label}
    </span>
  );
}
