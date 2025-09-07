import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  handleSubmit: () => void;
  text: string;
  className?: string;
}

const Button = ({ handleSubmit, text, className }: ButtonProps) => {
  return (
    <div className="p-6 mx-auto w-50">
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
