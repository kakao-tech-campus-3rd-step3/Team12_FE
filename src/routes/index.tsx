import Test from '@/components/Test';
import RootLayout from '@/layout/RootLayout';
import Login from '@/pages/Login/Login';
import { createBrowserRouter, Link } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800">Welcome to Team12</h1>
            <Test />
          </div>
        ),
      },
      {
        path: '',
        element: (
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">DetailPage</h2>
            <p className="text-gray-600">상세 페이지입니다.</p>
          </div>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'mypage',
        element: (
          <div className="p-6 mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">마이페이지</h2>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-6 space-x-4">
                <div className="flex justify-center items-center w-20 h-20 bg-gray-200 rounded-full">
                  <span className="text-2xl text-gray-500">👤</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">사용자 이름</h3>
                  <p className="text-gray-600">user@example.com</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="mb-2 font-medium text-gray-800">주문 내역</h4>
                  <p className="text-gray-600">총 5건의 주문</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="mb-2 font-medium text-gray-800">포인트</h4>
                  <p className="text-gray-600">1,250점</p>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: 'order',
        element: (
          <div className="p-6 mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">주문 페이지</h2>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div>
                      <h4 className="font-medium text-gray-800">상품명</h4>
                      <p className="text-gray-600">상품 설명</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">₩15,000</p>
                    <p className="text-sm text-gray-600">수량: 1</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">총 금액</span>
                  <span className="text-2xl font-bold text-blue-600">₩15,000</span>
                </div>
                <button className="px-4 py-3 mt-4 w-full text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700">
                  주문하기
                </button>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: 'theme',
        element: (
          <div className="p-6 mx-auto max-w-6xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">테마 페이지</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="overflow-hidden bg-white rounded-lg shadow-md">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">모던 테마</h3>
                  <p className="mb-4 text-gray-600">깔끔하고 현대적인 디자인</p>
                  <button className="px-4 py-2 w-full text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700">
                    적용하기
                  </button>
                </div>
              </div>
              <div className="overflow-hidden bg-white rounded-lg shadow-md">
                <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">자연 테마</h3>
                  <p className="mb-4 text-gray-600">자연스럽고 편안한 느낌</p>
                  <button className="px-4 py-2 w-full text-white bg-green-600 rounded-md transition-colors hover:bg-green-700">
                    적용하기
                  </button>
                </div>
              </div>
              <div className="overflow-hidden bg-white rounded-lg shadow-md">
                <div className="h-48 bg-gradient-to-br from-pink-400 to-red-500"></div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-gray-800">파워풀 테마</h3>
                  <p className="mb-4 text-gray-600">강렬하고 활기찬 느낌</p>
                  <button className="px-4 py-2 w-full text-white bg-red-600 rounded-md transition-colors hover:bg-red-700">
                    적용하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        path: '*',
        element: (
          <div className="py-20 text-center">
            <h2 className="mb-4 text-6xl font-bold text-gray-300">404</h2>
            <h3 className="mb-4 text-2xl font-semibold text-gray-600">페이지를 찾을 수 없습니다</h3>
            <p className="mb-8 text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
            >
              홈으로 돌아가기
            </Link>
          </div>
        ),
      },
    ],
  },
]);
