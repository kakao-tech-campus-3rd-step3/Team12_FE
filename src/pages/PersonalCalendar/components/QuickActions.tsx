import { Clock, Plus, Users } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="px-3 mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">빠른 작업</h3>
      <div className="space-y-3">
        <button className="flex items-center px-4 py-2 w-full text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700">
          <Plus className="mr-3 w-5 h-5" />새 일정 추가
        </button>
        <button className="flex items-center px-4 py-2 w-full text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors hover:bg-gray-50">
          <Users className="mr-3 w-5 h-5" />팀 생성하기
        </button>
        <button className="flex items-center px-4 py-2 w-full text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors hover:bg-gray-50">
          <Clock className="mr-3 w-5 h-5" />
          가능한 시간 찾기
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
