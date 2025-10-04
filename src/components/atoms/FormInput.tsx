import { ChevronDown } from 'lucide-react';

export interface FormInputProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  helpText?: string;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'checkbox' | 'select' | 'time' | 'input';
  className?: string;
  options?: { label: string; value: string }[];
}

export const FormInput = ({
  id,
  label,
  value,
  onChange,
  placeholder = '',
  maxLength,
  required = false,
  helpText,
  error,
  disabled = false,
  type = 'text',
  className = '',
  options,
}: FormInputProps) => {
  // 체크박스인 경우 별도 렌더링
  if (type === 'checkbox') {
    const isChecked = value === 'true';

    return (
      <div className={className}>
        <div className="flex items-center space-x-3">
          <div className="flex-col">
            <input
              type="checkbox"
              id={id}
              checked={isChecked}
              onChange={(e) => onChange(e.target.checked.toString())}
              disabled={disabled}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border-2 rounded transition-all duration-200 cursor-pointer flex items-center justify-center ${
                isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-300 hover:border-gray-400'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'} ${
                error ? 'border-red-300' : ''
              }`}
              onClick={() => !disabled && onChange((!isChecked).toString())}
            >
              {isChecked && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <label
            htmlFor={id}
            className={`text-sm font-medium cursor-pointer ${
              disabled ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        </div>
        {(error || helpText) && (
          <div className="mt-1">
            {error ? (
              <p className="text-xs text-red-500">{error}</p>
            ) : helpText ? (
              <p className="text-xs text-gray-500">{helpText}</p>
            ) : null}
          </div>
        )}
      </div>
    );
  }

  // 일반 입력 필드
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-700 text-nowrap">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'select' ? (
        <div className="relative">
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full px-4 py-2 pr-10 border rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white ${
              error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            } ${disabled ? 'text-gray-500 bg-gray-50 cursor-not-allowed' : 'cursor-pointer'}`}
            style={{ 
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              zIndex: 10
            }}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/** 아래 방향 화살표 */}
          <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      ) : type === 'time' ? (
        <div className="relative">
          <input
            type="time"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={maxLength}
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
            } ${disabled ? 'text-gray-500 bg-gray-50 cursor-not-allowed' : ''} ${
              !value ? 'text-gray-400' : ''
            }`}
          />
          {!value && (
            <div className="absolute inset-0 flex items-center px-4 pointer-events-none">
              <span className="text-gray-400">{placeholder}</span>
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
            error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
          } ${disabled ? 'text-gray-500 bg-gray-50 cursor-not-allowed' : ''}`}
        />
      )}
      <div className="flex justify-between items-center mt-1">
        <div>
          {error ? (
            <p className="text-xs text-red-500">{error}</p>
          ) : helpText ? (
            <p className="text-xs text-gray-500">{helpText}</p>
          ) : null}
        </div>
        {maxLength && (
          <span className="text-xs text-gray-400">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
