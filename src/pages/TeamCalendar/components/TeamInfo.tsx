import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { teamAPI } from '@/apis/services/team';
import type { GetMyTeamInfoResponse } from '@/apis/types/team';

interface TeamInfoProps {
  teamId: number;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ teamId }) => {
  const {
    data: teamInfo,
    isLoading,
    error,
  } = useQuery<GetMyTeamInfoResponse>({
    queryKey: ['teamInfo', teamId],
    queryFn: () => teamAPI.getMyTeam(teamId),
    enabled: !!teamId,
  });

  if (isLoading) {
    return (
      <div className="px-3 mb-8">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error || !teamInfo) {
    return (
      <div className="px-3 mb-8">
        <p className="text-sm text-red-500">팀 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className=" mb-8">
      <div className="bg-white rounded-xl p-4 border border-mainBlue/70 shadow-md">
        {/* 팀 이름 */}
        <div className="flex justify-between">
          <p className="text-xl font-semibold text-gray-900">{teamInfo.name}</p>
          <span className="px-2 py-1.5 font-mono text-xs font-medium text-gray-600 bg-gray-100 rounded-full border border-gray-200">
            {teamInfo.code}
          </span>
        </div>

        {/* 팀 설명 */}
        {teamInfo.description && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 leading-relaxed">{teamInfo.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamInfo;
