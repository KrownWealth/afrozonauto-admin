'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { Preloader } from '@/components/layout/Preloader';

export default function RootPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated && user) {
        if (user.role === 'super_admin') {
          router.push('/admin/dashboard');
        } else if (user.role === 'operations_admin') {
          router.push('/operations/dashboard');
        } else {
          useAuthStore.getState().logout();
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  return <Preloader message="Loading hang tight..." variant="default" />;
}