import { Users, Plus, UserPlus } from 'lucide-react';
import { mockTeams } from '@/mockdata/teamData';
import Button from '@/components/atoms/Button';
import TeamListCard from '@/pages/TeamCalendar/components/TeamListCard';

interface TeamListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamListModal = ({ isOpen, onClose }: TeamListModalProps) => {
  if (!isOpen) return null;

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
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
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
              <Button
                handleSubmit={() => {}}
                text="새 팀 만들기"
                icon={<Plus />}
                size="sm"
                noWrapper={true}
              />
              <Button
                handleSubmit={() => {}}
                text="팀 참여하기"
                icon={<UserPlus />}
                variant="outline"
                size="sm"
                noWrapper={true}
              />
            </div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {mockTeams.map((team) => (
              <TeamListCard
                key={team.id}
                team={team}
                onSettingsClick={(teamId) => {
                  console.log('팀 설정', teamId);
                }}
              />
            ))}
          </div>

          {mockTeams.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gray-100">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">참여 중인 팀이 없습니다</p>
              <Button handleSubmit={() => {}} text="첫 번째 팀 만들기" size="sm" noWrapper={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamListModal;
