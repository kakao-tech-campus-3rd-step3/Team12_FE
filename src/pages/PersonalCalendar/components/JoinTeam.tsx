import Button from '@/components/atoms/Button';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface JoinTeamProps {
  onBack: () => void;
  onJoinTeam: (inviteCode: string) => void;
}

const JoinTeam = ({ onBack, onJoinTeam }: JoinTeamProps) => {
  const [inviteCode, setInviteCode] = useState('');

  const handleJoinTeam = () => {
    if (!inviteCode.trim()) {
      toast.error('초대코드를 입력해주세요.');
      return;
    }
    onJoinTeam(inviteCode);
    setInviteCode('');
  };

  return (
    <div className="overflow-y-auto p-6">
      <div className="pt-8 pb-0">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 text-gray-600 transition-colors hover:text-gray-800"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold text-gray-900">팀 참여하기</h2>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="space-y-6 w-full max-w-sm">
            <div className="mb-8 text-center">
              <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-blue-50 rounded-full">
                <UserPlus className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-sm text-gray-600">팀 관리자로부터 받은 초대코드를 입력해주세요.</p>
            </div>

            <div>
              <label htmlFor="inviteCode" className="block mb-2 text-sm font-medium text-gray-700">
                초대코드
              </label>
              <input
                id="inviteCode"
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="초대코드를 입력하세요"
                className="px-4 py-3 w-full rounded-lg border border-gray-300 transition-colors outline-none focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJoinTeam();
                  }
                }}
              />
            </div>

            <div>
              <Button
                onClick={handleJoinTeam}
                text="가입하기"
                size="md"
                noWrapper={true}
                className="flex justify-center items-center w-full h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
