import { AxiosError } from 'axios';
import { useState } from 'react';
import { KeyRound, Lock, Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RouterPath } from '@/routes/path';
import { useAuthStore } from '@/store/useAuthStore';
import Logo from '@/components/atoms/Logo';
import Button from '@/components/atoms/Button';
import { AuthInput } from '@/components/atoms/AuthInput';

const signupSchema = z
  .object({
    nickname: z.string().min(1, '닉네임은 필수입니다.'),
    email: z.string().min(1, '이메일은 필수입니다.').email('유효한 이메일 형식이 아닙니다.'),
    password: z.string().min(8, '비밀번호는 최소 8자리 이상이어야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [backendError, setBackendError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignupFormData) => {
    setBackendError(null);

    try {
      await signup({
        nickname: data.nickname,
        email: data.email,
        password: data.password,
      });
      alert('회원가입이 완료되었습니다. 로그인해주세요!');
      navigate(RouterPath.LOGIN);
    } catch (error) {
      let errorMessage = '회원가입에 실패했습니다.';
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      setBackendError(errorMessage);
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="w-[340px]">
        <div className="mb-7">
          <Logo />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1.5">
            <AuthInput
              icon={User}
              type="text"
              placeholder="닉네임"
              error={errors.nickname?.message}
              {...register('nickname')}
            />
            <div className="flex space-x-2">
              <AuthInput
                icon={Mail}
                type="email"
                placeholder="이메일"
                error={errors.email?.message}
                className="flex-1"
                {...register('email')}
              />
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
            {showVerification && (
              <div className="flex space-x-2">
                <div className="flex-1">
                  <div className="flex items-center px-3 py-3 rounded-lg border border-gray-300 transition hover:border-blue-500 focus-within:border-blue-500">
                    <KeyRound className="mr-2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="인증코드 입력"
                      className="flex-1 bg-transparent border-none outline-none"
                    />
                  </div>
                </div>
                <Button type="button" variant="primary" size="md" noWrapper={true} className="px-4">
                  인증하기
                </Button>
              </div>
            )}
            <div className="mt-2"></div>
            <AuthInput
              icon={Lock}
              type="password"
              placeholder="비밀번호"
              error={errors.password?.message}
              {...register('password')}
            />
            <AuthInput
              icon={Lock}
              type="password"
              placeholder="비밀번호 확인"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          {backendError && (
            <div className="px-3 py-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md text-center">
              {backendError}
            </div>
          )}

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
