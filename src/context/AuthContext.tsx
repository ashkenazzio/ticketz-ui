import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  isAuthenticated: boolean; // Alias for isLoggedIn
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

const mockUser = {
  name: 'Alex Rivera',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
};

const STORAGE_KEY = 'ticketz_logged_in';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage on init, default to false (logged out)
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'true';
  });

  const user = isLoggedIn ? mockUser : null;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isLoggedIn));
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAuthenticated: isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
