import type { SelectOption } from '@/utils/timeUtils';

interface SelectBoxProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: SelectOption[];
  className?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  value,
  onChange,
  options,
  className = '',
}) => {
  return (
    <div className={`mb-4 sm:mb-6 ${className}`}>
      <label
        htmlFor={`select-box-${label}`}
        className="block mb-2 text-sm font-medium text-gray-700 sm:text-sm"
      >
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="px-2 py-2 pr-8 w-full bg-white rounded-lg border border-gray-200 transition-all duration-200 appearance-none cursor-pointer sm:px-3 sm:py-3 sm:pr-10 text-md sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none sm:pr-3">
          <svg
            className="w-3 h-3 text-gray-400 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
