export interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  helpText?: string;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel';
  className?: string;
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
  className = ''
}: FormInputProps) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
          error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300'
        } ${
          disabled 
            ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
            : ''
        }`}
      />
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

 