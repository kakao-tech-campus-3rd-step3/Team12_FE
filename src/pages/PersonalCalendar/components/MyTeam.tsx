import type { TeamData } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import { Settings, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyTeam = ({
  teams,
  isLoading,
  setIsSetting,
}: {
  teams: TeamData[];
  isLoading: boolean;
  setIsSetting: (isSetting: boolean) => void;
}) => {
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-3 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">내 팀 목록 ({teams.length})</h3>
        <Button
          wrapperClassName="m-0 p-0 w-fit rounded-md h-fit bg-transparent"
          noWrapper
          className="p-2 text-gray-400 bg-transparent rounded-full transition-colors duration-200 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
          onClick={() => setIsSetting(true)}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {teams.map((team, index) => (
          <div
            key={index}
            onClick={() => navigate(`/team-calendar/${team.id}`)}
            className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:bg-blue-50/50 hover:border-blue-300 cursor-pointer transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                    {team.team_name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-gray-500" />
                  <p className="text-xs text-gray-500">{team.member_count}명</p>
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
