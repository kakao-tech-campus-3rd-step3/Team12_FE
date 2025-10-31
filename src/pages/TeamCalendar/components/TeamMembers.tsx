import { useState } from 'react';
import { ChevronDown, ChevronUp, Settings, Crown } from 'lucide-react';
import { useTeamMembers } from '@/hooks/team';

interface TeamMembersProps {
  teamId: number;
  onSettingsClick?: () => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ teamId, onSettingsClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { data, isError } = useTeamMembers({ teamId });

  const LAST_NAME = (name: string) => name[0];
  const FULL_NAME = (name: string) => name;

  const getRoleText = (role: 'LEADER' | 'MEMBER') => {
    return role === 'LEADER' ? '리더' : '멤버';
  };

  const totalMembers = data?.total_elements || 0;
  const members = data?.content || [];

  return (
    <div className="mb-8">
      <div className="flex justify-between cursor-pointer">
        <div className="flex items-center space-x-3" onClick={() => setIsOpen(!isOpen)}>
          <span className="text-lg font-semibold text-gray-800">팀원</span>
          <span className="text-sm text-gray-500">({totalMembers}명)</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-blue-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-blue-500" />
          )}
        </div>
        <button
          className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 hover:bg-blue-50 rounded-full"
          onClick={onSettingsClick}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="mt-4">
          {/* 에러 */}
          {isError && (
            <div className="text-center py-4 text-red-500">팀원을 불러오는데 실패했습니다.</div>
          )}

          {/* 데이터 없음 */}
          {members.length === 0 && (
            <div className="text-center py-4 text-gray-500">팀원이 없습니다.</div>
          )}
          <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-2 px-3 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 text-sm font-semibold shadow-sm">
                      {LAST_NAME(member.name)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <div className="text-sm font-medium text-gray-800">
                        {FULL_NAME(member.name)}
                      </div>
                      {member.role === 'LEADER' && <Crown className="w-3.5 h-4 text-yellow-500" />}
                    </div>

                    <div
                      className={`text-xs font-medium ${
                        member.role === 'LEADER' ? 'text-yellow-600' : 'text-blue-600'
                      }`}
                    >
                      {getRoleText(member.role)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {members.length > 5 && (
            <p className="text-xs text-center text-gray-400 mt-2">스크롤하여 팀원 더보기</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
