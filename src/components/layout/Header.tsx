import { ChevronDown, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  vendorId?: string;
  backHref?: string;
  /** Larger title + subtitle treatment for primary listing pages. */
  variant?: "default" | "hero";
}

export default function Header({
  title = "Dashboard",
  subtitle = "Welcome! Here's an overview of your vendor management activities",
  vendorId,
  backHref,
  variant = "default",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-[#E0E0E0] bg-[#fff] py-5 pl-14 pr-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-6 sm:py-6 sm:pl-6 lg:px-8">
      <div className="min-w-0 flex flex-1 items-start gap-2">
        {backHref ? (
          <Link
            to={backHref}
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#6B7280] hover:bg-[#F3F4F6]"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : null}
        <div className="min-w-0">
          <h1
            className={
              variant === "hero"
                ? "text-xl font-bold not-italic leading-[30px] text-[#101828] sm:text-2xl sm:leading-8"
                : "text-base font-bold not-italic leading-[normal] text-primary-sterling-black"
            }
          >
            {title}
          </h1>
          <p
            className={
              variant === "hero"
                ? "mt-1 text-sm font-normal not-italic leading-5 text-[#667085] sm:text-base sm:leading-6"
                : "mt-1 text-[13px] font-normal not-italic leading-snug text-[#B0B0B0] sm:text-[14px] sm:leading-[normal]"
            }
          >
            {vendorId ?? subtitle}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="flex w-full shrink-0 items-center gap-2 rounded-lg py-1 text-left transition hover:bg-[#f3f4f6]/80 sm:w-auto sm:gap-3"
        aria-expanded="false"
        aria-haspopup="menu"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e7eb] text-[14px] font-bold not-italic leading-[20px] text-primary-sterling-black">
          OO
        </span>
        <span className="min-w-0 flex-1 sm:flex-none">
          <span className="block truncate text-[13px] font-bold not-italic leading-5 text-neutral-black1 sm:text-[14px] sm:leading-[20px]">
            Olamide Owoeye
          </span>
          <span className="block text-[13px] font-normal not-italic leading-5 text-neutral-black4 sm:text-[14px] sm:leading-[20px]">
            Admin
          </span>
        </span>
        <ChevronDown
          className="ml-auto h-4 w-4 shrink-0 text-[#6b7280] sm:ml-0"
          strokeWidth={2}
          aria-hidden
        />
      </button>
    </header>
  );
}
