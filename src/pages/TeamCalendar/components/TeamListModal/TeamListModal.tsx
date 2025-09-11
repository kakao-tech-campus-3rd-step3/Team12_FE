import { Settings, Users, Calendar, Plus, UserPlus } from 'lucide-react';

interface TeamListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamListModal = ({ isOpen, onClose }: TeamListModalProps) => {
  if (!isOpen) return null;

  const teams = [
    {
      code: 'WEB2024',
      name: '웹개발 팀플',
      members: ['푸름이', '김철수', '이영희', '박민수'],
      meetings: 2,
      color: 'blue',
    },
    {
      code: 'AI2024',
      name: 'AI 공모전',
      members: ['푸름이', '최지훈', '정수연'],
      meetings: 1,
      color: 'emerald',
    },
    {
      code: 'STUDY2023',
      name: '스터디 그룹',
      members: ['푸름이', '한지민'],
      meetings: 0,
      color: 'amber',
    },
    {
      code: 'STUDY2024',
      name: '스터디 그룹',
      members: ['푸름이', '한지민'],
      meetings: 0,
      color: 'amber',
    },
    {
      code: 'STUDY2025',
      name: '스터디 그룹',
      members: ['푸름이', '한지민'],
      meetings: 0,
      color: 'amber',
    },
  ];

  const getInviteCodeClasses = () => {
    return 'bg-gray-100 border-gray-200 text-gray-600';
  };

  return (
    <div
      className="flex fixed top-0 left-0 z-50 justify-center items-center m-auto w-full h-full bg-gray-200/60"
      onClick={onClose}
    >
      <div
        className="relative p-6 w-full max-w-2xl bg-white rounded-lg max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="pt-10 pb-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-900">팀 관리</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                참여 중인 팀을 관리하고 새로운 팀을 만들거나 참여하세요.
              </p>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                <Plus className="w-4 h-4" />
                <span>새 팀 만들기</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                <UserPlus className="w-4 h-4" />
                <span>팀 참여하기</span>
              </button>
            </div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {teams.map((team) => (
              <div className="border border-gray-200 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all duration-200 group">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                        {team.name}
                      </h3>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>멤버 {team.members.length}명</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>예정된 미팅 {team.meetings}개</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-1">
                        {team.members.slice(0, 4).map((member, i) => (
                          <div
                            key={i}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-semibold border-2 border-white shadow-sm"
                            title={member}
                          >
                            {member[0]}
                          </div>
                        ))}
                        {team.members.length > 4 && (
                          <div className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 text-xs font-semibold border-2 border-white shadow-sm">
                            +{team.members.length - 4}
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-700 ml-2">
                        {team.members.slice(0, 2).join(', ')}
                        {team.members.length > 2 && ` 외 ${team.members.length - 2}명`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium border font-mono ${getInviteCodeClasses()}`}
                    >
                      {team.code}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {teams.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">참여 중인 팀이 없습니다</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                첫 번째 팀 만들기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamListModal;
