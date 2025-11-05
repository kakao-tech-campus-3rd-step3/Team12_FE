import { useState, useRef, useEffect } from 'react';
import { useTeamMembers } from '@/hooks/team/useTeamMembers';
import type { TeamMemberResponse } from '@/apis/types/team';

interface MemberSelectDropdownProps {
  teamId: number;
  selectedMemberIds?: number[];
  onChange: (memberIds: number[]) => void;
  className?: string;
}

const MemberSelectDropdown: React.FC<MemberSelectDropdownProps> = ({
  teamId,
  selectedMemberIds,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 팀원 데이터 조회
  const { data: teamMembersData, isLoading } = useTeamMembers({ teamId });
  const teamMembers: TeamMemberResponse[] = teamMembersData?.content || [];

  // 전체 팀원 ID 목록
  const allMemberIds = teamMembers.map((member) => member.id);

  // 선택된 멤버 (없으면 전체 선택)
  const currentSelectedIds = selectedMemberIds ?? allMemberIds;

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 전체 선택 토글
  const handleSelectAll = () => {
    const isAllSelected = currentSelectedIds.length === allMemberIds.length;
    if (isAllSelected) {
      onChange([]);
    } else {
      onChange([...allMemberIds]);
    }
  };

  // 개별 멤버 선택 토글
  const handleMemberToggle = (memberId: number) => {
    const isSelected = currentSelectedIds.includes(memberId);
    if (isSelected) {
      onChange(currentSelectedIds.filter((id) => id !== memberId));
    } else {
      onChange([...currentSelectedIds, memberId]);
    }
  };

  // 선택된 팀원 이름 가져오기
  const getSelectedMemberNames = () => {
    return teamMembers
      .filter((member) => currentSelectedIds.includes(member.id))
      .map((member) => member.name);
  };

  const selectedNames = getSelectedMemberNames();
  const isAllSelected =
    currentSelectedIds.length === allMemberIds.length && allMemberIds.length > 0;
  const displayText =
    isLoading || teamMembers.length === 0
      ? '팀원 선택'
      : isAllSelected
        ? `전체 선택 (${teamMembers.length}명)`
        : selectedNames.length === 0
          ? '팀원 선택'
          : selectedNames.length === 1
            ? selectedNames[0]
            : `${selectedNames[0]} 외 ${selectedNames.length - 1}명`;

  if (!teamId) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading || teamMembers.length === 0}
          className={`w-full px-4 py-3 text-left bg-white border rounded-lg transition-all duration-200 flex items-center justify-between ${
            isOpen ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'
          } ${isLoading || teamMembers.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className={selectedNames.length > 0 ? 'text-gray-900' : 'text-gray-400'}>
            {isLoading ? '로딩 중...' : displayText}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <div className="max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">로딩 중...</div>
              ) : teamMembers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">팀원이 없습니다</div>
              ) : (
                <>
                  {/* 전체 선택 옵션 */}
                  <div
                    className="flex items-center px-4 py-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors sticky top-0 bg-white rounded-t-lg"
                    onClick={handleSelectAll}
                  >
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center mr-4 ${
                        isAllSelected
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {isAllSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">전체 선택</div>
                    </div>
                  </div>

                  {/* 개별 팀원 목록 */}
                  {teamMembers.map((member: TeamMemberResponse) => {
                    const isChecked = currentSelectedIds.includes(member.id);
                    return (
                      <div
                        key={member.id}
                        className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleMemberToggle(member.id)}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleMemberToggle(member.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center mr-4 ${
                            isChecked
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {isChecked && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          {member.role === 'LEADER' && (
                            <div className="text-xs text-blue-600">팀장</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberSelectDropdown;
