import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { VendorApplicationDecision } from "@/data/vendorApplicationsList";

const config: Record<
  VendorApplicationDecision,
  {
    label: string;
    className: string;
    Icon: typeof Clock;
  }
> = {
  keepInPool: {
    label: "Keep In Pool",
    className:
      "inline-flex items-center justify-center gap-1 rounded-[30px] bg-[rgba(245,225,164,0.4)] px-2.5 py-1 text-center text-sm font-normal leading-5 text-[#B8910E]",
    Icon: Clock,
  },
  approved: {
    label: "Approved",
    className:
      "inline-flex items-center justify-center gap-1 rounded-[30px] bg-[#D7FFF3] px-2.5 py-1 text-center text-sm font-normal leading-5 text-[#4D8F5F]",
    Icon: CheckCircle2,
  },
  declined: {
    label: "Declined",
    className:
      "inline-flex items-center justify-center gap-1 rounded-[30px] bg-[rgba(217,33,40,0.15)] px-2.5 py-1 text-center text-sm font-normal leading-5 text-primary-sterling-red",
    Icon: XCircle,
  },
};

export default function DecisionBadge({
  decision,
}: {
  decision: VendorApplicationDecision;
}) {
  const c = config[decision];
  const Icon = c.Icon;
  return (
    <span className={c.className}>
      <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
      {c.label}
    </span>
  );
}
