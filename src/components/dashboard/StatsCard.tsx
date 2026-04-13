import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string;
  subtext: string;
  iconWrapClassName: string;
} & (
  | { icon: LucideIcon; iconClassName: string; customIcon?: undefined }
  | { customIcon: ReactNode; icon?: undefined; iconClassName?: undefined }
);

export default function StatsCard(props: StatsCardProps) {
  const { title, value, subtext, iconWrapClassName } = props;

  let iconSlot: ReactNode;
  if ("customIcon" in props && props.customIcon != null) {
    iconSlot = props.customIcon;
  } else {
    const { icon: Icon, iconClassName } = props as Extract<
      StatsCardProps,
      { icon: LucideIcon; iconClassName: string }
    >;
    iconSlot = <Icon className={`h-5 w-5 ${iconClassName}`} strokeWidth={2} />;
  }

  return (
    <div className="flex flex-col rounded-[12px] border-[0.662px] border-solid border-black/10 bg-primary-sterling-white p-4 sm:p-5 md:p-[23.996px]">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
          <p className="text-xs font-normal not-italic leading-snug text-[#6A7282] sm:text-[14px] sm:leading-[20px]">
            {title}
          </p>
          <p className="text-xl font-bold not-italic leading-7 text-primary-sterling-black sm:text-2xl sm:leading-8 md:text-[24px] md:leading-[32px]">
            {value}
          </p>
          <p className="text-[11px] font-normal not-italic leading-4 text-[#6A7282] sm:text-[12px] sm:leading-[20px]">
            {subtext}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md sm:h-11 sm:w-11 ${iconWrapClassName}`}
        >
          {iconSlot}
        </div>
      </div>
    </div>
  );
}
