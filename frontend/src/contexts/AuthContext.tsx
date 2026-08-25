import { createContext, useContext, useState, type ReactNode } from 'react';
import { type User, type UserRole } from '../types';
import { mockCurrentUser } from '../utils/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void; // DEV ONLY — for testing different views
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockCurrentUser);

  const login = (_email: string, _password: string) => {
    // Stubbed — will wire to real API in Phase 5
    setUser(mockCurrentUser);
  };

  const register = (_name: string, _email: string, _password: string) => {
    setUser(mockCurrentUser);
  };

  const logout = () => setUser(null);

  // Temporary helper so we can preview Owner/Admin pages
  const switchRole = (role: UserRole) => {
    if (!user) return;
    setUser({ ...user, role });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
