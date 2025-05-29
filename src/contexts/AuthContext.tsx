'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isAuthenticated } from '@/lib/services/authService';

interface AuthContextType {
  isLoggedIn: boolean;
  updateAuthState: (loggedIn: boolean, username: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check initial auth state
    const checkAuth = () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);
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
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, updateAuthState }}>
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