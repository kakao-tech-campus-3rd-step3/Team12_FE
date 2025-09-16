import Header from '@/components/molecules/Header/Header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
