import { User, Lock, GraduationCap } from 'lucide-react';

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="w-[340px]">
        <div className="flex flex-col justify-center items-center mb-10">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-600">UniSchedule</h1>
          </div>
          <p className="text-sm text-blue-500 mt-1">대학생을 위한 팀 일정 매니저</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 cursor-pointer transition">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="이메일"
                className="flex-1 outline-none border-none bg-transparent"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 cursor-pointer transition">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="비밀번호"
                className="flex-1 outline-none border-none bg-transparent"
              />
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium cursor-pointer transition">
            로그인하기
          </button>

          <p className="text-xs text-gray-500 text-center cursor-pointer hover:underline">
            비밀번호를 잊으셨나요?
          </p>
          <p className="text-xs text-gray-500 text-center mt-2 mb-6 cursor-pointer hover:underline">
            회원가입
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
