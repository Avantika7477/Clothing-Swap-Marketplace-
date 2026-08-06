const TextInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error = "",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-ink/70">
        {label}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`field-input ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : ""
        }`}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
