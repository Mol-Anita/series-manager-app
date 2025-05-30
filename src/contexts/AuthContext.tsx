'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isAuthenticated, get2FAStatus } from '@/lib/services/authService';

interface AuthContextType {
  isLoggedIn: boolean;
  isTwoFactorEnabled: boolean | null;
  updateAuthState: (loggedIn: boolean, username: string | null) => void;
  update2FAStatus: (enabled: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        try {
          const status = await get2FAStatus();
          setIsTwoFactorEnabled(status);
        } catch (error) {
          console.error('Failed to fetch 2FA status:', error);
          setIsTwoFactorEnabled(null);
        }
      }
    };

    checkAuth();
  }, []);

  const updateAuthState = (loggedIn: boolean, username: string | null) => {
    setIsLoggedIn(loggedIn);
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
    
    if (!loggedIn) {
      setIsTwoFactorEnabled(null);
    }
  };

  const update2FAStatus = (enabled: boolean) => {
    setIsTwoFactorEnabled(enabled);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isTwoFactorEnabled, updateAuthState, update2FAStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 