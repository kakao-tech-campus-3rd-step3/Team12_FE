import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  text?: string;
  children?: ReactNode;
  className?: string;
  /**너비 100% 여부**/
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  /**주요 버튼 형태 구분**/
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  wrapperClassName?: string;
  noWrapper?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  onClick,
  text,
  children,
  className,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  variant = 'primary',
  size = 'md',
  wrapperClassName,
  noWrapper = false,
  type = 'button',
}: ButtonProps) => {
  const baseStyles =
    'font-medium rounded-md transition-colors text-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantStyles = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
    secondary: 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus-visible:ring-gray-500',
    outline:
      'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus-visible:ring-blue-500',
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
      type={type}
      onClick={onClick}
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
        <span className={`flex flex-shrink-0 justify-center items-center ${iconSizes[size]}`}>
          {icon}
        </span>
      )}
      <span className="flex-1 text-center">{children || text}</span>
      {icon && iconPosition === 'right' && (
        <span className={`flex flex-shrink-0 justify-center items-center ${iconSizes[size]}`}>
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
