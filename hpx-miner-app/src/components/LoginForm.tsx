import { useState } from "react";
import { Button } from "../dashboard/components/ui/button";
import { Input } from "../dashboard/components/ui/input";
import { Label } from "../dashboard/components/ui/label";
import { Card, CardContent, CardHeader } from "../dashboard/components/ui/card";
import { EyeIcon, EyeOffIcon, Zap, Loader2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner@2.0.3";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(t('fillAllFields') || 'Preencha todos os campos');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success(t('loginSuccess') || 'Login realizado com sucesso!');
        // The user will be automatically redirected by the App component
      } else {
        toast.error(result.error || t('loginError') || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error(t('connectionError') || 'Erro de conexão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
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
        <h2 className="text-2xl font-semibold text-[#2c3e50]">{t('signIn')}</h2>
        <p className="text-[#7f8c8d]">{t('welcomeBack')}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#2c3e50]">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('enterEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#2c3e50]">{t('password')}</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t('enterPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200 focus:border-[#ff9b33] focus:ring-[#ff9b33] bg-[#f8f9fa] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7f8c8d] hover:text-[#2c3e50] transition-colors"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-[#ff9b33] hover:text-[#fa5500] transition-colors text-sm"
            >
              {t('forgotPassword')}
            </button>
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#ff9b33] to-[#ff6a00] hover:from-[#fa5500] hover:to-[#ff9b33] text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('signingIn') || 'Entrando...'}
              </div>
            ) : (
              t('signIn')
            )}
          </Button>
        </form>
        <div className="text-center pt-4">
          <p className="text-[#7f8c8d]">
            {t('dontHaveAccount')}{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-[#ff9b33] hover:text-[#fa5500] transition-colors font-medium"
            >
              {t('signUp')}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}