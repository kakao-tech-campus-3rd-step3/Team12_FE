import type { TeamData } from '@/apis/types/team';
import Button from '@/components/atoms/Button';
import ModalHeader from '@/components/atoms/ModalHeader';
import Modal from '@/components/molecules/Modal';
import { Users } from 'lucide-react';

interface TeamSettingModalProps {
  isOpen: boolean;
  teams: TeamData[];
  onClose: () => void;
  leaveTeam: (teamId: number) => void;
  deleteTeam: (teamId: number) => void;
}

const TeamSettingModal = ({
  isOpen,
  teams,
  onClose,
  leaveTeam,
  deleteTeam,
}: TeamSettingModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="팀 설정" />
      <div className="flex flex-col gap-4 mt-4">
        {teams.map((team) => (
          <div key={team.id} className="flex gap-2 justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="flex justify-center items-center w-8 h-8 bg-blue-50 rounded-full">
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              <div>{team.team_name}</div>
              <div className="text-sm text-gray-500">{team.member_count}명</div>
            </div>

            <div className="flex gap-4">
              <Button
                wrapperClassName="w-fit m-0 p-0"
                className="p-2 px-4 text-white h-fit"
                onClick={() => leaveTeam(team.id)}
              >
                팀 탈퇴
              </Button>
              <Button
                wrapperClassName="w-fit m-0 p-0"
                className="p-2 px-4 text-white h-fit"
                onClick={() => deleteTeam(team.id)}
              >
                팀 삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default TeamSettingModal;
