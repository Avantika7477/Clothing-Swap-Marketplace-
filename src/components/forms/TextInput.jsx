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
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
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
        className={`w-full rounded-lg border px-4 py-3 outline-none transition
        ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-300"
            : "border-gray-300 focus:ring-2 focus:ring-green-500"
        }`}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextInput;
