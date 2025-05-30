"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from './Header';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    // Skip auth checks for not-found page
    if (pathname === '/not-found') {
      return;
    }

    // Check if the current route is protected
    const isProtectedRoute = pathname.startsWith('/my-series');
    const isAuthRoute = pathname === '/login' || pathname === '/register';

    if (isProtectedRoute && !isLoggedIn) {
      // Redirect to login if trying to access protected route while not authenticated
      router.push('/login');
    } else if (isAuthRoute && isLoggedIn) {
      // Redirect to home if trying to access auth routes while authenticated
      router.push('/');
    }
  }, [pathname, router, isLoggedIn]);

  // Don't show header for not-found page
  if (pathname === '/not-found') {
    return (
      <div className="min-h-screen bg-black">
        <main className="container mx-auto px-4 py-4">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  );
};

export default Layout; 