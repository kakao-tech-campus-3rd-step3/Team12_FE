import { useState } from 'react';

const TeamSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-full">
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden
          ${isSidebarOpen ? 'w-80' : 'w-0'}`}
      >
        <div className="h-full overflow-y-auto p-6">
          <h2 className="text-lg font-semibold text-gray-800">사이드바</h2>
          <p className="mt-4 text-gray-600">사이드바 내용</p>
        </div>
      </div>
    </div>
  );
};

export default TeamSidebar;
