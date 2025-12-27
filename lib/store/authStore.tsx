import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserRole } from '@/types';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    role: UserRole;
    name: string;
  } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: async (email: string, password: string) => {
        // Mock authentication - in production, this would call an API
        if (email === 'admin@carplatform.com' && password === 'admin123') {
          const mockUser = {
            email: 'admin@carplatform.com',
            role: 'super_admin' as UserRole,
            name: 'Admin User',
          };
          const mockToken = 'mock_token_' + Date.now();

          set({
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
          });

          return true;
        }
        return false;
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);