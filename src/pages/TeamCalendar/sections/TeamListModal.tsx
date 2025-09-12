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
  const [currentView, setCurrentView] = useState<'list' | 'create'>('list');
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleClose = () => {
    setCurrentView('list');
    setCurrentPage(1);
    onClose();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus-visible:ring-blue-500"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="relative w-full h-full">
          {/* 슬라이드 기능 */}
          <div
            className="flex w-[200%] h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(${currentView === 'create' ? '-50%' : '0%'})` }}
          >
            <div className="w-1/2 p-6 overflow-y-auto">
              <div className="pt-8">
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
                      handleSubmit={() => {}}
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

            <div className="w-1/2 overflow-y-auto max-h-[95vh]">
              <CreateTeam onBack={() => setCurrentView('list')} onCreateTeam={handleCreateTeam} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamListModal;
