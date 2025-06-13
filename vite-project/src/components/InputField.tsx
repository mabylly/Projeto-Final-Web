interface InputFieldProps {
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ label, placeholder, icon, value, onChange }: InputFieldProps) {
  return (
    <div className="mb-6">
      <label className="block font-semibold text-gray-800 mb-2">
        {icon && <span className="inline-block mr-2 align-middle">{icon}</span>}
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-yellow-400 rounded-md px-4 py-2 bg-white
                   focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );
}
