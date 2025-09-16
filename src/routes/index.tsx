import RootLayout from '@/layout/RootLayout';
import Login from '@/pages/Login/Login';
import PersonalCalendarPage from '@/pages/PersonalCalendar/PersonalCalendar';
import Signup from '@/pages/Signup/Signup';
import TeamCalendarPage from '@/pages/TeamCalendar/TeamCalendar';
import { createBrowserRouter, Link } from 'react-router-dom';
import { RouterPath } from './path';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <PersonalCalendarPage />,
      },
      {
        path: RouterPath.TEAM_CALENDAR.DEFAULT,
        element: <TeamCalendarPage />,
      },
      {
        path: RouterPath.TEAM_CALENDAR.VIEW,
        element: <TeamCalendarPage />,
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
        path: '*',
        element: (
          <div className="py-20 text-center">
            <h2 className="mb-4 text-6xl font-bold text-gray-300">404</h2>
            <h3 className="mb-4 text-2xl font-semibold text-gray-600">페이지를 찾을 수 없습니다</h3>
            <p className="mb-8 text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
            <Link
              to={RouterPath.HOME.DEFAULT} // '/'
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
