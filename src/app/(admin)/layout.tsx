"use client";

import { useAuth } from '@/lib/auth';
import { Sidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Note: server-side middleware also protects these routes, but this is a client-side fallback
    if (!isAuthenticated) {
      // Allow login page to render without redirecting to itself continuously. 
      // Actually, /admin/login should probably not be inside this layout if it has a sidebar.
      // We will handle /admin/login at src/app/(admin)/admin/login/page.tsx, but wait.
      // If (admin)/layout applies to /admin/login, we might have the sidebar show up on the login page!
      // I need to structure /admin/login differently, or conditionally hide the sidebar.
    }
  }, [isAuthenticated]);

  if (!mounted) return null;

  // Hacky check for login page to skip layout. Better approach is putting login outside the group.
  const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
