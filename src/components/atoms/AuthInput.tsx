import type { LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  error?: string;
  className?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ icon: Icon, type = 'text', placeholder, error, className = '', ...props }, ref) => {
    return (
      <div className={className}>
        <div
          className={`flex items-center px-3 py-3 rounded-lg border transition hover:border-blue-500 focus-within:border-blue-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <Icon className="mr-2 w-5 h-5 text-gray-400" />
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none"
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
      </div>
    );
  },
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
