interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectField({ label, options, value, onChange }: SelectFieldProps) {
  return (
    <div className="mb-6">
      <label className="block font-semibold text-gray-800 mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-yellow-400 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        <option value="" disabled>Selecione uma série</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
