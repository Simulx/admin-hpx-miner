import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { EyeIcon, EyeOffIcon, Zap, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { InternationalPhoneInput } from "./InternationalPhoneInput";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner@2.0.3";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { t } = useLanguage();
  const { register, checkEmail, checkUsername, validateSponsor } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    sponsoredBy: "",
    acceptTerms: false
  });

  const [selectedCountry, setSelectedCountry] = useState("BR");
  const [validationState, setValidationState] = useState({
    email: { isValid: null as boolean | null, isChecking: false },
    username: { isValid: null as boolean | null, isChecking: false },
    sponsor: { isValid: null as boolean | null, isChecking: false },
    password: { isValid: null as boolean | null },
    confirmPassword: { isValid: null as boolean | null }
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Debounced validation functions
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.email && formData.email.includes('@')) {
        setValidationState(prev => ({ ...prev, email: { isValid: null, isChecking: true } }));
        const exists = await checkEmail(formData.email);
        setValidationState(prev => ({ ...prev, email: { isValid: !exists, isChecking: false } }));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.email, checkEmail]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.username && formData.username.length >= 3) {
        setValidationState(prev => ({ ...prev, username: { isValid: null, isChecking: true } }));
        const exists = await checkUsername(formData.username);
        setValidationState(prev => ({ ...prev, username: { isValid: !exists, isChecking: false } }));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.username, checkUsername]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (formData.sponsoredBy && formData.sponsoredBy.length >= 3) {
        setValidationState(prev => ({ ...prev, sponsor: { isValid: null, isChecking: true } }));
        const result = await validateSponsor(formData.sponsoredBy);
        setValidationState(prev => ({ ...prev, sponsor: { isValid: result.sponsorExists, isChecking: false } }));
      } else if (formData.sponsoredBy === "") {
        setValidationState(prev => ({ ...prev, sponsor: { isValid: null, isChecking: false } }));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.sponsoredBy, validateSponsor]);

  // Password validation
  useEffect(() => {
    if (formData.password) {
      const isValid = formData.password.length >= 6;
      setValidationState(prev => ({ ...prev, password: { isValid, isChecking: false } }));
    } else {
      setValidationState(prev => ({ ...prev, password: { isValid: null, isChecking: false } }));
    }
  }, [formData.password]);

  // Confirm password validation
  useEffect(() => {
    if (formData.confirmPassword) {
      const isValid = formData.password === formData.confirmPassword;
      setValidationState(prev => ({ ...prev, confirmPassword: { isValid, isChecking: false } }));
    } else {
      setValidationState(prev => ({ ...prev, confirmPassword: { isValid: null, isChecking: false } }));
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValidationErrors([]);
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.firstName) errors.push(t('firstNameRequired') || 'Nome completo é obrigatório');
    if (!formData.username) errors.push(t('usernameRequired') || 'Nome de usuário é obrigatório');
    if (!formData.email) errors.push(t('emailRequired') || 'Email é obrigatório');
    if (!formData.phone) errors.push(t('phoneRequired') || 'Telefone é obrigatório');
    if (!formData.password) errors.push(t('passwordRequired') || 'Senha é obrigatória');
    if (!formData.confirmPassword) errors.push(t('confirmPasswordRequired') || 'Confirmação de senha é obrigatória');
    if (!formData.acceptTerms) errors.push(t('acceptTermsError') || 'Você deve aceitar os termos e condições');

    if (formData.password !== formData.confirmPassword) {
      errors.push(t('passwordsDontMatch') || 'As senhas não coincidem');
    }

    if (formData.password && formData.password.length < 6) {
      errors.push(t('passwordTooShort') || 'A senha deve ter pelo menos 6 caracteres');
    }

    if (validationState.email.isValid === false) {
      errors.push(t('emailAlreadyExists') || 'Este email já está em uso');
    }

    if (validationState.username.isValid === false) {
      errors.push(t('usernameAlreadyExists') || 'Este nome de usuário já está em uso');
    }

    if (formData.sponsoredBy && validationState.sponsor.isValid === false) {
      errors.push(t('invalidSponsorCode') || 'Código de indicação inválido');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const registerData = {
        firstName: formData.firstName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        sponsoredBy: formData.sponsoredBy || undefined,
        selectedCountry
      };

      const result = await register(registerData);

      if (result.success) {
        toast.success(t('accountCreatedSuccess') || 'Conta criada com sucesso!');
        // The user will be automatically logged in by the register function
      } else {
        toast.error(result.error || t('registrationError') || 'Erro ao criar conta');
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      toast.error(t('connectionError') || 'Erro de conexão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getValidationIcon = (field: keyof typeof validationState) => {
    const state = validationState[field];
    if (state.isChecking) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
    if (state.isValid === true) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (state.isValid === false) return <XCircle className="w-4 h-4 text-red-500" />;
    return null;
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg border-0">
      <CardHeader className="space-y-1 text-center pb-6">
        <div className="flex items-center justify-center mb-6">
          {/* Logo Section - Orange Background */}
          <div className="bg-gradient-to-b from-[#ff9b33] via-[#ff6a00] to-[#fa5500] p-4 border-b border-[#fa5500]/20 rounded-[20px]">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="transition-opacity duration-300">
                <h1 className="text-xl font-bold text-white">HPX MINER</h1>
                <p className="text-sm text-orange-100">High Performance eXtraction</p>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-[#2c3e50]">{t('createAccount')}</h2>
        <p className="text-[#7f8c8d]">{t('joinToday')}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Complete Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-[#2c3e50]">{t('completeName')}</Label>
            <Input
              id="firstName"
              type="text"
              placeholder={t('completeNamePlaceholder')}
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa]"
              required
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[#2c3e50]">{t('user')}</Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder={t('chooseUsername')}
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa] w-1/2 pr-10"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('username')}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#2c3e50]">{t('email')}</Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder={t('enterEmail')}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa] pr-10"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('email')}
              </div>
            </div>
          </div>

          {/* Phone */}
          <InternationalPhoneInput
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            countryValue={selectedCountry}
            onCountryChange={(countryCode) => setSelectedCountry(countryCode)}
            required
          />

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#2c3e50]">{t('password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t('createPassword')}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa] pr-16"
                required
              />
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('password')}
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7f8c8d] hover:text-[#2c3e50] transition-colors"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-[#2c3e50]">{t('confirmPassword')}</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t('confirmPasswordPlaceholder')}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa] pr-16"
                required
              />
              <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('confirmPassword')}
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7f8c8d] hover:text-[#2c3e50] transition-colors"
              >
                {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          {/* Sponsored By */}
          <div className="space-y-2">
            <Label htmlFor="sponsoredBy" className="text-[#2c3e50]">{t('sponsoredBy')}</Label>
            <div className="relative">
              <Input
                id="sponsoredBy"
                type="text"
                placeholder={t('sponsorCode')}
                value={formData.sponsoredBy}
                onChange={(e) => handleInputChange("sponsoredBy", e.target.value)}
                className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa] pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {getValidationIcon('sponsor')}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
              className="border-[#ff9b33] data-[state=checked]:bg-[#ff9b33] data-[state=checked]:border-[#ff9b33] mt-0.5 flex-shrink-0"
            />
            <Label htmlFor="terms" className="text-sm text-[#7f8c8d] leading-relaxed">
              <span className="inline-block">
                {t('agreeTerms')}{" "}
                <a href="#" className="text-[#ff9b33] hover:text-[#fa5500] transition-colors">
                  {t('termsConditions')}
                </a>{" "}
                {t('and')}{" "}
                <a href="#" className="text-[#ff9b33] hover:text-[#fa5500] transition-colors">
                  {t('privacyPolicy')}
                </a>
              </span>
            </Label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#ff9b33] to-[#ff6a00] hover:from-[#fa5500] hover:to-[#ff9b33] text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('creating') || 'Criando...'}
              </div>
            ) : (
              t('createAccount')
            )}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-[#7f8c8d]">
            {t('alreadyHaveAccount')}{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-[#ff9b33] hover:text-[#fa5500] transition-colors font-medium"
            >
              {t('signIn')}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}