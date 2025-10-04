import Button from '@/components/atoms/Button';
import Logo from '@/components/atoms/Logo';
import { RouterPath } from '@/routes/path';
import { useAuthStore } from '@/store/useAuthStore';
import { Lock, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, error } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData)
      .then(() => {
        navigate(RouterPath.HOME.DEFAULT);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="w-[340px]">
        <div className="mb-6">
          <Logo />
        </div>
        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <div className="flex items-center px-3 py-3 rounded-lg border border-gray-300 transition cursor-pointer hover:border-blue-500 focus-within:border-blue-500">
                <User className="mr-2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="이메일"
                  className="flex-1 bg-transparent border-none outline-none"
                />
              </div>
              <div className="flex items-center px-3 py-3 rounded-lg border border-gray-300 transition cursor-pointer hover:border-blue-500 focus-within:border-blue-500">
                <Lock className="mr-2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="비밀번호"
                  className="flex-1 bg-transparent border-none outline-none"
                />
              </div>
            </div>
            {error && <div className="mb-4 text-sm text-center text-red-500">{error}</div>}
            <Button
              type="submit"
              variant="primary"
              size="md"
              noWrapper={true}
              fullWidth={true}
              className="mt-6 w-[100%]"
            >
              로그인하기
            </Button>
          </form>

          <p className="text-xs text-center text-gray-500 cursor-pointer hover:underline">
            비밀번호를 잊으셨나요?
          </p>
          <Link
            to={RouterPath.SIGNUP}
            className="block mt-2 mb-6 text-xs text-center text-gray-500 hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
