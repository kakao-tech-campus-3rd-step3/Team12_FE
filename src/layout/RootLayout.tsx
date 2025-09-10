import Header from '@/components/common/Header/Header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
