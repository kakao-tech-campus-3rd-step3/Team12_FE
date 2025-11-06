import { authAPI } from '@/apis';
import ConfirmModal from '@/components/atoms/ConfirmModal';
import Logo from '@/components/atoms/Logo';
import { RouterPath } from '@/routes/path';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const navigate = useNavigate();

  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false);
  const { user, isAuthenticated, logout, getUserInfo } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 사용자 성 추출 함수
  const getUserInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const userInitial = getUserInitial(user?.name || '사용자');

  // 사용자 정보 조회 - 중복 정보 조회 방지
  const handleGetUserInfo = async () => {
    if (!isAuthenticated || isLoadingUserInfo) return;
    setIsLoadingUserInfo(true);
    try {
      await getUserInfo();
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
    } finally {
      setIsLoadingUserInfo(false);
    }
  };

  const handleSignout = async () => {
    try {
      await authAPI.signout();

      logout();

      toast.error('회원 탈퇴가 완료되었습니다.', {
        position: 'top-right',
        autoClose: 2000,
      });

      navigate(RouterPath.LOGIN);
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('회원 탈퇴 실패:', error);
      toast.error('회원 탈퇴에 실패했습니다. 다시 시도해주세요.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  if (!confirm) return;

  // 로그인 후 사용자 정보 자동 조회
  useEffect(() => {
    handleGetUserInfo();
  }, [isAuthenticated]);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate(RouterPath.LOGIN);
  };

  const UserProfile = ({ isOpen }: { isOpen: boolean }) => {
    return (
      <>
        {isOpen && (
          <div className="absolute right-0 z-[40] py-2 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg">
            {/* 사용자 정보 헤더 */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex gap-3 items-center">
                <div className="flex justify-center items-center w-10 h-10 text-white bg-blue-600 rounded-full">
                  <span className="text-sm font-medium">{userInitial}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name || '사용자'}</p>
                  <p className="text-xs text-gray-500">{user?.email || '이메일 없음'}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-3 w-full text-sm text-red-600 transition-all duration-200 cursor-pointer hover:bg-red-50"
            >
              로그아웃
            </button>
            <div className="border-b border-gray-100" />
            <button
              onClick={() => {
                setIsSignoutModalOpen(true);
                setIsDropdownOpen(false);
              }}
              className="px-4 py-3 w-full text-sm text-red-600 transition-all duration-200 cursor-pointer hover:bg-red-50"
            >
              탈퇴하기
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <nav className="sticky top-0 z-20 py-1 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center mr-2 ml-1 sm:ml-3 sm:mr-6">
          <div className={isAuthenticated ? 'ml-8 xl:ml-0' : ''}>
            <Logo className="scale-70 sm:scale-80" />
          </div>

          <div className="flex gap-1 items-center sm:gap-2">
            {isAuthenticated ? (
              <>
                <div className="flex gap-2 items-center">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex justify-center items-center w-8 h-8 text-white bg-blue-600 rounded-full transition-colors cursor-pointer hover:bg-blue-700"
                    >
                      <span className="text-sm font-medium">{userInitial}</span>
                    </button>
                    <UserProfile isOpen={isDropdownOpen} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition cursor-pointer sm:px-6 sm:text-base hover:bg-blue-700"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg transition cursor-pointer sm:px-6 sm:text-base hover:bg-blue-700"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 회원 탈퇴 확인 모달 */}
      <ConfirmModal
        isOpen={isSignoutModalOpen}
        title="UniSchedule 에서 탈퇴하시겠습니까?"
        message={
          '\n탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.\n팀 리더인 경우 팀이 삭제되며 복구할 수 없습니다.\n정말로 회원 탈퇴하시겠습니까?'
        }
        confirmText="탈퇴"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
        onConfirm={handleSignout}
        onClose={() => setIsSignoutModalOpen(false)}
      />
    </>
  );
};

export default Header;
