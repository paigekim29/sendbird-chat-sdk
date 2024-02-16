'use client';

import { usePathname, useRouter } from 'next/navigation';
import { NavBar, SafeArea } from 'antd-mobile';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

function PageLayout({ title, children }: PageLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className={pathname !== '/' ? 'max-w-xl mx-auto my-0 border-b border-solid border--adm-border-color' : ''}>
          <NavBar {...(pathname === '/' && { back: null })} onBack={() => router.back()} className="font-semibold">
            {title}
          </NavBar>
        </div>
      </nav>
      <div className="max-w-xl flex mt-11 mx-auto">
        <div className="w-screen">{children}</div>
      </div>
      <SafeArea position="bottom" />
    </>
  );
}

export default PageLayout;
