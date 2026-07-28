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
    "btn-premium font-medium focus:outline-none focus:ring-2 focus:ring-moss-100";

  const sizes = {
    sm: "px-3.5 py-2.5 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  const variants = {
    primary: "btn-premium-primary",

    secondary: "btn-premium-secondary",

    danger:
      "bg-red-500 text-white border border-red-500 shadow-sm hover:bg-red-600 focus:ring-red-200 rounded-2xl",
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
