import { useDisableBodyScroll } from '@/hooks';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useDisableBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="flex fixed top-0 left-0 z-50 justify-center items-center m-auto w-full h-full bg-gray-200/60"
      onClick={onClose}
    >
      <div
        className="relative fit-content min-w-[90%] sm:min-w-md  bg-white rounded-lg max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="flex absolute top-3 right-3 justify-center items-center w-8 h-8 text-2xl text-gray-500 rounded-full transition-colors cursor-pointer hover:text-red-500 hover:bg-red-50"
          aria-label="Close modal"
        >
          &times;
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
