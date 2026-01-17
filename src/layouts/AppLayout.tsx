import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="bg-dark min-h-screen text-white font-sans flex flex-col">
      <AppHeader title={title} />

      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      <AppFooter />
    </div>
  );
}
