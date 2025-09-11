import { teams } from '@/mockdata/schedule';

const MyTeam = () => {
  return (
    <div className="px-3 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">내 팀 ({teams.length})</h3>
        <button className="p-1 text-sm rounded-md text-mainBlue hover:text-mainBlue/80">
          설정
        </button>
      </div>
      <div className="space-y-3">
        {teams.map((team, index) => (
          <div key={index} className="flex justify-between items-center p-2 pl-0 rounded-lg">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${team.color} mr-2`} />
              <div>
                <p className="text-xs font-medium text-gray-800">{team.name}</p>
                <p className="text-xs text-gray-500">{team.members}명</p>
              </div>
            </div>
            <button className="px-3 py-1 text-xs text-blue-600 bg-blue-50 rounded-md transition-colors hover:bg-blue-100">
              이동
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
