import { KeyRound, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/atoms/Logo';
import { RouterPath } from '@/routes/path';
import { useAuthStore } from '@/store/useAuthStore';

const Signup = () => {
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signup } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(RouterPath.LOGIN);

    if (formData.password != formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
    }

    signup({
      nickname: formData.nickname,
      email: formData.email,
      password: formData.password,
    })
      .then(() => {
        alert('회원가입이 완료되었습니다. 로그인해주세요!');
        navigate(RouterPath.LOGIN);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="w-[340px]">
        <div className="mb-7">
          <Logo />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center mb-3 border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 transition">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
                placeholder="닉네임"
                className="flex-1 outline-none border-none bg-transparent"
              />
            </div>

            <div className="flex space-x-2">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 flex-1 hover:border-blue-500 focus-within:border-blue-500 transition">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="이메일"
                  className="flex-1 outline-none border-none bg-transparent"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowVerification(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg font-medium cursor-pointer transition"
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
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg font-medium cursor-pointer transition"
                  >
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
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="비밀번호"
                className="flex-1 outline-none border-none bg-transparent"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 transition">
              <Lock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                placeholder="비밀번호 확인"
                className="flex-1 outline-none border-none bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium cursor-pointer transition"
          >
            회원가입 하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
