import type { TimeOption } from '@/utils/timeUtils';

interface TimeSelectorProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  options: TimeOption[];
  className?: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  label,
  value,
  onChange,
  options,
  className = '',
}) => {
  return (
    <div className={`mb-4 sm:mb-6 ${className}`}>
      <label
        htmlFor={`time-selector-${label}`}
        className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-2 sm:px-3 py-2 sm:py-3 pr-8 sm:pr-10 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer transition-all duration-200"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400"
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

export default TimeSelector;
