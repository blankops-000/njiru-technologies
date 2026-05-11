"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { setAccessToken } from './api/client';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for basic user info to hydrate state quickly
    // Note: The actual access token is stored in memory, not localStorage for security.
    // If the page refreshes, we might need to rely on the interceptor to fetch a new one,
    // or we can just proactively fetch one on mount if we have a user in localStorage.
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // We do not have the access token in memory anymore. 
        // We can just wait for the first API call to fail with 401 and let the interceptor refresh it,
        // or we can proactively fetch it here. We'll rely on interceptor for now.
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }

    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  const login = (token: string, userData: User) => {
    setAccessToken(token);
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
    router.push('/admin');
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('auth_user');
    // Also hit the backend to clear the cookie
    fetch('/api/v1/auth/refresh', { method: 'DELETE' }).catch(() => {});
    router.push('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
