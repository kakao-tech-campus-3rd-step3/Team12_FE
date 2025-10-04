import Button from '@/components/atoms/Button';
import TimeTableModal from '@/pages/Calendar/components/TimetableModal';
import { Link } from 'lucide-react';
import { useState } from 'react';

const LinkStatus = () => {
  const [linkStatus, setLinkStatus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkStatus = () => {
    if (linkStatus) {
      return;
    }
    // TODO: 실제 연동 로직 추가
    setIsOpen(true);
    setLinkStatus(true);
  };

  return (
    <>
      <TimeTableModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="overflow-hidden p-6 bg-white rounded-xl border shadow-lg border-mainBlue/70">
        <div className="flex gap-2 items-center mb-2">
          <Link className="w-4 h-4 text-mainBlue" />
          <h3 className="text-lg font-semibold text-mainBlue">연동 상태</h3>
        </div>
        <div className="flex flex-row gap-2 justify-between items-center bg-white">
          <span className="text-sm text-nowrap font-medium text-[#1C398E]">에브리타임 연동</span>
          <div>
            {linkStatus ? (
              <p className="text-sm font-medium px-2 py-1 text-[#1C398E]">연동완료</p>
            ) : (
              <Button
                onClick={handleLinkStatus}
                variant="outline"
                size="sm"
                noWrapper={true}
                className="border-mainBlue text-[#1C398E] hover:bg-mainBlue/50 hover:text-white"
              >
                연동하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default LinkStatus;
