import { Outlet } from 'react-router-dom';
import Navigation from '@/layout/Navigation';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
