import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role: 'admin';
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  requiresTwoFactor: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  completeTwoFactor: (pin: string, otpCode: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [tempCredentials, setTempCredentials] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    // Check for existing admin session on app load
    const storedAdminUser = localStorage.getItem('admin_user');
    const storedTwoFactorStatus = localStorage.getItem('admin_two_factor_completed');
    
    if (storedAdminUser && storedTwoFactorStatus === 'true') {
      setUser(JSON.parse(storedAdminUser));
      setRequiresTwoFactor(false);
    } else if (storedAdminUser && storedTwoFactorStatus === 'false') {
      setRequiresTwoFactor(true);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate admin login validation
      // In real implementation, this would check against admin database
      
      // Normalize email for comparison (trim and lowercase)
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();
      
      console.log('Tentativa de login:', { email: normalizedEmail, password: normalizedPassword });
      
      // Accept multiple admin credential variations
      const validCredentials = [
        { email: 'admin@hpxminer.com', password: 'Admin123!' },
        { email: 'administrator@hpxminer.com', password: 'Admin123!' },
        { email: 'admin@hpx.com', password: 'Admin123!' }
      ];
      
      const isValidCredential = validCredentials.some(cred => 
        cred.email === normalizedEmail && cred.password === normalizedPassword
      );
      
      if (isValidCredential) {
        const adminUser: AdminUser = {
          id: 'admin-1',
          email: normalizedEmail,
          name: 'HPX Administrator',
          role: 'admin'
        };

        // Store temporary credentials and require 2FA
        setTempCredentials({ email: normalizedEmail, password: normalizedPassword });
        setRequiresTwoFactor(true);
        
        // Store partial session
        localStorage.setItem('admin_user', JSON.stringify(adminUser));
        localStorage.setItem('admin_two_factor_completed', 'false');
        
        console.log('Login bem-sucedido, requerendo 2FA');
        return { success: true };
      } else {
        console.log('Credenciais inválidas');
        return { success: false, error: 'Credenciais de administrador inválidas. Verifique email e senha.' };
      }
    } catch (error) {
      console.error('Erro no login admin:', error);
      return { success: false, error: 'Erro de conexão. Tente novamente.' };
    }
  };

  const completeTwoFactor = async (pin: string, otpCode: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate 2FA validation
      // In real implementation, this would validate PIN and OTP against actual systems
      
      console.log('Tentativa 2FA:', { pin: pin.length, otp: otpCode.length });
      
      // PIN validation: must be at least 8 characters with letters, numbers, and symbols
      const hasLetter = /[a-zA-Z]/.test(pin);
      const hasNumber = /\d/.test(pin);
      const hasSymbol = /[^a-zA-Z0-9]/.test(pin);
      const isPinValid = pin.length >= 8 && hasLetter && hasNumber && hasSymbol;
      
      // OTP validation: must be exactly 6 digits
      const isOtpValid = otpCode.length === 6 && /^\d{6}$/.test(otpCode);
      
      if (isPinValid && isOtpValid) {
        const storedAdminUser = localStorage.getItem('admin_user');
        
        if (storedAdminUser) {
          const adminUser = JSON.parse(storedAdminUser);
          setUser(adminUser);
          setRequiresTwoFactor(false);
          setTempCredentials(null);
          
          // Complete the session
          localStorage.setItem('admin_two_factor_completed', 'true');
          
          console.log('2FA bem-sucedido');
          return { success: true };
        }
      }
      
      let errorMessage = 'Erro na verificação: ';
      if (!isPinValid) {
        errorMessage += 'PIN deve ter 8+ caracteres com letras, números e símbolos. ';
      }
      if (!isOtpValid) {
        errorMessage += 'OTP deve ter exatamente 6 dígitos.';
      }
      
      console.log('2FA falhou:', errorMessage);
      return { success: false, error: errorMessage };
    } catch (error) {
      console.error('Erro na verificação 2FA:', error);
      return { success: false, error: 'Erro de verificação. Tente novamente.' };
    }
  };

  const logout = () => {
    setUser(null);
    setRequiresTwoFactor(false);
    setTempCredentials(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_two_factor_completed');
  };

  const value: AdminAuthContextType = {
    user,
    isLoading,
    requiresTwoFactor,
    login,
    completeTwoFactor,
    logout
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth deve ser usado dentro de um AdminAuthProvider');
  }
  return context;
}