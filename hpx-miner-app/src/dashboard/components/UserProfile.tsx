import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Award,
  Edit,
  Camera,
  Lock,
  Bell,
  Globe,
  CreditCard,
  History,
  Eye,
  EyeOff,
  Copy,
  Share2,
  Link
} from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';
import { toast } from 'sonner@2.0.3';

interface UserProfileProps {
  onBack?: () => void;
}

export function UserProfile({ onBack }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const userInfo = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00',
    address: 'São Paulo - SP, Brasil',
    joinDate: '2024-11-20',
    lastLogin: '2025-07-12 10:30',
    isPremium: true,
    avatar: null,
    totalInvested: 75000.00,
    totalEarnings: 22750.00,
    activeInvestments: 5,
    referrals: 24,
    pointsBalance: 1250,
    referralLink: 'https://hpxminer.com/ref/user12345'
  };

  const recentActivity = [
    {
      type: 'investment',
      description: 'Novo investimento - Pack Elite',
      amount: 'R$ 10.000,00',
      date: '2025-07-11',
      status: 'completed'
    },
    {
      type: 'earning',
      description: 'Rendimento diário',
      amount: '+R$ 500,00',
      date: '2025-07-11',
      status: 'completed'
    },
    {
      type: 'withdrawal',
      description: 'Saque via PIX',
      amount: '-R$ 2.000,00',
      date: '2025-07-10',
      status: 'pending'
    },
    {
      type: 'referral',
      description: 'Novo indicado - Maria Santos',
      amount: '+R$ 150,00',
      date: '2025-07-09',
      status: 'completed'
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'investment':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'earning':
        return <DollarSign className="w-4 h-4 text-green-500" />;
      case 'withdrawal':
        return <CreditCard className="w-4 h-4 text-orange-500" />;
      case 'referral':
        return <Users className="w-4 h-4 text-purple-500" />;
      default:
        return <History className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(userInfo.referralLink);
      toast.success('Link copiado para a área de transferência!');
    } catch (err) {
      toast.error('Erro ao copiar o link');
    }
  };

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HPX MINER - Programa de Indicação',
          text: 'Participe da HPX MINER e ganhe com investimentos!',
          url: userInfo.referralLink,
        });
      } catch (err) {
        // User cancelled sharing or error occurred
        handleCopyLink(); // Fallback to copy
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      handleCopyLink();
    }
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e configurações da conta</p>
        </div>
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar Section */}
            <div className="relative">
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarImage src={userInfo.avatar || ''} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl md:text-3xl">
                  {getInitials(userInfo.name)}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                variant="outline"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-900">{userInfo.name}</h2>
                {userInfo.isPremium && (
                  <Badge className="bg-gradient-to-r from-orange-400 to-orange-500 text-white w-fit">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 mb-2">{userInfo.email}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Membro desde {new Date(userInfo.joinDate).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Conta verificada</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:text-right">
              <div>
                <p className="text-sm text-gray-500">Total Investido</p>
                <p className="font-bold text-blue-600">
                  R$ {userInfo.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Ganhos</p>
                <p className="font-bold text-green-600">
                  R$ {userInfo.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimentos Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userInfo.activeInvestments}</div>
            <p className="text-xs text-muted-foreground">Contratos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indicações</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userInfo.referrals}</div>
            <p className="text-xs text-muted-foreground">Pessoas indicadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontos</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userInfo.pointsBalance}</div>
            <p className="text-xs text-muted-foreground">Pontos acumulados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nível</CardTitle>
            <Star className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Premium</div>
            <p className="text-xs text-muted-foreground">Plano atual</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link Card */}
      <Card className="bg-blue-50 border-blue-200 w-3/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <span>Seu Link de Indicação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              value={userInfo.referralLink}
              readOnly
              className="flex-1 p-3 bg-white border border-gray-300 rounded-lg text-sm"
            />
            <button 
              onClick={handleCopyLink}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar</span>
            </button>
            <button 
              onClick={handleShareLink}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Informações Pessoais</span>
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input 
                    id="name" 
                    defaultValue={userInfo.name}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    defaultValue={userInfo.email}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    defaultValue={userInfo.phone}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input 
                    id="cpf" 
                    defaultValue={userInfo.cpf}
                    disabled={true}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input 
                    id="address" 
                    defaultValue={userInfo.address}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsEditing(false)}>
                    Salvar Alterações
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Segurança da Conta</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Senha Atual</Label>
                <div className="relative">
                  <Input 
                    id="current-password" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha atual"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  placeholder="Digite sua nova senha"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder="Digite novamente sua nova senha"
                />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Autenticação de Dois Fatores</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Ativar 2FA</p>
                    <p className="text-xs text-gray-500">Adicione uma camada extra de segurança</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Alterar Senha</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Preferências de Notificação</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações por Email</p>
                    <p className="text-sm text-gray-500">Receber atualizações importantes por email</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações Push</p>
                    <p className="text-sm text-gray-500">Receber notificações no navegador</p>
                  </div>
                  <Button variant="outline" size="sm">Desativado</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatórios de Rendimento</p>
                    <p className="text-sm text-gray-500">Relatórios semanais de performance</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novos Programas</p>
                    <p className="text-sm text-gray-500">Ser notificado sobre novos planos de investimento</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Atividade Recente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.description}</p>
                        <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{activity.amount}</p>
                      <Badge className={`${getStatusColor(activity.status)} text-xs`}>
                        {activity.status === 'completed' ? 'Concluído' : 
                         activity.status === 'pending' ? 'Pendente' : 'Falhado'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}