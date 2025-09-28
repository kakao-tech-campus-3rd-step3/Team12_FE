import Logo from '@/components/atoms/Logo';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useRef } from 'react';

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 사용자 성 추출 함수
  const getUserInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  // 사용자 정보 조회
  const handleGetUserInfo = async () => {
    if (!isAuthenticated) return;
  };

  // 드롭다운 -> 사용자 정보 조회
  const handleDropdownToggle = () => {
    if (!isDropdownOpen && isAuthenticated) {
      handleGetUserInfo();
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <nav className="sticky top-0 z-50 py-1 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center ml-1 mr-2 sm:ml-3 sm:mr-6">
        <div>
          <Logo className="scale-75 sm:scale-80" />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-medium text-gray-700">
                  {user?.name || '사용자'}
                </span>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={handleDropdownToggle}
                    className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium">
                      {getUserInitial(user?.name || '사용자')}
                    </span>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* 사용자 정보 헤더 */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {getUserInitial(user?.name || '사용자')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user?.name || '사용자'}
                            </p>
                            <p className="text-xs text-gray-500">{user?.email || '이메일 없음'}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full py-2 text-sm text-red-600 hover:bg-red-50 hover:rounded transition"
                      >
                        로그아웃
                      </button>
                    </div>
                  )}
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
  );
};

export default Navigation;
