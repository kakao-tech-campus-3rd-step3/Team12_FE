import { GraduationCap } from 'lucide-react';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex flex-col justify-center items-center ${className ?? ''}`}>
      <div className="flex items-center space-x-2">
        <GraduationCap className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-blue-600">UniSchedule</h1>
      </div>
      <p className="text-sm text-blue-500 mt-1">대학생을 위한 팀 일정 매니저</p>
    </div>
  );
};

export default Logo;
