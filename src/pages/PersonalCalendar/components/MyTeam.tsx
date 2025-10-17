import type { TeamData } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyTeam = ({
  teams,
  isLoading,
  leaveTeam,
  deleteTeam,
  setIsSetting,
}: {
  teams: TeamData[];
  isLoading: boolean;
  leaveTeam: (teamId: number) => void;
  deleteTeam: (teamId: number) => void;
  setIsSetting: (isSetting: boolean) => void;
}) => {
  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-3 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">내 팀 ({teams.length})</h3>
        <Button
          wrapperClassName="m-0 p-0 w-fit rounded-md h-fit bg-transparent"
          noWrapper
          className="p-2 text-gray-400 bg-transparent rounded-full transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
          onClick={() => setIsSetting(true)}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
      <div className="">
        {teams.map((team, index) => (
          <div key={index} className="flex justify-between items-center p-2 pl-0 rounded-lg">
            <div className="flex items-center">
              <div className={`mr-2 w-3 h-3 rounded-full`} />
              <div>
                <p className="text-xs font-medium text-gray-800">{team.team_name}</p>
                <p className="text-xs text-gray-500">{team.member_count}명</p>
              </div>
            </div>
            <Button
              wrapperClassName="m-0 p-0 w-fit rounded-md h-fit"
              className="p-1 text-xs bg-blue-200 text-mainBlue hover:bg-blue-300"
              onClick={() => navigate(`/team-calendar/${team.id}`)}
            >
              이동
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
