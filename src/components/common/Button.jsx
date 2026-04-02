function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary: "bg-[#377DFF] text-white hover:bg-[#2f6ad8]",
    secondary:
      "border border-[#dbe4f0] bg-white text-[#112032] hover:bg-[#f4f8ff]",
    ghost: "text-[#377DFF] hover:bg-[#eff5ff]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
