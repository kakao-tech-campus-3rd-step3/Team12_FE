import Button from '@/components/atoms/Button';
import { RouterPath } from '@/routes/path';
import { Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import { authAPI } from '@/apis/services/auth';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';

const LinkStatus = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [linkStatus, setLinkStatus] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);

  useEffect(() => {
    const isLinked = localStorage.getItem('timetableLinked') === 'true';
    setLinkStatus(isLinked);

    const googleLinked = localStorage.getItem('googleCalendarLinked') === 'true';
    setIsGoogleLinked(googleLinked);
  }, []);

  useEffect(() => {
    const googleSync = searchParams.get('google_sync');

    if (googleSync === 'success') {
      setIsGoogleLinked(true);
      localStorage.setItem('googleCalendarLinked', 'true');
      toast.success('구글 캘린더 연동이 완료되었습니다.');

      searchParams.delete('google_sync');
      setSearchParams(searchParams, { replace: true });
    } else if (googleSync === 'error') {
      toast.error('구글 캘린더 연동에 실패했습니다.');

      searchParams.delete('google_sync');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleLinkStatus = () => {
    navigate(RouterPath.TIMETABLE);
  };

  const handleGoogleCalendarSync = async () => {
    setIsSyncing(true);
    try {
      const result = await authAPI.syncGoogleCalendar();

      if (result.alreadyLinked) {
        setIsGoogleLinked(true);
        localStorage.setItem('googleCalendarLinked', 'true');
        toast.success(result.message);
      } else if (result.redirecting) {
        toast.info(result.message);
      }
    } catch (error) {
      console.error('구글 캘린더 동기화 실패:', error);
      toast.error(error instanceof Error ? error.message : '동기화에 실패했습니다.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <div className="overflow-hidden p-4 bg-white rounded-xl">
        <div className="flex gap-2 items-center mb-2">
          <Link className="w-4 h-4 text-mainBlue" />
          <h3 className="text-lg font-semibold text-gray-800">연동 상태</h3>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 justify-between items-center bg-white">
            <span className="text-sm font-medium text-gray-800 text-nowrap">에브리타임 연동</span>
            <div>
              {linkStatus ? (
                <Button
                  onClick={handleLinkStatus}
                  variant="outline"
                  size="sm"
                  noWrapper={true}
                  className="border-none bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
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

          <div className="flex flex-row gap-2 justify-between items-center bg-white">
            <span className="text-sm font-medium text-gray-800 text-nowrap">
              구글 캘린더 동기화
            </span>
            <div>
              {isGoogleLinked ? (
                <Button
                  variant="outline"
                  size="sm"
                  noWrapper={true}
                  disabled={true}
                  className="border-none bg-blue-600 text-white cursor-default"
                >
                  연동완료
                </Button>
              ) : (
                <Button
                  onClick={handleGoogleCalendarSync}
                  variant="outline"
                  size="sm"
                  noWrapper={true}
                  disabled={isSyncing}
                  className="border-none bg-blue-600 text-white hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSyncing ? '동기화 중...' : '동기화하기'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LinkStatus;
