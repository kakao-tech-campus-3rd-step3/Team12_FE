import { useState, useMemo } from 'react';
import { Users, Plus, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockTeams } from '@/mockdata/teamData';
import Button from '@/components/atoms/Button';
import TeamListCard from '@/pages/TeamCalendar/components/TeamListCard';
import CreateTeam from '@/pages/TeamCalendar/sections/CreateTeam';

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

  const handlePrevPage = () => {
    if (paginationData.hasPrevPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (paginationData.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    const totalPages = paginationData.totalPages;
    const current = currentPage;

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 1;
    const rangeWithDots = [];

    const left = Math.max(2, current - delta);
    const right = Math.min(totalPages - 1, current + delta);

    rangeWithDots.push(1);

    if (left > 2) {
      rangeWithDots.push('...');
    }

    for (let i = left; i <= right; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    if (right < totalPages - 1) {
      rangeWithDots.push('...');
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
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
                <div className="space-y-3 min-h-[400px]">
                  {paginationData.currentItems.map((team) => (
                    <TeamListCard
                      key={team.code}
                      team={team}
                      onSettingsClick={(teamCode) => {
                        console.log('팀 설정 클릭:', teamCode);
                        // TODO: 팀 설정 탭 추후 구현
                        alert(`${teamCode} 팀 설정 기능은 준비 중입니다.`);
                      }}
                    />
                  ))}
                </div>

                {/* 페이지네이션 */}
                {paginationData.totalPages > 1 && (
                  <div className="flex items-center justify-center pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handlePrevPage}
                        disabled={!paginationData.hasPrevPage}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-colors duration-200 ${
                          paginationData.hasPrevPage
                            ? 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {getVisiblePages().map((page, index) => (
                        <div key={`${page}-${index}`}>
                          {page === '...' ? (
                            <span className="flex items-center justify-center w-8 h-8 text-gray-400 text-sm">
                              ...
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePageChange(Number(page))}
                              className={`flex items-center justify-center w-8 h-8 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                                currentPage === page
                                  ? 'border-blue-500 bg-blue-500 text-white'
                                  : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                              }`}
                            >
                              {page}
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={handleNextPage}
                        disabled={!paginationData.hasNextPage}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-colors duration-200 ${
                          paginationData.hasNextPage
                            ? 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

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

            <div className="w-1/2 p-6 overflow-y-auto max-h-[95vh]">
              <div className="pt-10 pb-10 h-full">
                <CreateTeam onBack={() => setCurrentView('list')} onCreateTeam={handleCreateTeam} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamListModal;
