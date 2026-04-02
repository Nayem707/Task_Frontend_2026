import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, className = "", ...props },
  ref,
) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-2 block text-sm font-medium text-[#112032]">
          {label}
        </span>
      ) : null}
      <input
        ref={ref}
        className={`h-11 w-full rounded-lg border border-[#d9e2ef] bg-white px-3 text-sm text-[#112032] outline-none ring-[#377DFF]/20 focus:border-[#377DFF] focus:ring-4 ${className}`}
        {...props}
      />
      {error ? (
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      ) : null}
    </label>
  );
});

export default Input;
