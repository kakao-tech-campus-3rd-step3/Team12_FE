import { useState, useMemo } from 'react';
import { Users, Plus, UserPlus } from 'lucide-react';
import { mockTeams } from '@/mockdata/teamData';
import Button from '@/components/atoms/Button';
import TeamListCard from '@/pages/TeamCalendar/components/TeamListCard';
import CreateTeam from '@/pages/TeamCalendar/sections/CreateTeam';
import Pagination from '@/components/common/Pagination/Pagination';

interface TeamListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamListModal = ({ isOpen, onClose }: TeamListModalProps) => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'join'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [inviteCode, setInviteCode] = useState('');
  const itemsPerPage = 3;

  const paginationData = useMemo(() => {
    const totalItems = mockTeams.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = mockTeams.slice(startIndex, endIndex);

    return {
      currentItems,
      totalPages,
      totalItems,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems),
    };
  }, [currentPage]);

  if (!isOpen) return null;

  const handleCreateTeam = (teamData: { name: string; description: string }) => {
    console.log('팀 생성 완료', teamData);
    alert(`"${teamData.name}" 팀이 생성되었습니다!`);
    setCurrentView('list');
  };

  const handleJoinTeam = () => {
    if (!inviteCode.trim()) {
      alert('초대코드를 입력해주세요.');
      return;
    }
    console.log('팀 참여 시도:', inviteCode);
    alert(`초대코드 "${inviteCode}"로 팀 참여를 시도합니다.`);
    setInviteCode('');
    setCurrentView('list');
  };

  const handleClose = () => {
    setCurrentView('list');
    setCurrentPage(1);
    setInviteCode('');
    onClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getTransformValue = () => {
    switch (currentView) {
      case 'create':
        return '0%';
      case 'join':
        return '-66.66%';
      default:
        return '-33.33%';
    }
  };

  return (
    <div
      className="flex fixed top-0 left-0 z-50 justify-center items-center m-auto w-full h-full bg-gray-200/60"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-lg max-h-[95vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="relative w-full h-full">
          {/* 슬라이드 기능 */}
          <div
            className="flex w-[300%] h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${getTransformValue()})` }}
          >
            {/* 팀 생성 뷰 */}
            <div className="w-1/3 overflow-y-auto max-h-[95vh]">
              <CreateTeam onBack={() => setCurrentView('list')} onCreateTeam={handleCreateTeam} />
            </div>

            {/* 팀 목록 뷰 */}
            <div className="w-1/3 p-6 overflow-y-auto">
              <div className="pt-8 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900">팀 관리</h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      참여 중인 팀을 관리하고 새로운 팀을 만들거나 참여하세요.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      handleSubmit={() => setCurrentView('create')}
                      text="새 팀 만들기"
                      icon={<Plus />}
                      size="sm"
                      noWrapper={true}
                    />
                    <Button
                      handleSubmit={() => setCurrentView('join')}
                      text="팀 참여하기"
                      icon={<UserPlus />}
                      variant="outline"
                      size="sm"
                      noWrapper={true}
                    />
                  </div>
                </div>

                {/* 팀 목록 */}
                <div className="space-y-3 pb-4 min-h-[400px]">
                  {paginationData.currentItems.map((team) => (
                    <TeamListCard
                      key={team.code}
                      team={team}
                      onSettingsClick={() => {
                        // TODO: 팀 설정 탭 추후 구현
                      }}
                    />
                  ))}
                </div>

                {/* 페이지네이션 */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={handlePageChange}
                />

                {mockTeams.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 mb-4">참여 중인 팀이 없습니다</p>
                    <Button
                      handleSubmit={() => setCurrentView('create')}
                      text="첫 번째 팀 만들기"
                      size="sm"
                      noWrapper={true}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* 팀 참여하기 뷰 */}
            <div className="w-1/3 p-6 overflow-y-auto">
              <div className="pt-8 pb-0">
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => setCurrentView('list')}
                    className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    ←
                  </button>
                  <h2 className="text-xl font-semibold text-gray-900">팀 참여하기</h2>
                </div>

                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-full max-w-sm space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
                        <UserPlus className="w-8 h-8 text-blue-500" />
                      </div>
                      <p className="text-gray-600 text-sm">
                        팀 관리자로부터 받은 초대코드를 입력해주세요.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="inviteCode"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        초대코드
                      </label>
                      <input
                        id="inviteCode"
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        placeholder="초대코드를 입력하세요"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleJoinTeam();
                          }
                        }}
                      />
                    </div>

                    <div>
                      <Button
                        handleSubmit={handleJoinTeam}
                        text="가입하기"
                        size="md"
                        noWrapper={true}
                        className="w-full h-12 flex items-center justify-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamListModal;
