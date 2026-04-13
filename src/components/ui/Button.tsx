import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "danger";
  size?: "md" | "sm";
}

export default function Button({
  children,
  className = "",
  disabled,
  isLoading = false,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "danger"
      ? "bg-[#DB353A] text-primary-sterling-white hover:bg-[#c73035] focus-visible:ring-[#e7a1a4]"
      : "bg-primary-sterling-red text-primary-sterling-white hover:bg-[#c73035] focus-visible:ring-[#e7a1a4]";

  const sizeClass =
    size === "sm"
      ? "h-10 rounded-lg px-4 py-2 text-sm leading-5"
      : "h-12 rounded-[30px] px-4 py-3 text-base leading-6";

  return (
    <button
      className={`flex w-full max-w-[400px] items-center justify-center gap-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-neutral-grey3 disabled:opacity-40 ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
