import Button from '@/components/atoms/Button';
import { Clock, Plus, Users } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="px-3 mb-8">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">빠른 작업</h3>
      <div className="space-y-3">
        <Button
          variant="primary"
          size="md"
          noWrapper={true}
          fullWidth={true}
          icon={<Plus className="w-5 h-5" />}
          iconPosition="left"
          className="w-[100%]"
        >
          새 일정 추가
        </Button>
        <Button
          variant="outline"
          size="md"
          noWrapper={true}
          fullWidth={true}
          icon={<Users className="w-5 h-5" />}
          iconPosition="left"
          className="w-[100%]"
        >
          팀 생성하기
        </Button>
        <Button
          variant="outline"
          size="md"
          noWrapper={true}
          fullWidth={true}
          icon={<Clock className="w-5 h-5" />}
          iconPosition="left"
          className="w-[100%]"
        >
          가능한 시간 찾기
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
