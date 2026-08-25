const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
}) => {
  const baseStyle =
    "btn-premium font-bold focus:outline-none focus:ring-2 focus:ring-moss-100";

  const sizes = {
    sm: "min-h-10 px-4 py-2.5 text-sm",
    md: "min-h-12 px-6 py-3 text-base",
    lg: "min-h-[3.25rem] px-7 py-3.5 text-base",
  };

  const variants = {
    primary: "btn-premium-primary",
    secondary: "btn-premium-secondary",
    danger:
      "rounded-2xl border border-red-600/20 bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyle}
        ${sizes[size]}
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "cursor-not-allowed opacity-50 hover:translate-y-0" : ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
