import { useDisableBodyScroll } from '@/hooks';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  confirmButtonColor?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = '확인',
  confirmButtonColor = 'bg-blue-600 hover:bg-blue-700',
}) => {
  useDisableBodyScroll(isOpen);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="flex fixed top-0 left-0 z-50 justify-center items-center w-full h-full bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl p-4 sm:p-6 w-[280px] sm:w-full sm:max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 whitespace-pre-line leading-relaxed">{message}</p>
        <div className="flex gap-2 sm:gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors cursor-pointer ${confirmButtonColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
