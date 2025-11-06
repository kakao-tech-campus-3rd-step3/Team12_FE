import { Plus, UserPlus, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
//import { mockTeams } from '@/mockdata/teamData';
import type { ApiError } from '@/apis/types/error';
import { teamAPI } from '@/apis';
import Button from '@/components/atoms/Button';
import Pagination from '@/components/molecules/Pagination';
import { queryKeys } from '@/lib/queryKeys';
import CreateTeam from '@/pages/PersonalCalendar/components/CreateTeam';
import JoinTeam from '@/pages/PersonalCalendar/components/JoinTeam';
import TeamListCard from '@/pages/PersonalCalendar/components/TeamListCard';
import { useTeamStore } from '@/store/team';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface TeamListModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveTeam: (teamId: number) => void;
  deleteTeam: (teamId: number) => void;
}

const TeamListModal = ({ isOpen, onClose, leaveTeam, deleteTeam }: TeamListModalProps) => {
  const [currentView, setCurrentView] = useState<'list' | 'create' | 'join'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { teams } = useTeamStore();
  const queryClient = useQueryClient();
  const paginationData = useMemo(() => {
    const totalItems = teams.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = teams.slice(startIndex, endIndex);

    return {
      currentItems,
      totalPages,
      totalItems,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems),
    };
  }, [currentPage, teams]);

  if (!isOpen) return null;

  const handleCreateTeam = async (teamData: { name: string; description: string }) => {
    try {
      await teamAPI.createTeam({
        team_name: teamData.name,
        team_description: teamData.description,
      });

      // React Query 캐시를 무효화하여 최신 데이터를 가져옴
      await queryClient.invalidateQueries({ queryKey: queryKeys.teams });

      toast.success(`"${teamData.name}" 팀이 생성되었습니다!`);
      setCurrentView('list');
    } catch {}
  };

  const handleJoinTeam = async (inviteCode: string) => {
    try {
      await teamAPI.joinTeam({
        invite_code: inviteCode,
      });

      // React Query 캐시를 무효화하여 최신 데이터를 가져옴
      await queryClient.invalidateQueries({ queryKey: queryKeys.teams });

      toast.success('팀 가입 성공');
      setCurrentView('list');
    } catch (error) {
      if (error instanceof Error) {
        const apiError = error as ApiError;
        const errorMessage =
          apiError.response?.data?.message || apiError.message || '팀 가입에 실패했습니다.';
        toast.error(errorMessage);
      } else {
        toast.error('팀 가입에 실패했습니다.');
      }
    }
  };

  const handleClose = () => {
    setCurrentView('list');
    setCurrentPage(1);
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
          className="flex items-center justify-center w-8 h-8 rounded-full absolute top-3 right-3 z-10 text-2xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors focus:outline-none cursor-pointer"
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
            <div className="overflow-y-auto p-6 w-1/3">
              <div className="pt-8 pb-0">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-900">팀 관리</h2>
                    <p className="text-sm leading-relaxed text-gray-600">
                      참여 중인 팀을 관리하고 새로운 팀을 만들거나 참여하세요.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setCurrentView('create')}
                      text="새 팀 만들기"
                      icon={<Plus />}
                      size="sm"
                      noWrapper={true}
                      className="cursor-pointer"
                    />
                    <Button
                      onClick={() => setCurrentView('join')}
                      text="팀 참여하기"
                      icon={<UserPlus />}
                      variant="outline"
                      size="sm"
                      noWrapper={true}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                {/* 팀 목록 */}
                {teams.length === 0 ? (
                  <div className="py-40 text-center">
                    <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="mb-4 text-gray-500">참여 중인 팀이 없습니다</p>
                    <Button
                      onClick={() => setCurrentView('create')}
                      text="첫 번째 팀 만들기"
                      size="sm"
                      noWrapper={true}
                    />
                  </div>
                ) : (
                  <>
                    <div className="pb-4 space-y-3">
                      {paginationData.currentItems.map((team) => (
                        <TeamListCard
                          key={team.id}
                          team={team}
                          leaveTeam={leaveTeam}
                          deleteTeam={deleteTeam}
                        />
                      ))}
                    </div>

                    {/* 페이지네이션 */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={paginationData.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </div>
            </div>

            {/* 팀 참여하기 뷰 */}
            <div className="w-1/3 overflow-y-auto max-h-[95vh]">
              <JoinTeam onBack={() => setCurrentView('list')} onJoinTeam={handleJoinTeam} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamListModal;
