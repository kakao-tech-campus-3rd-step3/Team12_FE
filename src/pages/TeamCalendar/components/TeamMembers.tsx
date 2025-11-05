import { useTeamMembers } from '@/hooks/team';
import { useAuthStore } from '@/store/useAuthStore';
import { Check, ChevronDown, ChevronUp, Crown, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

interface TeamMembersProps {
  teamId: number;
  onDeleteMember?: (memberId: number, memberName: string) => Promise<void>;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ teamId, onDeleteMember }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deletingMemberId, setDeletingMemberId] = useState<number | null>(null);

  const { data, isError } = useTeamMembers({ teamId });
  const { user } = useAuthStore();

  const getLastName = (name: string) => name[0];
  const getFullName = (name: string) => name;

  const getRoleText = (role: 'LEADER' | 'MEMBER') => {
    return role === 'LEADER' ? '리더' : '멤버';
  };

  const totalMembers = data?.total_elements || 0;
  const members = data?.content || [];

  //현재 사용자가 리더인지 확인
  const isCurrentUserMember = members.find((member) => member.name === user?.name);
  const isMemberLeader = isCurrentUserMember?.role === 'LEADER';

  const handleDeleteTeamMember = async (memberId: number, memberName: string) => {
    if (confirm(`${memberName} 님을 팀에서 제거하시겠습니까?`)) {
      try {
        setDeletingMemberId(memberId);
        await onDeleteMember?.(memberId, memberName);
        setDeletingMemberId(null);
      } catch (error) {
        setDeletingMemberId(null);
      }
    }
  };

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

        {isMemberLeader && (
          <button
            className={`transition-all duration-300 p-2 rounded-full relative ${
              isEditMode
                ? 'text-white bg-blue-600 shadow-lg scale-105 hover:bg-blue-700'
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={() => setIsEditMode(!isEditMode)}
            title={isEditMode ? '완료' : '팀원 관리'}
          >
            {isEditMode ? (
              <Check className="w-4 h-4 hover:cursor-pointer" />
            ) : (
              <Settings className="w-4 h-4 hover:cursor-pointer" />
            )}
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-4">
          {/* 에러 */}
          {isError && (
            <div className="py-4 text-center text-red-500">팀원을 불러오는데 실패했습니다.</div>
          )}

          {/* 데이터 없음 */}
          {members.length === 0 && (
            <div className="py-4 text-center text-gray-500">팀원이 없습니다.</div>
          )}
          <div className="overflow-y-auto mt-4 space-y-2 max-h-60">
            {members.map((member) => {
              const isCurrentUserMember = member.name === user?.name;
              const canDelete = isEditMode && !isCurrentUserMember && member.role !== 'LEADER';
              const isDeleting = deletingMemberId === member.id;

              return (
                <div
                  key={member.id}
                  className={`
                    group flex items-center justify-between py-2.5 px-3 rounded-xl
                    transition-all duration-200 relative
                    border border-transparent
                    ${canDelete ? 'bg-gray-50' : ''}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div
                        className={`flex justify-center items-center w-8 h-8 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full shadow-sm transition-all`}
                      >
                        {getLastName(member.name)}
                      </div>
                      {/* 본인 표시 */}
                      {isCurrentUserMember && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-sm font-medium text-gray-800">
                          {getFullName(member.name)}
                          {isCurrentUserMember && (
                            <span className="ml-1 text-xs font-semibold text-blue-600">[나]</span>
                          )}
                        </div>
                        {member.role === 'LEADER' && (
                          <Crown className="w-3.5 h-4 text-yellow-500" />
                        )}
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
                  {canDelete && (
                    <button
                      onClick={() => handleDeleteTeamMember(member.id, member.name)}
                      disabled={isDeleting}
                      className={`flex gap-2 p-2 text-xs text-red-500 rounded-lg border border-none transition-all duration-200  hover:bg-red-100 hover:border-transparent hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <LogOut className="mt-0.5 w-3 h-3 " />
                      팀원 삭제
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {members.length > 5 && (
            <p className="mt-2 text-xs text-center text-gray-400">스크롤하여 팀원 더보기</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMembers;
