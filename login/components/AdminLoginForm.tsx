import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useAdminAuth } from "../hooks/useAdminAuth";
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import hpxLogo from 'figma:asset/91d278e8f66fe2048300937e543184e891dac876.png';

export function AdminLoginForm() {
  const { t } = useLanguage();
  const { login } = useAdminAuth();
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
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl border-0">
      <CardHeader className="space-y-1 text-center pb-8">
        <div className="flex items-center justify-center mb-8">
          {/* HPX MINER Logo */}
          <div className="w-48 h-64 flex items-center justify-center">
            <ImageWithFallback 
              src={hpxLogo}
              alt="HPX MINER Logo"
              className="w-full h-full object-contain"
              style={{ maxWidth: '192px', maxHeight: '256px' }}
            />
          </div>
        </div>
        <h2 className="text-3xl font-semibold text-[#2c3e50] mb-2">
          {t('adminAccess') || 'Acesso Administrativo'}
        </h2>
        <p className="text-[#7f8c8d]">
          {t('adminLoginSubtitle') || 'Faça login para acessar o painel administrativo'}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#2c3e50] font-medium">
              {t('email') || 'Email'}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('enterEmail') || 'Digite seu email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-200 focus:border-[#2d2d2d] focus:ring-[#2d2d2d] bg-[#f8f9fa] h-12 px-4"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#2c3e50] font-medium">
              {t('password') || 'Senha'}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t('enterPassword') || 'Digite sua senha'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-200 focus:border-[#2d2d2d] focus:ring-[#2d2d2d] bg-[#f8f9fa] h-12 px-4 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#7f8c8d] hover:text-[#2c3e50] transition-colors"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-[#2d2d2d] hover:text-[#1a1a1a] transition-colors text-sm font-medium"
            >
              {t('forgotPassword') || 'Esqueceu a senha?'}
            </button>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#2d2d2d] hover:bg-[#1a1a1a] text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-base font-medium"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('signingIn') || 'Entrando...'}
              </div>
            ) : (
              t('adminLogin') || 'Entrar no Painel'
            )}
          </Button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-lg">
          <p className="text-xs text-gray-700 text-center leading-relaxed">
            <span className="font-medium">⚠️ {t('securityNotice') || 'Aviso de Segurança'}</span>
            <br />
            {t('adminSecurityMessage') || 'Esta é uma área restrita. Todos os acessos são monitorados e registrados.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}