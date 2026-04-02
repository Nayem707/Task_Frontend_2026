function Spinner({ className = "h-5 w-5", label = "Loading" }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-sm text-[#666]"
      role="status"
      aria-live="polite"
    >
      <span
        className={`${className} animate-spin rounded-full border-2 border-[#d0def8] border-t-[#377DFF]`}
      />
      {label}
    </div>
  );
}

export default Spinner;
