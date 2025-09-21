import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="flex fixed top-0 left-0 z-50 justify-center items-center m-auto w-full h-full bg-gray-200/60"
      onClick={onClose}
    >
      <div
        className="relative fit-content min-w-md  bg-white rounded-lg max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-5 text-2xl text-gray-500 hover:text-gray-700"
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
