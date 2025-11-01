import Logo from '@/components/atoms/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useRef, useEffect } from 'react';
import { RouterPath } from '@/routes/path';
import { authAPI } from '@/apis';
import ConfirmModal from '@/components/atoms/ConfirmModal';
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
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {/* 사용자 정보 헤더 */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
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
              className="w-full py-3 px-4 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
            >
              로그아웃
            </button>
            <div className="border-b border-gray-100" />
            <button
              onClick={() => {
                setIsSignoutModalOpen(true);
                setIsDropdownOpen(false);
              }}
              className="w-full py-3 px-4 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
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
      <nav className="sticky top-0 z-50 py-1 bg-white border-b border-gray-200">
        <div className="flex justify-between items-center ml-1 mr-2 sm:ml-3 sm:mr-6">
          <div>
            <Logo className="scale-75 sm:scale-80" />
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
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
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="px-3 sm:px-6 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
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
        title="회원 탈퇴"
        message={
          '탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.\n팀 리더인 경우 팀이 삭제되며 복구할 수 없습니다.\n\n정말로 회원 탈퇴하시겠습니까?'
        }
        confirmText="탈퇴하기"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
        onConfirm={handleSignout}
        onClose={() => setIsSignoutModalOpen(false)}
      />
    </>
  );
};

export default Header;
