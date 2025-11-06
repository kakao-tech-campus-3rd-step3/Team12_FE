import type { TeamData } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import ConfirmModal from '@/components/atoms/ConfirmModal';
import { Copy, LogOut, Settings, Trash, Users } from 'lucide-react';

import { RouterPath } from '@/routes/path';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTeamMembers } from '@/hooks/team/useTeamMembers';
import { useAuthStore } from '@/store/useAuthStore';

interface TeamListCardProps {
  team: TeamData;
  leaveTeam: (teamId: number) => void;
  deleteTeam: (teamId: number) => void;
}

const MAX_VISIBLE_AVATARS = 4;
const MAX_VISIBLE_MEMBER_NAMES = 2;

const TeamListCard = ({ team, leaveTeam, deleteTeam }: TeamListCardProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNotLeaderModalOpen, setIsNotLeaderModalOpen] = useState(false);
  const [isLeaderCannotLeaveModalOpen, setIsLeaderCannotLeaveModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { data: teamMembersData } = useTeamMembers({ teamId: team.id });

  const handleSettingsClick = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const checkTeamId = (team: TeamData) => {
    if (!team.id || team.id === undefined) {
      toast.error('팀 정보가 올바르지 않습니다.');
      return false;
    }
    return true;
  };

  const handleLeaveTeamClick = () => {
    if (!checkTeamId(team)) {
      return;
    }
    setIsActionsOpen(false);

    // 현재 사용자가 리더인지 확인
    const members = teamMembersData?.content || [];
    const currentUserMember = members.find((member) => member.name === user?.name);
    const isLeader = currentUserMember?.role === 'LEADER';

    if (isLeader) {
      setIsLeaderCannotLeaveModalOpen(true);
      return;
    }

    setIsLeaveModalOpen(true);
  };

  const handleLeaveTeamConfirm = () => {
    if (!checkTeamId(team)) {
      return;
    }
    leaveTeam(team.id);
    setIsLeaveModalOpen(false);
  };

  const handleDeleteTeamClick = () => {
    if (!checkTeamId(team)) {
      return;
    }
    setIsActionsOpen(false);

    const members = teamMembersData?.content || [];
    const currentUserMember = members.find((member) => member.name === user?.name);
    const isLeader = currentUserMember?.role === 'LEADER';

    if (!isLeader) {
      setIsNotLeaderModalOpen(true);
      return;
    }

    setIsDeleteModalOpen(true);
  };

  const handleDeleteTeamConfirm = () => {
    if (!checkTeamId(team)) {
      return;
    }
    deleteTeam(team.id);
    setIsDeleteModalOpen(false);
  };

  //팀으로 이동
  const handleCardClick = () => {
    if (!checkTeamId(team)) {
      return;
    }
    navigate(RouterPath.TEAM_CALENDAR.DEFAULT.replace(':id', team.id.toString()));
  };

  // 가입 코드 복사
  const handleCopyInviteCode = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(team.invite_code);
      toast.success('가입 코드가 복사되었습니다.');
    } catch (err) {
      toast.error('복사할 수 없습니다.');
    }
  };

  return (
    <div className="overflow-hidden relative rounded-xl">
      {/* 액션 버튼들 (배경) */}
      <div className="flex absolute top-0 right-0 w-16 h-full">
        <div className="flex flex-col flex-1 gap-2 justify-center p-2 bg-gray-50">
          <Button
            noWrapper
            variant="ghost"
            className="p-2 font-normal text-red-600 bg-transparent rounded-lg hover:bg-red-100"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTeamClick();
            }}
          >
            <div className="flex flex-col gap-1 items-center">
              <Trash className="w-4 h-4" />
              <span className="text-xs">삭제</span>
            </div>
          </Button>
          <Button
            noWrapper
            variant="ghost"
            className="p-2 font-normal text-orange-600 bg-transparent rounded-lg hover:bg-orange-100"
            onClick={(e) => {
              e.stopPropagation();
              handleLeaveTeamClick();
            }}
          >
            <div className="flex flex-col gap-1 items-center">
              <LogOut className="w-4 h-4" />
              <span className="text-xs">탈퇴</span>
            </div>
          </Button>
        </div>
      </div>

      {/* 메인 카드 */}
      <div
        onClick={handleCardClick}
        className={`relative p-4 bg-white rounded-xl border border-gray-200 shadow-sm transition-transform duration-300 ease-out hover:border-blue-400 group hover:z-10 cursor-pointer ${
          isActionsOpen ? '-translate-x-[60px]' : 'translate-x-0'
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col justify-between">
            <div className="flex items-center mb-2 space-x-3">
              <h3 className="text-lg font-semibold text-gray-800 transition-colors duration-200 group-hover:text-blue-600">
                {team.team_name}
              </h3>
            </div>

            <div className="flex items-center mb-3 space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>멤버 {team.member_count}명</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {team.members.slice(0, MAX_VISIBLE_AVATARS).map((member, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center w-7 h-7 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full border-2 border-white shadow-sm"
                    title={member.name}
                  >
                    {member.name[0]}
                  </div>
                ))}
                {team.member_count > MAX_VISIBLE_AVATARS && (
                  <div className="flex justify-center items-center w-7 h-7 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full border-2 border-white shadow-sm">
                    +{team.member_count - MAX_VISIBLE_AVATARS}
                  </div>
                )}
              </div>
              <div className="overflow-visible ml-2 text-sm text-gray-700 max-w-[70px]">
                <div className="text-nowrap">
                  {team.members
                    .slice(0, MAX_VISIBLE_MEMBER_NAMES)
                    .map((m) => m.name)
                    .join(', ')}
                  {team.member_count > MAX_VISIBLE_MEMBER_NAMES &&
                    ` 외 ${team.member_count - MAX_VISIBLE_MEMBER_NAMES}명`}
                </div>
              </div>
            </div>
          </div>

          <div className="flex absolute right-2 items-center space-x-2">
            <button
              onClick={handleCopyInviteCode}
              className="flex gap-1 items-center px-2 py-1 font-mono text-xs font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200 transition-colors cursor-pointer hover:bg-gray-200 hover:text-gray-800"
              title="가입 코드 복사"
            >
              <span>{team.invite_code}</span>
              <Copy className="w-3 h-3" />
            </button>
            <Button
              noWrapper
              variant="ghost"
              className="p-2 font-normal text-gray-400 bg-transparent rounded-full hover:bg-blue-50 hover:text-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                handleSettingsClick();
              }}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 팀 탈퇴 확인 모달 */}
      <ConfirmModal
        isOpen={isLeaveModalOpen}
        title="팀에서 탈퇴하시겠습니까?"
        message={`탈퇴 후에는 팀 일정에 접근할 수 없습니다.\n"${team.team_name}" 팀에서 탈퇴하시겠습니까?`}
        onConfirm={handleLeaveTeamConfirm}
        onClose={() => setIsLeaveModalOpen(false)}
        confirmText="탈퇴"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
      />

      {/* 팀 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="해당 팀을 삭제하시겠습니까?"
        message={`삭제된 팀은 복구할 수 없으며, 모든 팀 데이터가 영구적으로 삭제됩니다.\n"${team.team_name}" 팀을 삭제하시겠습니까?`}
        onConfirm={handleDeleteTeamConfirm}
        onClose={() => setIsDeleteModalOpen(false)}
        confirmText="삭제"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
      />

      {/* 리더가 아닐 때 경고 모달 (삭제) */}
      <ConfirmModal
        isOpen={isNotLeaderModalOpen}
        title="해당 팀을 삭제할 수 없습니다"
        message={`팀 리더만 팀을 삭제할 수 있습니다.\n현재 팀 리더가 아니므로 팀을 삭제할 수 없습니다.`}
        onConfirm={() => setIsNotLeaderModalOpen(false)}
        onClose={() => setIsNotLeaderModalOpen(false)}
        confirmText="확인"
        confirmButtonColor="bg-blue-600 hover:bg-blue-700"
      />

      {/* 리더가 탈퇴할 수 없을 때 경고 모달 */}
      <ConfirmModal
        isOpen={isLeaderCannotLeaveModalOpen}
        title="해당 팀에서 탈퇴할 수 없습니다"
        message={`팀 리더는 팀에서 탈퇴할 수 없습니다.\n리더가 팀을 탈퇴하려면 팀을 삭제해주세요.`}
        onConfirm={() => setIsLeaderCannotLeaveModalOpen(false)}
        onClose={() => setIsLeaderCannotLeaveModalOpen(false)}
        confirmText="확인"
        confirmButtonColor="bg-blue-600 hover:bg-blue-700"
      />
    </div>
  );
};

export default TeamListCard;
