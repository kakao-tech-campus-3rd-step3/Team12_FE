import Logo from '@/components/atoms/Logo';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 py-1  bg-white border-b border-gray-200">
      <div className="flex justify-between items-center ml-1 mr-2 sm:ml-3 sm:mr-6">
        <div>
          <Logo className="scale-75 sm:scale-80" />
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
