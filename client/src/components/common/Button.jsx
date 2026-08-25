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
    "btn-premium font-semibold focus:outline-none focus:ring-2 focus:ring-moss-100";

  const sizes = {
    sm: "px-3.5 py-2.5 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const variants = {
    primary: "btn-premium-primary",

    secondary: "btn-premium-secondary",

    danger:
      "rounded-[1.25rem] border-2 border-white/30 bg-gradient-to-br from-red-400 to-red-500 text-white shadow-[6px_6px_14px_rgba(220,80,80,0.35)] hover:from-red-500 hover:to-red-600 focus:ring-red-200",
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
