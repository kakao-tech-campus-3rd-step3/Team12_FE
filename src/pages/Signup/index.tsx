import { AxiosError } from 'axios';
import { useState } from 'react';
import { KeyRound, Lock, Mail, User } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authAPI } from '@/apis';
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
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const userEmail = watch('email');

  const handleSendVerificationCode = async () => {
    if (!userEmail || errors.email) {
      toast.error('유효한 이메일을 입력해주세요.');
      return;
    }

    setIsSendingCode(true);
    try {
      const response = await authAPI.sendEmailVerification(userEmail);
      toast.success('인증 코드가 발송되었습니다.\n이메일을 확인해주세요.');
      setShowVerification(true);
      console.log('만료 시간:', response.data.expires_at);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || '인증 코드 발송에 실패했습니다.';
        toast.error(message);
      }
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerificationCode = async () => {
    if (!verificationCode) {
      toast.error('인증 코드를 입력해주세요.');
      return;
    }
    setIsVerifyingCode(true);
    try {
      await authAPI.verifyEmailVerification(userEmail, verificationCode);
      toast.success('이메일 인증이 완료되었습니다');
      setIsEmailVerified(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || '인증 코드가 올바르지 않습니다.';
        toast.error(message);
      }
    } finally {
      setIsVerifyingCode(false);
    }
  };

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
                onClick={handleSendVerificationCode}
                disabled={isSendingCode || !userEmail || !!errors.email || isEmailVerified}
                variant="primary"
                size="md"
                noWrapper={true}
                className="px-4 cursor-pointer"
              >
                {isSendingCode ? '발송중...' : isEmailVerified ? '인증완료' : '인증코드'}
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
                <Button
                  type="button"
                  onClick={handleVerificationCode}
                  disabled={isVerifyingCode || !verificationCode || isEmailVerified}
                  variant="primary"
                  size="md"
                  noWrapper={true}
                  className="px-4 cursor-pointer"
                >
                  {isVerifyingCode ? '확인중...' : isEmailVerified ? '완료' : '인증하기'}
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
            disabled={!isEmailVerified}
          >
            회원가입 하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
