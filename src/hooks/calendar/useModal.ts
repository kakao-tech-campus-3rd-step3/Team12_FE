import { type ModalType } from '@/types/calendar';
import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('add');

  // 모달 열기
  const openModal = (type: ModalType = 'add') => {
    setModalType(type);
    setIsOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
  };

  // 모달 타입 변경
  const changeModalType = (type: ModalType) => {
    setModalType(type);
  };

  return {
    isOpen,
    modalType,
    openModal,
    closeModal,
    changeModalType,
    setIsOpen, // 기존 코드와의 호환성을 위해 유지
    setModalType, // 기존 코드와의 호환성을 위해 유지
  };
};

export default useModal;
