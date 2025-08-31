import { useState } from 'react';
import { User, Lock, Mail, KeyRound } from 'lucide-react';
import Logo from '@/components/Logo';

const Signup = () => {
  const [showVerification, setShowVerification] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="w-[340px]">
        <div className="mb-7">
          <Logo />
        </div>
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center mb-3 border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 transition">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="이름"
                className="flex-1 outline-none border-none bg-transparent"
              />
            </div>

            <div className="flex space-x-2">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 flex-1 hover:border-blue-500 focus-within:border-blue-500 transition">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  placeholder="이메일"
                  className="flex-1 outline-none border-none bg-transparent"
                />
              </div>
              <button
                onClick={() => setShowVerification(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg font-medium transition"
              >
                인증코드
              </button>
            </div>

            <div
              className={`transition-all duration-400 ease-in-out overflow-hidden ${
                showVerification ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex space-x-2 mb-1.5">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 flex-1 hover:border-blue-500 focus-within:border-blue-500 transition">
                  <KeyRound className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="인증코드 입력"
                    className="flex-1 outline-none border-none bg-transparent"
                  />
                </div>

                <div className="flex space-x-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg font-medium transition">
                    인증하기
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-2"></div>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 transition">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="비밀번호"
                className="flex-1 outline-none border-none bg-transparent"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 transition">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="비밀번호 확인"
                className="flex-1 outline-none border-none bg-transparent"
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
            회원가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
