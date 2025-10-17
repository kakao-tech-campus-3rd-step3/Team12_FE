import type { TeamData } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import { Calendar, LogOut, Settings, Trash, Users } from 'lucide-react';
import { useState } from 'react';

interface TeamListCardProps {
  team: TeamData;
  leaveTeam: (teamId: number) => void;
  deleteTeam: (teamId: number) => void;
  // onSettingsClick?: (teamId: string) => void;
}

const TeamListCard = ({ team, leaveTeam, deleteTeam }: TeamListCardProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  // 설정 버튼 클릭으로 토글
  const handleSettingsClick = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const handleLeaveTeam = () => {
    setIsActionsOpen(false);
    leaveTeam(team.team_id);
  };

  const handleDeleteTeam = () => {
    setIsActionsOpen(false);
    deleteTeam(team.team_id);
  };

  return (
    <div className="overflow-hidden relative rounded-xl">
      {/* 액션 버튼들 (배경) */}
      <div className="flex absolute top-0 right-0 w-16 h-full">
        <div className="flex flex-col flex-1 gap-2 justify-center p-2 bg-gray-50">
          <Button
            noWrapper
            className="!p-2 !text-red-600 !bg-transparent !rounded-lg !font-normal !transition-all !duration-200 hover:!bg-red-100 !border-none focus-visible:!ring-0"
            onClick={handleDeleteTeam}
          >
            <div className="flex flex-col gap-1 items-center">
              <Trash className="w-4 h-4" />
              <span className="text-xs">삭제</span>
            </div>
          </Button>
          <Button
            noWrapper
            className="!p-2 !text-orange-600 !bg-transparent !rounded-lg !font-normal !transition-all !duration-200 hover:!bg-orange-100 !border-none focus-visible:!ring-0"
            onClick={handleLeaveTeam}
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
        className="relative p-4 bg-white rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:border-blue-400 group hover:z-10"
        style={{
          transform: `translateX(-${isActionsOpen ? 60 : 0}px)`,
          transition: 'transform 0.3s ease-out',
        }}
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
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>예정된 미팅 0개</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {team.members.slice(0, 4).map((member, i) => (
                  <div
                    key={i}
                    className="flex justify-center items-center w-7 h-7 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full border-2 border-white shadow-sm"
                    title={member.name}
                  >
                    {member.name[0]}
                  </div>
                ))}
                {team.member_count > 4 && (
                  <div className="flex justify-center items-center w-7 h-7 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full border-2 border-white shadow-sm">
                    +{team.member_count - 4}
                  </div>
                )}
              </div>
              <div className="ml-2 text-sm text-gray-700">
                {team.members
                  .slice(0, 2)
                  .map((m) => m.name)
                  .join(', ')}
                {team.member_count > 2 && ` 외 ${team.member_count - 2}명`}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 font-mono text-xs font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200">
              {team.invite_code}
            </span>
            <Button
              noWrapper
              className="p-2 !text-gray-400 !bg-transparent !rounded-full !font-normal !transition-all !duration-200 hover:!bg-blue-50 hover:!text-blue-600 !border-none focus-visible:!ring-0"
              onClick={handleSettingsClick}
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
