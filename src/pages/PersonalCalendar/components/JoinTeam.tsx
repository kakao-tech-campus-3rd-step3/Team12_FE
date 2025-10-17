import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface JoinTeamProps {
  onBack: () => void;
  onJoinTeam: (inviteCode: string) => void;
}

const JoinTeam = ({ onBack, onJoinTeam }: JoinTeamProps) => {
  const [inviteCode, setInviteCode] = useState('');

  const handleJoinTeam = () => {
    if (!inviteCode.trim()) {
      alert('초대코드를 입력해주세요.');
      return;
    }
    onJoinTeam(inviteCode);
    setInviteCode('');
  };

  return (
    <div className="p-6 overflow-y-auto">
      <div className="pt-8 pb-0">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-4 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ←
          </button>
          <h2 className="text-xl font-semibold text-gray-900">팀 참여하기</h2>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
                <UserPlus className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-gray-600 text-sm">팀 관리자로부터 받은 초대코드를 입력해주세요.</p>
            </div>

            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-700 mb-2">
                초대코드
              </label>
              <input
                id="inviteCode"
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="초대코드를 입력하세요"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 outline-none transition-colors"
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
                className="w-full h-12 flex items-center justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
