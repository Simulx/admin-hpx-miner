import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { toast } from 'sonner';

interface TwoFactorAuthProps {
  onVerificationSuccess: () => void;
  onLogout: () => void;
}

export function TwoFactorAuth({ onVerificationSuccess, onLogout }: TwoFactorAuthProps) {
  const { t } = useLanguage();
  const { completeTwoFactor } = useAdminAuth();
  const [pin, setPin] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pinError, setPinError] = useState('');
  const [otpError, setOtpError] = useState('');

  // PIN validation
  const validatePin = (pinValue: string): boolean => {
    if (pinValue.length < 8) {
      setPinError(t('pinTooShort'));
      return false;
    }
    
    const hasLetter = /[a-zA-Z]/.test(pinValue);
    const hasNumber = /\d/.test(pinValue);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pinValue);
    
    if (!hasLetter || !hasNumber || !hasSymbol) {
      setPinError(t('pinRequirements'));
      return false;
    }
    
    setPinError('');
    return true;
  };

  // OTP validation
  const validateOtp = (otpValue: string): boolean => {
    if (otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      setOtpError(t('otpInvalid'));
      return false;
    }
    
    setOtpError('');
    return true;
  };

  const handlePinChange = (value: string) => {
    setPin(value);
    if (pinError) {
      validatePin(value);
    }
  };

  const handleOtpChange = (value: string) => {
    // Only allow numbers and limit to 6 characters
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtpCode(numericValue);
    if (otpError) {
      validateOtp(numericValue);
    }
  };

  const handleVerification = async () => {
    const isPinValid = validatePin(pin);
    const isOtpValid = validateOtp(otpCode);

    if (!isPinValid || !isOtpValid) {
      return;
    }

    setIsVerifying(true);

    try {
      const result = await completeTwoFactor(pin, otpCode);
      
      if (result.success) {
        toast.success(tLocal('twoFactorSuccess'));
        onVerificationSuccess();
      } else {
        toast.error(result.error || tLocal('twoFactorError'));
      }
    } catch (error) {
      console.error('Erro na verificação 2FA:', error);
      toast.error(tLocal('twoFactorError'));
    } finally {
      setIsVerifying(false);
    }
  };

  const translations = {
    en: {
      twoFactorTitle: 'Two-Factor Authentication',
      twoFactorDescription: 'Complete the verification to access the admin panel',
      pinLabel: 'Security PIN',
      pinPlaceholder: 'Enter your security PIN',
      pinTooShort: 'PIN must be at least 8 characters',
      pinRequirements: 'PIN must contain letters, numbers and symbols',
      otpLabel: 'Google Authenticator Code',
      otpPlaceholder: '6-digit code',
      otpInvalid: 'Enter a valid 6-digit code',
      verifyAccess: 'Verify Access',
      verifying: 'Verifying...',
      backToLogin: 'Back to Login',
      twoFactorSuccess: 'Verification successful! Accessing admin panel...',
      twoFactorError: 'Verification failed. Please try again.',
      securityNotice: 'This access is monitored and logged for security purposes.',
      showPin: 'Show PIN',
      hidePin: 'Hide PIN'
    },
    es: {
      twoFactorTitle: 'Autenticación de Dos Factores',
      twoFactorDescription: 'Complete la verificación para acceder al panel de administración',
      pinLabel: 'PIN de Seguridad',
      pinPlaceholder: 'Ingrese su PIN de seguridad',
      pinTooShort: 'El PIN debe tener al menos 8 caracteres',
      pinRequirements: 'El PIN debe contener letras, números y símbolos',
      otpLabel: 'Código de Google Authenticator',
      otpPlaceholder: 'Código de 6 dígitos',
      otpInvalid: 'Ingrese un código válido de 6 dígitos',
      verifyAccess: 'Verificar Acceso',
      verifying: 'Verificando...',
      backToLogin: 'Volver al Login',
      twoFactorSuccess: '¡Verificación exitosa! Accediendo al panel de administración...',
      twoFactorError: 'Verificación fallida. Inténtelo nuevamente.',
      securityNotice: 'Este acceso es monitoreado y registrado por seguridad.',
      showPin: 'Mostrar PIN',
      hidePin: 'Ocultar PIN'
    },
    pt: {
      twoFactorTitle: 'Autenticação de Dois Fatores',
      twoFactorDescription: 'Complete a verificação para acessar o painel administrativo',
      pinLabel: 'PIN de Segurança',
      pinPlaceholder: 'Digite seu PIN de segurança',
      pinTooShort: 'O PIN deve ter pelo menos 8 caracteres',
      pinRequirements: 'O PIN deve conter letras, números e símbolos',
      otpLabel: 'Código do Google Authenticator',
      otpPlaceholder: 'Código de 6 dígitos',
      otpInvalid: 'Digite um código válido de 6 dígitos',
      verifyAccess: 'Verificar Acesso',
      verifying: 'Verificando...',
      backToLogin: 'Voltar ao Login',
      twoFactorSuccess: 'Verificação bem-sucedida! Acessando painel administrativo...',
      twoFactorError: 'Verificação falhou. Tente novamente.',
      securityNotice: 'Este acesso é monitorado e registrado por segurança.',
      showPin: 'Mostrar PIN',
      hidePin: 'Ocultar PIN'
    }
  };

  // Enhanced t function for this component
  const { language } = useLanguage();
  const tLocal = (key: string) => translations[language]?.[key] || translations.en[key] || key;

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative">
      {/* Background geometric shapes - matching the login page */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-2/3 h-full"
          style={{
            background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)",
            clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)"
          }}
        />
        
        <div 
          className="absolute top-20 right-20 w-32 h-32 opacity-20"
          style={{
            background: "linear-gradient(45deg, #2d2d2d 0%, rgba(45, 45, 45, 0.5) 100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)"
          }}
        />
        
        <div 
          className="absolute bottom-32 right-32 w-24 h-24 opacity-15"
          style={{
            background: "linear-gradient(225deg, #2d2d2d 0%, rgba(45, 45, 45, 0.3) 100%)",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md relative z-20">
          <Card className="bg-white shadow-2xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-[#2c3e50]">{tLocal('twoFactorTitle')}</CardTitle>
              <CardDescription className="text-[#7f8c8d]">
                {tLocal('twoFactorDescription')}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* PIN Input */}
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-[#2c3e50]">
                  {tLocal('pinLabel')}
                </Label>
                <div className="relative">
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    value={pin}
                    onChange={(e) => handlePinChange(e.target.value)}
                    placeholder={tLocal('pinPlaceholder')}
                    className="border border-gray-200 focus:border-[#2d2d2d] focus:ring-[#2d2d2d] bg-[#f8f9fa] h-12 px-4 pr-12"
                    disabled={isVerifying}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPin ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {pinError && (
                  <p className="text-red-500 text-sm">{pinError}</p>
                )}
              </div>

              {/* OTP Input */}
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-[#2c3e50]">
                  {tLocal('otpLabel')}
                </Label>
                <div className="relative">
                  <Input
                    id="otp"
                    type="text"
                    value={otpCode}
                    onChange={(e) => handleOtpChange(e.target.value)}
                    placeholder={tLocal('otpPlaceholder')}
                    className="border border-gray-200 focus:border-[#2d2d2d] focus:ring-[#2d2d2d] bg-[#f8f9fa] h-12 px-4 pr-12 text-center text-lg tracking-wider"
                    maxLength={6}
                    disabled={isVerifying}
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {otpError && (
                  <p className="text-red-500 text-sm">{otpError}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleVerification}
                  disabled={isVerifying || !pin || !otpCode}
                  className="w-full bg-[#2d2d2d] hover:bg-[#1a1a1a] text-white h-12"
                >
                  {isVerifying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {tLocal('verifying')}
                    </>
                  ) : (
                    tLocal('verifyAccess')
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={onLogout}
                  disabled={isVerifying}
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 h-12"
                >
                  {tLocal('backToLogin')}
                </Button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
                <p className="text-xs text-gray-700 text-center leading-relaxed">
                  {tLocal('securityNotice')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}