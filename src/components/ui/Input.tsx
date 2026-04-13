import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      className = "",
      rightIcon,
      leftIcon,
      ...props
    },
    ref
  ) => {
    const borderIdle = label ? "border-neutral-grey3" : "border-[#e5e7eb]";
    const field = (
      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-black3">
            {leftIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={id}
          className={`h-12 w-full rounded-lg border bg-primary-sterling-white py-3 text-base font-normal leading-6 text-neutral-black1 outline-none transition placeholder:text-base placeholder:font-normal placeholder:leading-6 placeholder:text-neutral-grey1 focus:border-neutral-grey3 focus:ring-2 focus:ring-neutral-grey3/20 ${
            error ? "border-primary-sterling-red" : borderIdle
          } ${leftIcon ? "pl-10 pr-3" : "px-3"} ${rightIcon ? "pr-11" : ""} ${className}`}
          {...props}
        />
        {rightIcon ? (
          <span className="absolute inset-y-0 right-3 flex items-center text-[#343A40]">
            {rightIcon}
          </span>
        ) : null}
      </div>
    );

    if (!label) {
      return (
        <div className="flex flex-col gap-1.5">
          {field}
          {error ? <p className="text-xs text-[#DF3B3B]">{error}</p> : null}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={id}
          className="text-base font-medium leading-6 text-neutral-black1"
        >
          {label}
        </label>
        {field}
        {error ? <p className="text-xs text-[#DF3B3B]">{error}</p> : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
