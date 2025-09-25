import { Lock, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '@/components/atoms/Logo';
import { RouterPath } from '@/routes/path';
import { useAuthStore } from '@/store/useAuthStore';

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
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 cursor-pointer transition">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="이메일"
                  className="flex-1 outline-none border-none bg-transparent"
                />
              </div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 hover:border-blue-500 focus-within:border-blue-500 cursor-pointer transition">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="비밀번호"
                  className="flex-1 outline-none border-none bg-transparent"
                />
              </div>
            </div>
            {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 mt-6 rounded-lg font-medium cursor-pointer transition"
            >
              로그인하기
            </button>
          </form>

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
