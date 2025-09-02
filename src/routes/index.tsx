import Test from '@/components/Test';
import RootLayout from '@/layout/RootLayout';
import Calendar from '@/pages/Calendar/Calendar';
import FullCalendar from '@/pages/Calendar/FullCalendar';
import Login from '@/pages/Login/Login';
import Signup from '@/pages/Signup/Signup';
import { createBrowserRouter, Link } from 'react-router-dom';
import { RouterPath } from './path';

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
        path: RouterPath.CALENDAR.slice(1), // 'calendar'
        children: [
          {
            index: true,
            element: <Calendar />,
          },
          {
            path: ':view/:date',
            element: <Calendar />,
          },
        ],
      },
      {
        path: RouterPath.LOGIN.slice(1), // 'login'
        element: <Login />,
      },
      {
        path: RouterPath.SIGNUP,
        element: <Signup />,
      },
      {
        path: RouterPath.TEAM.slice(1), // 'team'
        element: (
          <div className="p-6 mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">팀 페이지</h2>
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
        path: RouterPath.MEMBERS.slice(1), // 'members'
        element: (
          <div className="p-6 mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">팀원 가용 페이지</h2>
            <div className="p-6 bg-white rounded-lg shadow-md">
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
        path: RouterPath.FULL_CALENDAR.slice(1), // 'full-calendar'
        element: <FullCalendar />,
      },
      {
        path: '*',
        element: (
          <div className="py-20 text-center">
            <h2 className="mb-4 text-6xl font-bold text-gray-300">404</h2>
            <h3 className="mb-4 text-2xl font-semibold text-gray-600">페이지를 찾을 수 없습니다</h3>
            <p className="mb-8 text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
            <Link
              to={RouterPath.HOME} // '/'
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
