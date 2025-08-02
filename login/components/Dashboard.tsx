import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "./LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  User, 
  Phone, 
  Mail, 
  Users, 
  LogOut, 
  UserPlus,
  Calendar,
  Copy,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface ReferralStats {
  username: string;
  totalReferrals: number;
  referrals: Array<{
    username: string;
    registeredAt: string;
  }>;
}

export function Dashboard() {
  const { user, logout, accessToken } = useAuth();
  const { t } = useLanguage();
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-3890ddc3`;

  useEffect(() => {
    const fetchReferralStats = async () => {
      if (!accessToken) return;

      try {
        const response = await fetch(`${baseUrl}/referral-stats`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setReferralStats(data);
        } else {
          console.error('Erro ao buscar estatísticas de indicação');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralStats();
  }, [accessToken, baseUrl]);

  const handleCopyReferralCode = () => {
    if (user?.username) {
      navigator.clipboard.writeText(user.username);
      setCopySuccess(true);
      toast.success(t('referralCodeCopied') || 'Código de indicação copiado!');
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success(t('loggedOut') || 'Logout realizado com sucesso');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-2/3 h-full opacity-30"
          style={{
            background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)",
            clipPath: "polygon(70% 0%, 100% 0%, 100% 100%, 40% 100%)"
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-xl font-semibold text-[#2c3e50]">HPX MINER</h1>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('logout') || 'Sair'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#2c3e50] mb-2">
            {t('welcome') || 'Bem-vindo'}, {user?.firstName}!
          </h2>
          <p className="text-[#7f8c8d]">
            {t('dashboardSubtitle') || 'Gerencie sua conta e acompanhe suas indicações'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#2d2d2d]" />
                {t('profileInfo') || 'Informações do Perfil'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#7f8c8d]">
                    {t('completeName') || 'Nome Completo'}
                  </label>
                  <p className="text-[#2c3e50] font-medium">{user?.firstName}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#7f8c8d]">
                    {t('user') || 'Usuário'}
                  </label>
                  <p className="text-[#2c3e50] font-medium">@{user?.username}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#7f8c8d] flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('email') || 'Email'}
                  </label>
                  <p className="text-[#2c3e50]">{user?.email}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#7f8c8d] flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {t('phone') || 'Telefone'}
                  </label>
                  <p className="text-[#2c3e50]">{user?.phone || 'Não informado'}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#7f8c8d] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {t('memberSince') || 'Membro desde'}
                  </label>
                  <p className="text-[#2c3e50]">
                    {user?.registeredAt ? formatDate(user.registeredAt) : 'Data não disponível'}
                  </p>
                </div>

                {user?.sponsoredBy && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#7f8c8d] flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      {t('sponsoredBy') || 'Indicado por'}
                    </label>
                    <p className="text-[#2c3e50]">@{user.sponsoredBy}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Referral Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2d2d2d]" />
                {t('referralProgram') || 'Programa de Indicações'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Referral Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#7f8c8d]">
                  {t('yourReferralCode') || 'Seu Código de Indicação'}
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-gray-100 rounded border text-[#2c3e50] font-mono text-sm">
                    {user?.username}
                  </code>
                  <Button
                    size="sm"
                    onClick={handleCopyReferralCode}
                    className="bg-[#2d2d2d] hover:bg-[#1a1a1a] text-white"
                  >
                    {copySuccess ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Stats */}
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="w-6 h-6 border-2 border-[#2d2d2d] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#7f8c8d]">
                      {t('totalReferrals') || 'Total de Indicações'}
                    </span>
                    <Badge variant="secondary" className="bg-[#2d2d2d] text-white">
                      {referralStats?.totalReferrals || 0}
                    </Badge>
                  </div>

                  {referralStats && referralStats.referrals.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[#7f8c8d]">
                        {t('recentReferrals') || 'Indicações Recentes'}
                      </p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {referralStats.referrals.slice(0, 5).map((referral, index) => (
                          <div key={index} className="flex items-center justify-between text-sm py-1">
                            <span className="text-[#2c3e50]">@{referral.username}</span>
                            <span className="text-[#7f8c8d] text-xs">
                              {formatDate(referral.registeredAt)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(!referralStats || referralStats.referrals.length === 0) && (
                    <div className="text-center py-4">
                      <p className="text-sm text-[#7f8c8d]">
                        {t('noReferralsYet') || 'Nenhuma indicação ainda'}
                      </p>
                      <p className="text-xs text-[#7f8c8d] mt-1">
                        {t('shareYourCode') || 'Compartilhe seu código para começar'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}