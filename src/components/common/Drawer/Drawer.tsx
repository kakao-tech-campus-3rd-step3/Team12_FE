import { Sidebar } from 'flowbite-react';
import { Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface DrawerProps {
  children: ReactNode;
  className?: string;
}

const Drawer = ({ children, className = '' }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Flowbite-React Sidebar 테마 커스터마이징
  const customTheme = {
    root: {
      inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 dark:bg-white',
    },
  };

  return (
    <>
      {/* 모바일에서 햄버거 메뉴 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg border border-gray-200 shadow-md lg:hidden"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Flowbite-React Sidebar */}
      <Sidebar
        aria-label="Sidebar"
        theme={customTheme}
        className={`
          fixed lg:relative top-0 left-0 z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${className}
        `}
      >
        {/* 모바일에서 닫기 버튼 */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 text-gray-600 lg:hidden hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 사이드바 내용 */}
        <div className="pt-16 lg:pt-0">{children}</div>
      </Sidebar>
    </>
  );
};

export default Drawer;
