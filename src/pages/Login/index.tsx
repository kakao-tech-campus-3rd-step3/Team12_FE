import { AxiosError } from 'axios';
import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { RouterPath } from '@/routes/path';
import Logo from '@/components/atoms/Logo';
import Button from '@/components/atoms/Button';
import { AuthInput } from '@/components/atoms/AuthInput';

const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('유효한 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [backendError, setBackendError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    setBackendError(null);

    try {
      await login(data);
      navigate(RouterPath.HOME.DEFAULT);
    } catch (error) {
      let backendMessage = '로그인에 실패했습니다.';

      if (error instanceof AxiosError) {
        backendMessage = error.response?.data?.message || backendMessage;
      }

      const errorMessage =
        backendMessage === '자격 증명에 실패하였습니다.'
          ? '아이디 또는 비밀번호가 올바르지 않습니다.'
          : backendMessage;

      setBackendError(errorMessage);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="w-[340px]">
        <div className="mb-6">
          <Logo />
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
              <AuthInput
                icon={User}
                type="email"
                placeholder="이메일"
                error={errors.email?.message}
                {...register('email')}
              />

              <AuthInput
                icon={Lock}
                type="password"
                placeholder="비밀번호"
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            {backendError && (
              <div className="mt-3 px-3 py-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md text-center">
                {backendError}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              noWrapper={true}
              fullWidth={true}
              className="mt-3 w-[100%] cursor-pointer"
            >
              로그인하기
            </Button>
          </form>

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
