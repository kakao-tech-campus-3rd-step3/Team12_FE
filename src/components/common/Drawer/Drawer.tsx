import { Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface DrawerProps {
  children: ReactNode;
  className?: string;
}

const Drawer = ({ children, className = '' }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 모바일에서 햄버거 메뉴 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-gray-200 shadow-md md:hidden"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <div
        className={`
          fixed md:relative top-0 left-0 z-50 md:z-auto
          h-full bg-white border-r border-gray-200 shadow-sm w-70
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${className}
        `}
      >
        {/* 모바일에서 닫기 버튼 */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-600 md:hidden hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto p-6 pt-16 h-full md:pt-6">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
