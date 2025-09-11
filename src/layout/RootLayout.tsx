import Navigation from '@/components/common/Header/Header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
