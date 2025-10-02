import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import { RouterPath } from '@/routes/path';
import { useAuthStore } from '@/store/useAuthStore';
import { KeyRound, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <div className="flex items-center px-3 py-3 mb-3 rounded-lg border border-gray-300 transition hover:border-blue-500 focus-within:border-blue-500">
              <User className="mr-2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
                placeholder="닉네임"
                className="flex-1 bg-transparent border-none outline-none"
              />
            </div>

            <div className="flex space-x-2">
              <div className="flex flex-1 items-center px-3 py-3 rounded-lg border border-gray-300 transition hover:border-blue-500 focus-within:border-blue-500">
                <Mail className="mr-2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="이메일"
                  className="flex-1 bg-transparent border-none outline-none"
                />
              </div>
              <Button
                type="button"
                onClick={() => setShowVerification(true)}
                variant="primary"
                size="md"
                noWrapper={true}
                className="px-4"
              >
                인증코드
              </Button>
            </div>

            <div
              className={`transition-all duration-400 ease-in-out overflow-hidden ${
                showVerification ? 'mt-2 max-h-20 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex space-x-2 mb-1.5">
                <div className="flex flex-1 items-center px-3 py-3 rounded-lg border border-gray-300 transition hover:border-blue-500 focus-within:border-blue-500">
                  <KeyRound className="mr-2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="인증코드 입력"
                    className="flex-1 bg-transparent border-none outline-none"
                  />
                </div>

                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    noWrapper={true}
                    className="px-4"
                  >
                    인증하기
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-2"></div>
            <div className="flex items-center px-3 py-3 rounded-lg border border-gray-300 transition hover:border-blue-500 focus-within:border-blue-500">
              <Lock className="mr-2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="비밀번호"
                className="flex-1 bg-transparent border-none outline-none"
              />
            </div>

            <div className="flex items-center px-3 py-3 rounded-lg border border-gray-300 transition hover:border-blue-500 focus-within:border-blue-500">
              <Lock className="mr-2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                placeholder="비밀번호 확인"
                className="flex-1 bg-transparent border-none outline-none"
              />
            </div>
          </div>

          <Button
            className="w-[100%]"
            type="submit"
            variant="primary"
            size="md"
            noWrapper={true}
            fullWidth={true}
          >
            회원가입 하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
