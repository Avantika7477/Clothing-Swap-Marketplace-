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
    "rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2";

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-lg",
  };

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-300",

    secondary:
      "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white focus:ring-green-300",

    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
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
        ${disabled ? "opacity-50 cursor-not-allowed hover:bg-inherit" : ""}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
