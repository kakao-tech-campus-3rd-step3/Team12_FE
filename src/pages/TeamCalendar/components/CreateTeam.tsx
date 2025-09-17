import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { FormInput } from '@/components/atoms/FormInput';
import { FormTextarea } from '@/components/atoms/FormTextarea';

interface CreateTeamProps {
  onBack: () => void;
  onCreateTeam: (teamData: { name: string; description: string }) => void;
}

const CreateTeam = ({ onBack, onCreateTeam }: CreateTeamProps) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      alert('팀 이름을 입력해주세요.');
      return;
    }
    onCreateTeam({
      name: teamName.trim(),
      description: teamDescription.trim(),
    });
    setTeamName('');
    setTeamDescription('');
  };

  return (
    <div className="h-full flex flex-col pt-10 pb-5 p-6 h-full">
      {/* 헤더 */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8 mr-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900">새 팀 만들기</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            새로운 팀을 만들고 멤버들과 함께 일정을 관리하세요.
          </p>
        </div>
      </div>

      {/* 폼 */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6">
          <FormInput
            id="teamName"
            label="팀 이름"
            value={teamName}
            onChange={setTeamName}
            placeholder="예: 웹개발 팀플, AI 공모전 등"
            maxLength={50}
            required={true}
            helpText="팀의 목적이나 프로젝트명을 입력하세요"
          />

          <FormTextarea
            id="teamDescription"
            label="팀 소개"
            value={teamDescription}
            onChange={setTeamDescription}
            placeholder="팀의 목표, 활동 내용, 기대사항 등을 자유롭게 작성해주세요."
            maxLength={200}
            rows={10}
            helpText="팀 멤버들이 볼 수 있는 소개글입니다"
            resizable={false}
          />
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-4">
          <div className="flex-1">
            <Button
              onClick={onBack}
              text="취소"
              variant="outline"
              size="md"
              noWrapper={true}
              className="w-full flex justify-center items-center"
            />
          </div>
          <div className="flex-1">
            <Button
              onClick={handleCreateTeam}
              text="팀 생성하기"
              variant="primary"
              size="md"
              noWrapper={true}
              className={`w-full flex justify-center items-center ${!teamName.trim() ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
