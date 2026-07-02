import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TheaterNavbar } from './TheaterNavbar';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <TheaterNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
