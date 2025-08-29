import { createBrowserRouter, Link } from 'react-router-dom'
import RootLayout from '../layout/RootLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Team12</h1>
          <p className="text-lg text-gray-600">테일윈드 CSS가 성공적으로 설정되었습니다!</p>
        </div>,
      },
      {
        path: '',
        element: <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">DetailPage</h2>
          <p className="text-gray-600">상세 페이지입니다.</p>
        </div>,
      },
      {
        path: 'login',
        element: <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">로그인</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
              <input type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              로그인
            </button>
          </form>
        </div>,
      },
      {
        path: 'mypage',
        element: <div className="max-w-4xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">마이페이지</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-500">👤</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">사용자 이름</h3>
                <p className="text-gray-600">user@example.com</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">주문 내역</h4>
                <p className="text-gray-600">총 5건의 주문</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-2">포인트</h4>
                <p className="text-gray-600">1,250점</p>
              </div>
            </div>
          </div>
        </div>,
      },
      {
        path: 'order',
        element: <div className="max-w-4xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">주문 페이지</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
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
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-800">총 금액</span>
                <span className="text-2xl font-bold text-blue-600">₩15,000</span>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
                주문하기
              </button>
            </div>
          </div>
        </div>,
      },
      {
        path: 'theme',
        element: <div className="max-w-6xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">테마 페이지</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">모던 테마</h3>
                <p className="text-gray-600 mb-4">깔끔하고 현대적인 디자인</p>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  적용하기
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">자연 테마</h3>
                <p className="text-gray-600 mb-4">자연스럽고 편안한 느낌</p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                  적용하기
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-pink-400 to-red-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">파워풀 테마</h3>
                <p className="text-gray-600 mb-4">강렬하고 활기찬 느낌</p>
                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                  적용하기
                </button>
              </div>
            </div>
          </div>
        </div>,
      },
      {
        path: '*',
        element: <div className="text-center py-20">
          <h2 className="text-6xl font-bold text-gray-300 mb-4">404</h2>
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">페이지를 찾을 수 없습니다</h3>
          <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            홈으로 돌아가기
          </Link>
        </div>,
      },
    ],
  },
])
