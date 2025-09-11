import { Settings, Users, Calendar } from 'lucide-react';
import type { Team } from '@/types/team';

interface TeamListCardProps {
  team: Team;
  onSettingsClick?: (teamId: string) => void;
}

const TeamListCard = ({ team, onSettingsClick }: TeamListCardProps) => {
  return (
    <div
      className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:border-blue-400 transition-all duration-300 group relative hover:z-10"
    >
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
          <span className="px-2 py-1 text-xs rounded-full font-medium border font-mono bg-gray-100 border-gray-200 text-gray-600">
            {team.id}
          </span>
          <button 
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
            onClick={() => onSettingsClick?.(team.id)}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamListCard; 