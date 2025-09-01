import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 py-1 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center mx-auto max-w-6xl">
        <div>
          <Logo className="scale-80" />
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
