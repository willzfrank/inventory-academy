import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  /** Label and control on one row (e.g. filters). */
  inlineLabel?: boolean;
  /** Override default label styles (e.g. modal forms). */
  labelClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { id, label, inlineLabel, labelClassName, className = "", children, ...props },
    ref
  ) => {
    const labelClass =
      labelClassName ??
      (inlineLabel
        ? "text-xs font-medium leading-5 text-[#374151] whitespace-nowrap sm:text-sm"
        : "text-sm font-medium leading-5 text-[#374151] whitespace-nowrap");

    return (
      <div
        className={
          inlineLabel
            ? "flex flex-row items-center gap-2"
            : "flex flex-col gap-1"
        }
      >
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <div
          className={
            inlineLabel ? "relative min-w-0 w-full flex-1 sm:w-36 sm:flex-initial" : "relative"
          }
        >
          <select
            ref={ref}
            id={id}
            className={`h-10 w-full cursor-pointer appearance-none rounded-lg border border-[#e5e7eb] bg-white py-2 pl-3 pr-9 text-sm font-normal text-[#111827] outline-none transition focus:border-[#c4c4c4] focus:ring-2 focus:ring-[#c4c4c4]/20 ${className}`}
            {...props}
          >
            {children}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[#6b7280]">
            <ChevronDown className="h-4 w-4" strokeWidth={2} aria-hidden />
          </span>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
