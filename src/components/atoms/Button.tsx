import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  handleSubmit: () => void;
  text: string;
  className?: string;
  fullWidth?: boolean;
}

const Button = ({ handleSubmit, text, className, fullWidth = false }: ButtonProps) => {
  return (
    <div className={fullWidth ? 'w-full' : 'p-6 mx-auto w-50'}>
      <button
        onClick={handleSubmit}
        className={twMerge(
          'px-4 py-3 w-full font-medium text-white bg-blue-600 rounded-md transition-colors text-nowrap hover:bg-blue-700',
          className,
        )}
      >
        {text}
      </button>
    </div>
  );
};
export default Button;
