import type { ReactNode } from "react";

/** Light grey list row used across Client References, Training Topics, engagements, etc. */
export default function ProfileListItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-[#F1F5F9] px-4 py-3 text-sm leading-6 text-[#374151] ${className}`}
    >
      {children}
    </div>
  );
}
