import type { TeamData } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import { Calendar, LogOut, Settings, Trash, Users, Copy } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface TeamListCardProps {
  team: TeamData;
  leaveTeam: (teamId: number) => void;
  deleteTeam: (teamId: number) => void;
  // onSettingsClick?: (teamId: string) => void;
}

const MAX_VISIBLE_AVATARS = 4;
const MAX_VISIBLE_MEMBER_NAMES = 2;

const TeamListCard = ({ team, leaveTeam, deleteTeam }: TeamListCardProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const navigate = useNavigate();

  // 설정 버튼 클릭으로 토글
  const handleSettingsClick = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const checkTeamId = (team: TeamData) => {
    if (!team.id || team.id === undefined) {
      console.error('Invalid team_id for leaving team:', team);
      toast.error('팀 정보가 올바르지 않습니다.');
      return false;
    }
    return true;
  };
  const handleLeaveTeam = () => {
    if (!checkTeamId(team)) {
      return;
    }
    setIsActionsOpen(false);
    leaveTeam(team.id);
    toast.success('팀 탈퇴 성공');
  };

  const handleDeleteTeam = () => {
    if (!checkTeamId(team)) {
      return;
    }
    setIsActionsOpen(false);
    deleteTeam(team.id);
  };

  //팀으로 이동
  const handleCardClick = () => {
    if (!checkTeamId(team)) {
      return;
    }
    navigate(`/team-calendar/${team.id}`);
  };

  // 가입 코드 복사
  const handleCopyInviteCode = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 방지
    
    try {
      await navigator.clipboard.writeText(team.invite_code);
      toast.success('가입 코드가 복사되었습니다.');
    } catch (err) {
      toast.error('복사에 실패했습니다.');
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
              handleDeleteTeam();
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
              handleDeleteTeam();
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
              <div className="ml-2 text-sm text-gray-700">
                {team.members
                  .slice(0, MAX_VISIBLE_MEMBER_NAMES)
                  .map((m) => m.name)
                  .join(', ')}
                {team.member_count > MAX_VISIBLE_MEMBER_NAMES &&
                  ` 외 ${team.member_count - MAX_VISIBLE_MEMBER_NAMES}명`}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyInviteCode}
              className="flex items-center gap-1 px-2 py-1 font-mono text-xs font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-800 transition-colors cursor-pointer"
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
    </div>
  );
};

export default TeamListCard;
