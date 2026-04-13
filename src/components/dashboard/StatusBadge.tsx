import { Calendar, Clock } from "lucide-react";

export type ApplicationStatus = "pending" | "interview" | "awaiting";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const config: Record<
  ApplicationStatus,
  {
    label: string;
    className: string;
    iconClassName: string;
    iconSizeClass?: string;
  }
> = {
  pending: {
    label: "Pending Admin Review",
    className:
      "inline-flex max-w-full flex-nowrap items-center justify-center gap-1 rounded-[22px] bg-extra-orange/10 px-2 py-1 text-center text-xs font-normal not-italic leading-snug text-extra-orange sm:gap-1.5 sm:rounded-[30px] sm:px-3 sm:py-1.5 sm:text-sm sm:leading-5 md:text-base md:leading-6",
    iconClassName: "text-extra-orange",
    iconSizeClass: "h-3.5 w-3.5 sm:h-4 sm:w-4",
  },
  interview: {
    label: "Interview Scheduled",
    className:
      "inline-flex max-w-full flex-nowrap items-center justify-center gap-1 rounded-[22px] bg-neutral-grey4 px-2 py-1 text-center text-xs font-normal not-italic leading-snug text-neutral-black3 sm:gap-1.5 sm:rounded-[30px] sm:px-3 sm:py-1.5 sm:text-sm sm:leading-5 md:text-base md:leading-6",
    iconClassName: "text-neutral-black3",
    iconSizeClass: "h-3.5 w-3.5 sm:h-4 sm:w-4",
  },
  awaiting: {
    label: "Awaiting Approval",
    className:
      "inline-flex max-w-full flex-nowrap items-center justify-center gap-1 rounded-[22px] border border-neutral-grey4 px-2 py-1 text-center text-xs font-normal not-italic leading-snug text-neutral-black3 sm:gap-1.5 sm:rounded-[30px] sm:px-3 sm:py-1.5 sm:text-sm sm:leading-5 md:text-base md:leading-6",
    iconClassName: "text-neutral-black3",
    iconSizeClass: "h-3.5 w-3.5 sm:h-4 sm:w-4",
  },
};

const defaultIconSize = "h-3.5 w-3.5";

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status];
  const Icon = status === "interview" ? Calendar : Clock;

  return (
    <span className={c.className}>
      <Icon
        className={`${c.iconSizeClass ?? defaultIconSize} shrink-0 ${c.iconClassName}`}
        strokeWidth={2}
      />
      {c.label}
    </span>
  );
}
