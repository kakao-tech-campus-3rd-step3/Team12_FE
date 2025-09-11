import { twMerge } from 'tailwind-merge';
import type { ReactNode } from 'react';

interface ButtonProps {
  handleSubmit: () => void;
  text: string;
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  wrapperClassName?: string;
  noWrapper?: boolean;
}

const Button = ({
  handleSubmit,
  text,
  className,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  wrapperClassName,
  noWrapper = false,
}: ButtonProps) => {
  const baseStyles =
    'font-medium rounded-md transition-colors text-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const buttonContent = (
    <button
      onClick={handleSubmit}
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && !noWrapper ? 'w-full' : '',
        icon ? 'flex items-center gap-2' : '',
        className,
      )}
    >
      {icon && iconPosition === 'left' && (
        <span className={`${iconSizes[size]} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </span>
      )}
      <span className="flex items-center">{text}</span>
      {icon && iconPosition === 'right' && (
        <span className={`${iconSizes[size]} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </span>
      )}
    </button>
  );

  if (noWrapper) {
    return buttonContent;
  }

  return (
    <div className={twMerge(fullWidth ? 'w-full' : 'p-6 mx-auto w-50', wrapperClassName)}>
      {buttonContent}
    </div>
  );
};

export default Button;
