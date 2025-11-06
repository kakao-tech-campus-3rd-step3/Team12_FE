import Button from '@/components/atoms/Button';
import { RouterPath } from '@/routes/path';
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const LinkStatus = () => {
  const navigate = useNavigate();
  const [linkStatus, setLinkStatus] = useState(false);

  //임시 세팅
  useEffect(() => {
    const isLinked = localStorage.getItem('timetableLinked') === 'true';
    setLinkStatus(isLinked);
  }, []);

  const handleLinkStatus = () => {
    navigate(RouterPath.TIMETABLE);
  };

  return (
    <>
      <div className="overflow-hidden p-4 bg-white rounded-xl">
        <div className="flex gap-2 items-center mb-2">
          <Link className="w-4 h-4 text-mainBlue" />
          <h3 className="text-lg font-semibold text-gray-800">연동 상태</h3>
        </div>
        <div className="flex flex-row gap-2 justify-between items-center bg-white">
          <span className="text-sm font-medium text-gray-800 text-nowrap">에브리타임 연동</span>
          <div>
            {linkStatus ? (
              <Button
                onClick={handleLinkStatus}
                variant="outline"
                size="sm"
                noWrapper={true}
                className="border-none bg-blue-600 text-white hover:bg-blue-700"
              >
                시간표 수정
              </Button>
            ) : (
              <Button
                onClick={handleLinkStatus}
                variant="outline"
                size="sm"
                noWrapper={true}
                className="border-mainBlue text-[#1C398E] hover:bg-mainBlue/50 hover:text-white cursor-pointer"
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
