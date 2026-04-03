import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, className = "", ...props },
  ref
) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1.5 block text-xs font-medium text-[#112032] sm:mb-2 sm:text-sm">
          {label}
        </span>
      ) : null}
      <input
        ref={ref}
        className={`h-10 w-full rounded-lg border border-[#d9e2ef] bg-white px-3 text-xs text-[#112032] ring-[#377DFF]/20 outline-none focus:border-[#377DFF] focus:ring-4 sm:h-11 sm:text-sm ${className}`}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-[10px] text-red-500 sm:text-xs">
          {error}
        </span>
      ) : null}
    </label>
  );
});

export default Input;
