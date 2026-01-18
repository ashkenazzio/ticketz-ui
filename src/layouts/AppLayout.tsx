import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

export default function AppLayout() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans flex flex-col">
      <AppHeader />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
