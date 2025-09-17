import { RouterPath } from '@/routes/path';
import { GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex flex-col justify-center items-center cursor-pointer ${className ?? ''}`}
      onClick={() => navigate(RouterPath.HOME.DEFAULT)}
    >
      <div className="flex items-center space-x-2">
        <GraduationCap className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-blue-600">UniSchedule</h1>
      </div>
      <p className="mt-1 text-sm text-blue-500">대학생을 위한 팀 일정 매니저</p>
    </div>
  );
};

export default Logo;
