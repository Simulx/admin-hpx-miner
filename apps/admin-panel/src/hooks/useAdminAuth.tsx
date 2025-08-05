import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { supabase } from "../utils/supabaseClient"; // Import the client
import { User } from "../services/userService"; // Import User type

// Use the User interface from userService, it's more complete
// We can rename it to AdminUser if needed for clarity in this context
type AdminUser = User;

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
      const { data, error } = await supabase.functions.invoke('admin-login', {
        body: { email, password },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        return { success: false, error: data.error };
      }

      // On successful function invocation, get user details from the database
      const { data: userProfile, error: profileError } = await supabase
        .from('User')
        .select('*')
        .eq('id', data.userId)
        .single();

      if (profileError) {
        throw new Error(profileError.message);
      }

      // Store temporary credentials and require 2FA
      setTempCredentials({ email, password });
      setRequiresTwoFactor(true);

      // Store partial session
      localStorage.setItem('admin_user', JSON.stringify(userProfile));
      localStorage.setItem('admin_two_factor_completed', 'false');

      return { success: true };

    } catch (error: any) {
      console.error('Erro no login admin:', error);
      return { success: false, error: error.message || 'Erro de conexão. Tente novamente.' };
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