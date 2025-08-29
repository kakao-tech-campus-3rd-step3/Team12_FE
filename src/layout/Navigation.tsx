import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 py-4 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center px-8 mx-auto max-w-6xl">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 transition-colors hover:text-blue-600"
        >
          Team12
        </Link>

        <ul className="flex items-center justify-between gap-8 w-[50%]">
          <li>
            <Link
              to="/"
              className={`px-4 py-2 font-medium rounded-md transition-all duration-200 ${
                isActive('/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              홈
            </Link>
          </li>
          <li>
            <Link
              to="/theme"
              className={`px-4 py-2 font-medium rounded-md transition-all duration-200 ${
                isActive('/theme')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              테마
            </Link>
          </li>
          <li>
            <Link
              to="/order"
              className={`px-4 py-2 font-medium rounded-md transition-all duration-200 ${
                isActive('/order')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              주문
            </Link>
          </li>
          <li>
            <Link
              to="/mypage"
              className={`px-4 py-2 font-medium rounded-md transition-all duration-200 ${
                isActive('/mypage')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              마이페이지
            </Link>
          </li>
        </ul>

        <div className="flex items-center">
          <Link
            to="/login"
            className="px-6 py-2 font-medium text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
          >
            로그인
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
