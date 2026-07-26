const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-moss-800"
      />
    </div>
  );
};

export default Input;
