import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface User {
  id: string;
  firstName: string;
  username: string;
  email: string;
  phone?: string;
  selectedCountry?: string;
  sponsoredBy?: string | null;
  registeredAt: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkEmail: (email: string) => Promise<boolean>;
  checkUsername: (username: string) => Promise<boolean>;
  validateSponsor: (sponsorCode: string) => Promise<{ valid: boolean; sponsorExists: boolean }>;
}

interface RegisterData {
  firstName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  sponsoredBy?: string;
  selectedCountry: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-3890ddc3`;

  useEffect(() => {
    // Check for existing session on app load
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      setAccessToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  const checkEmail = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${baseUrl}/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      return data.exists || false;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  };

  const checkUsername = async (username: string): Promise<boolean> => {
    try {
      const response = await fetch(`${baseUrl}/check-username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ username })
      });

      const data = await response.json();
      return data.exists || false;
    } catch (error) {
      console.error('Erro ao verificar username:', error);
      return false;
    }
  };

  const validateSponsor = async (sponsorCode: string): Promise<{ valid: boolean; sponsorExists: boolean }> => {
    try {
      const response = await fetch(`${baseUrl}/validate-sponsor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ sponsorCode })
      });

      const data = await response.json();
      return { valid: data.valid || false, sponsorExists: data.sponsorExists || false };
    } catch (error) {
      console.error('Erro ao validar código de indicação:', error);
      return { valid: false, sponsorExists: false };
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Automatically log in the user after successful registration
        const loginResult = await login(userData.email, userData.password);
        return loginResult;
      } else {
        return { success: false, error: data.error || 'Erro ao criar conta' };
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      return { success: false, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAccessToken(data.access_token);
        setUser(data.user);
        
        // Store in localStorage for persistence
        localStorage.setItem('auth_token', data.access_token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Erro ao fazer login' };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const value: AuthContextType = {
    user,
    accessToken,
    isLoading,
    login,
    register,
    logout,
    checkEmail,
    checkUsername,
    validateSponsor
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}