import DecisionBadge from "@/components/vendor-applications/DecisionBadge";
import type { VendorApplicationDecision } from "@/data/vendorApplicationsList";

export default function VendorDecisionStatusBar({
  decision = "keepInPool",
}: {
  decision?: VendorApplicationDecision;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border-[0.66px] border-solid border-black/10 bg-[#F0F1F5] px-4 py-3 sm:gap-3">
      <span className="text-center text-base font-normal leading-6 text-neutral-black1">
        Decision Made:
      </span>
      <DecisionBadge decision={decision} />
    </div>
  );
}
