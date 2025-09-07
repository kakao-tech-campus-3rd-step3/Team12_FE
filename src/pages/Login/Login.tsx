import Logo from '@/components/atoms/Logo';
import { RouterPath } from '@/routes/path';
import { Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[340px]">
        <div className="mb-6">
          <Logo />
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
          <Link
            to={RouterPath.SIGNUP}
            className="block text-xs text-gray-500 text-center mt-2 mb-6 hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
