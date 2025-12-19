import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminAuthAPI, setAuthToken, removeAuthToken, getToken } from '../lib/adminApi';

interface Admin {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = getToken();
    if (token) {
      loadAdmin();
    } else {
      setLoading(false);
    }
  }, []);

  const loadAdmin = async () => {
    try {
      const response = await adminAuthAPI.getMe();
      setAdmin(response.admin);
    } catch (error) {
      console.error('Failed to load admin:', error);
      removeAuthToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    const response = await adminAuthAPI.login(username, password);
    setAdmin(response.admin);
    setAuthToken(response.token);
  };

  const logout = () => {
    adminAuthAPI.logout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

