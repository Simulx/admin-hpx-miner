import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
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
  Link,
  Plus,
  Minus,
  Wallet,
  ArrowUp,
  ArrowDown,
  Network,
  X,
  Check,
  ChevronsUpDown,
  Search
} from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { MobileBackButton } from './MobileBackButton';
import { toast } from 'sonner';
import { cn } from './ui/utils';

interface AdminUserProfileProps {
  onBack?: () => void;
  userData?: any;
  onViewNetwork?: (userData: any) => void;
}

export function AdminUserProfile({ onBack, userData, onViewNetwork }: AdminUserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showAssignmentCard, setShowAssignmentCard] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState<any>(null);
  const [assignmentAmount, setAssignmentAmount] = useState('');
  const [showPlansTable, setShowPlansTable] = useState(false);
  const [showAddBalanceCard, setShowAddBalanceCard] = useState(false);
  const [addBalanceAmount, setAddBalanceAmount] = useState('');
  const [showSubtractBalanceCard, setShowSubtractBalanceCard] = useState(false);
  const [subtractBalanceAmount, setSubtractBalanceAmount] = useState('');
  const [showUplineCard, setShowUplineCard] = useState(false);
  const [newSponsorId, setNewSponsorId] = useState('');
  const [sponsorOpen, setSponsorOpen] = useState(false);
  const [showDownlineCard, setShowDownlineCard] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDownlineId, setSelectedDownlineId] = useState('');
  const [dynamicSponsors, setDynamicSponsors] = useState<{[key: string]: string}>({});
  const [levelOpen, setLevelOpen] = useState(false);
  const [downlineOpen, setDownlineOpen] = useState(false);
  const [sponsorPopovers, setSponsorPopovers] = useState<{[key: string]: boolean}>({});
  const [assignedPlans, setAssignedPlans] = useState<Set<string>>(new Set());

  const userInfo = userData || {
    name: 'João Silva Santos',
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
    currentBalance: 5450.75,
    referralLink: 'https://hpxminer.com/ref/user12345',
    currentSponsor: {
      id: '2',
      name: 'Maria Oliveira Santos',
      username: 'maria.oliveira',
      email: 'maria.oliveira@email.com'
    }
  };

  // Mock data for available sponsors - in a real app, this would come from an API
  const availableSponsors = [
    { id: '1', name: 'João Silva Santos', username: 'joao.silva', email: 'joao.silva@email.com' },
    { id: '2', name: 'Maria Oliveira Santos', username: 'maria.oliveira', email: 'maria.oliveira@email.com' },
    { id: '3', name: 'Carlos Alberto Mendes', username: 'carlos.alberto', email: 'carlos.alberto@email.com' },
    { id: '4', name: 'Ana Paula Costa Silva', username: 'ana.costa', email: 'ana.costa@email.com' },
    { id: '5', name: 'Roberto Mendes Lima', username: 'roberto.mendes', email: 'roberto.mendes@email.com' },
    { id: '6', name: 'Fernanda Lima Santos', username: 'fernanda.lima', email: 'fernanda.lima@email.com' },
    { id: '7', name: 'Paulo Ricardo Sousa', username: 'paulo.ricardo', email: 'paulo.ricardo@email.com' },
    { id: '8', name: 'Juliana Torres Alves', username: 'juliana.torres', email: 'juliana.torres@email.com' }
  ];

  const plans = [
    {
      id: 'basic',
      name: 'Pack Básico',
      dailyRate: '2%',
      minInvestment: 100,
      maxInvestment: 1000,
      duration: '30 dias',
      totalReturn: '60%'
    },
    {
      id: 'standard',
      name: 'Pack Padrão',
      dailyRate: '3%',
      minInvestment: 1000,
      maxInvestment: 5000,
      duration: '45 dias',
      totalReturn: '135%'
    },
    {
      id: 'premium',
      name: 'Pack Premium',
      dailyRate: '4%',
      minInvestment: 5000,
      maxInvestment: 15000,
      duration: '60 dias',
      totalReturn: '240%'
    },
    {
      id: 'elite',
      name: 'Pack Elite',
      dailyRate: '5%',
      minInvestment: 15000,
      maxInvestment: 50000,
      duration: '90 dias',
      totalReturn: '450%'
    }
  ];

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

  // Admin action handlers
  const handleCreatePlan = () => {
    setShowPlansTable(!showPlansTable);
    if (!showPlansTable) {
      toast.success('Tabela de planos exibida');
    } else {
      toast.success('Tabela de planos ocultada');
    }
  };

  const handleAddBalance = () => {
    setShowAddBalanceCard(true);
    setAddBalanceAmount('');
  };

  const handleSubtractBalance = () => {
    setShowSubtractBalanceCard(true);
    setSubtractBalanceAmount('');
  };

  const handleAddUpline = () => {
    setShowUplineCard(true);
    setNewSponsorId('');
  };

  const handleAddDownline = () => {
    setShowDownlineCard(true);
    setSelectedLevel('');
    setSelectedDownlineId('');
    setDynamicSponsors({});
  };

  const handleViewNetwork = () => {
    if (onViewNetwork) {
      onViewNetwork(userInfo);
    } else {
      toast.success('Funcionalidade "Ver Rede" em desenvolvimento');
    }
  };

  const handleSelectPlanForUser = (planName: string) => {
    // If plan is already assigned, show download functionality
    if (assignedPlans.has(planName)) {
      toast.info(`Iniciando download do plano "${planName}"`);
      return;
    }
    
    const plan = plans.find(p => p.name === planName);
    if (plan) {
      setSelectedPlanData(plan);
      setShowAssignmentCard(true);
      setAssignmentAmount('');
    }
  };

  const handleCancelAssignment = () => {
    setShowAssignmentCard(false);
    setSelectedPlanData(null);
    setAssignmentAmount('');
  };

  const handleConfirmAssignment = () => {
    if (assignmentAmount && parseFloat(assignmentAmount.replace(',', '.')) >= selectedPlanData.minInvestment && parseFloat(assignmentAmount.replace(',', '.')) <= selectedPlanData.maxInvestment) {
      // Add the plan to assigned plans
      setAssignedPlans(prev => new Set([...prev, selectedPlanData.name]));
      toast.success(`Plano "${selectedPlanData.name}" com valor R$ ${parseFloat(assignmentAmount.replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} atribuído ao usuário ${userInfo.name}`);
      handleCancelAssignment();
    }
  };

  const handleCancelAddBalance = () => {
    setShowAddBalanceCard(false);
    setAddBalanceAmount('');
  };

  const handleConfirmAddBalance = () => {
    if (addBalanceAmount && parseFloat(addBalanceAmount.replace(',', '.')) > 0) {
      const currentBalance = userInfo.currentBalance || 0;
      const addAmount = parseFloat(addBalanceAmount.replace(',', '.'));
      const newBalance = currentBalance + addAmount;
      
      toast.success(`Saldo atualizado! Valor R$ ${addAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} adicionado ao usuário ${userInfo.name}. Novo saldo: R$ ${newBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      handleCancelAddBalance();
    }
  };

  const handleCancelSubtractBalance = () => {
    setShowSubtractBalanceCard(false);
    setSubtractBalanceAmount('');
  };

  const handleConfirmSubtractBalance = () => {
    if (subtractBalanceAmount && parseFloat(subtractBalanceAmount.replace(',', '.')) > 0) {
      const currentBalance = userInfo.currentBalance || 0;
      const subtractAmount = parseFloat(subtractBalanceAmount.replace(',', '.'));
      
      if (subtractAmount > currentBalance) {
        toast.error(`Valor a subtrair (R$ ${subtractAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}) é maior que o saldo atual (R$ ${currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`);
        return;
      }
      
      const newBalance = Math.max(0, currentBalance - subtractAmount);
      toast.success(`Saldo atualizado! Valor R$ ${subtractAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} subtraído do usuário ${userInfo.name}. Novo saldo: R$ ${newBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`);
      handleCancelSubtractBalance();
    }
  };

  const calculateNewBalance = () => {
    if (!addBalanceAmount) return userInfo.currentBalance || 0;
    const currentBalance = userInfo.currentBalance || 0;
    const addAmount = parseFloat(addBalanceAmount.replace(',', '.')) || 0;
    return currentBalance + addAmount;
  };

  const calculateNewBalanceSubtract = () => {
    if (!subtractBalanceAmount) return userInfo.currentBalance || 0;
    const currentBalance = userInfo.currentBalance || 0;
    const subtractAmount = parseFloat(subtractBalanceAmount.replace(',', '.')) || 0;
    return Math.max(0, currentBalance - subtractAmount);
  };

  // Upline management handlers
  const selectedNewSponsor = availableSponsors.find(sponsor => sponsor.id === newSponsorId);

  const handleCancelUpline = () => {
    setShowUplineCard(false);
    setNewSponsorId('');
    setSponsorOpen(false);
  };

  const handleConfirmUpline = () => {
    if (newSponsorId && selectedNewSponsor) {
      const currentSponsorName = userInfo.currentSponsor?.name || 'Nenhum';
      const newSponsorName = selectedNewSponsor.name;
      
      toast.success(`Patrocinador atualizado com sucesso!\nAnterior: ${currentSponsorName}\nNovo: ${newSponsorName}`);
      handleCancelUpline();
    }
  };

  // Downline management handlers
  const selectedDownline = availableSponsors.find(sponsor => sponsor.id === selectedDownlineId);
  const levels = ['1', '2', '3', '4', '5'];

  const handleCancelDownline = () => {
    setShowDownlineCard(false);
    setSelectedLevel('');
    setSelectedDownlineId('');
    setDynamicSponsors({});
    setLevelOpen(false);
    setDownlineOpen(false);
    setSponsorPopovers({});
  };

  const handleConfirmDownline = () => {
    if (selectedLevel && selectedDownlineId && selectedDownline) {
      // Check if all required sponsor fields are filled
      const requiredSponsors = [];
      for(let i = parseInt(selectedLevel) - 1; i >= 1; i--) {
        requiredSponsors.push(i.toString());
      }
      
      const missingSponsors = requiredSponsors.filter(level => !dynamicSponsors[level]);
      
      if (missingSponsors.length > 0) {
        toast.error(`Por favor, selecione os patrocinadores para os níveis: ${missingSponsors.join(', ')}`);
        return;
      }
      
      const sponsorsText = requiredSponsors.map(level => {
        const sponsor = availableSponsors.find(s => s.id === dynamicSponsors[level]);
        return `Nível ${level}: ${sponsor?.name || 'N/A'}`;
      }).join('\n');
      
      toast.success(`Downline adicionado com sucesso!\nUsuário: ${selectedDownline.name}\nNível: ${selectedLevel}\n${sponsorsText}`);
      handleCancelDownline();
    }
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setDynamicSponsors({}); // Reset sponsors when level changes
    setLevelOpen(false);
  };

  const handleSponsorChange = (level: string, sponsorId: string) => {
    setDynamicSponsors(prev => ({
      ...prev,
      [level]: sponsorId
    }));
    setSponsorPopovers(prev => ({
      ...prev,
      [level]: false
    }));
  };

  const toggleSponsorPopover = (level: string) => {
    setSponsorPopovers(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  const getSponsorForLevel = (level: string) => {
    return availableSponsors.find(sponsor => sponsor.id === dynamicSponsors[level]);
  };

  const renderDynamicSponsorFields = () => {
    if (!selectedLevel) return null;
    
    const fields = [];
    for(let i = parseInt(selectedLevel) - 1; i >= 1; i--) {
      const level = i.toString();
      const selectedSponsor = getSponsorForLevel(level);
      
      fields.push(
        <div key={level}>
          <Label className="text-gray-700 mb-2 block">
            Patrocinador Nível {level}
          </Label>
          <Popover open={sponsorPopovers[level]} onOpenChange={() => toggleSponsorPopover(level)}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between h-12"
              >
                {selectedSponsor ? (
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>{selectedSponsor.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span>Buscar patrocinador...</span>
                  </div>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Buscar patrocinador..." />
                <CommandList>
                  <CommandEmpty>Nenhum patrocinador encontrado.</CommandEmpty>
                  <CommandGroup>
                    {availableSponsors.map((sponsor) => (
                      <CommandItem
                        key={sponsor.id}
                        value={sponsor.name}
                        onSelect={() => handleSponsorChange(level, sponsor.id)}
                      >
                        <div className="flex items-center space-x-3 w-full">
                          <Users className="w-4 h-4 text-gray-400" />
                          <div className="flex-1">
                            <p className="font-medium">{sponsor.name}</p>
                            <p className="text-sm text-gray-500">@{sponsor.username}</p>
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              dynamicSponsors[level] === sponsor.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      );
    }
    
    return fields;
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Perfil do Usuário - Admin</h1>
          <p className="text-gray-600">Gerencie informações do usuário e execute ações administrativas</p>
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
                  <span>Membro desde {new Date(userInfo.joinDate || '2024-11-20').toLocaleDateString('pt-BR')}</span>
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
                  R$ {(userInfo.totalInvested || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Ganhos</p>
                <p className="font-bold text-green-600">
                  R$ {(userInfo.totalEarnings || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimentos Ativos</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userInfo.activeInvestments || 0}</div>
            <p className="text-xs text-muted-foreground">Contratos ativos</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indicações</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userInfo.referrals || 0}</div>
            <p className="text-xs text-muted-foreground">Pessoas indicadas</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pontos</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userInfo.pointsBalance || 0}</div>
            <p className="text-xs text-muted-foreground">Pontos acumulados</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
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

      {/* Admin Actions - Orange Buttons */}
      <div className="flex flex-wrap gap-4 justify-start">
        <Button 
          onClick={handleCreatePlan}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 px-6 py-3 rounded-xl font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Criar Plano</span>
        </Button>

        <Button 
          onClick={handleAddBalance}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 px-6 py-3 rounded-xl font-medium"
        >
          <Wallet className="w-5 h-5" />
          <span>Adicionar Saldo</span>
        </Button>

        <Button 
          onClick={handleSubtractBalance}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 px-6 py-3 rounded-xl font-medium"
        >
          <Minus className="w-5 h-5" />
          <span>Subtrair Saldo</span>
        </Button>

        <Button 
          onClick={handleAddUpline}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 px-6 py-3 rounded-xl font-medium"
        >
          <ArrowUp className="w-5 h-5" />
          <span>Adicionar Upline</span>
        </Button>

        <Button 
          onClick={handleAddDownline}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 px-6 py-3 rounded-xl font-medium"
        >
          <ArrowDown className="w-5 h-5" />
          <span>Adicionar Downline</span>
        </Button>

        <Button 
          onClick={handleViewNetwork}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 px-6 py-3 rounded-xl font-medium"
        >
          <Network className="w-5 h-5" />
          <span>Ver Rede</span>
        </Button>
      </div>

      {/* Investment Plans Table - Only visible when showPlansTable is true and no other card is shown */}
      {showPlansTable && !showAssignmentCard && !showAddBalanceCard && !showSubtractBalanceCard && !showUplineCard && !showDownlineCard && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Planos de Investimento - Administração</h2>
            <p className="text-gray-600">Gerencie e atribua planos para o usuário</p>
          </div>
          
          <Card className="shadow-custom">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-bold text-gray-900">Plano</TableHead>
                    <TableHead className="font-bold text-gray-900">Rendimento diário</TableHead>
                    <TableHead className="font-bold text-gray-900">Valor Mínimo</TableHead>
                    <TableHead className="font-bold text-gray-900">Valor Máximo</TableHead>
                    <TableHead className="font-bold text-gray-900">Duração</TableHead>
                    <TableHead className="font-bold text-gray-900">Retorno Total</TableHead>
                    <TableHead className="font-bold text-gray-900">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-900">{plan.name}</TableCell>
                      <TableCell className="text-blue-600 font-bold">{plan.dailyRate} ao dia</TableCell>
                      <TableCell className="text-gray-700">R$ {plan.minInvestment.toLocaleString('pt-BR')}</TableCell>
                      <TableCell className="text-gray-700">R$ {plan.maxInvestment.toLocaleString('pt-BR')}</TableCell>
                      <TableCell className="text-gray-700">{plan.duration}</TableCell>
                      <TableCell className="text-green-600 font-bold">{plan.totalReturn}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm"
                          onClick={() => handleSelectPlanForUser(plan.name)}
                          className={assignedPlans.has(plan.name) 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                          }
                        >
                          {assignedPlans.has(plan.name) ? 'Baixar' : 'Atribuir'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Plan Assignment Card */}
      {showAssignmentCard && selectedPlanData && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-orange-700">Atribuir Plano: {selectedPlanData.name}</span>
              <Button variant="ghost" size="sm" onClick={handleCancelAssignment}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Rendimento:</span>
                <span className="font-bold text-blue-600 ml-2">{selectedPlanData.dailyRate} ao dia</span>
              </div>
              <div>
                <span className="text-gray-600">Duração:</span>
                <span className="font-bold text-gray-700 ml-2">{selectedPlanData.duration}</span>
              </div>
              <div>
                <span className="text-gray-600">Valor Mínimo:</span>
                <span className="font-bold text-gray-700 ml-2">R$ {selectedPlanData.minInvestment.toLocaleString('pt-BR')}</span>
              </div>
              <div>
                <span className="text-gray-600">Valor Máximo:</span>
                <span className="font-bold text-gray-700 ml-2">R$ {selectedPlanData.maxInvestment.toLocaleString('pt-BR')}</span>
              </div>
            </div>
            
            <div>
              <Label className="text-gray-700 mb-2 block">Valor do Investimento (R$)</Label>
              <Input
                type="text"
                placeholder="Ex: 5000,00"
                value={assignmentAmount}
                onChange={(e) => setAssignmentAmount(e.target.value)}
                className="h-12"
              />
              <p className="text-sm text-gray-500 mt-1">
                Entre R$ {selectedPlanData.minInvestment.toLocaleString('pt-BR')} e R$ {selectedPlanData.maxInvestment.toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCancelAssignment} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmAssignment}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                disabled={!assignmentAmount || parseFloat(assignmentAmount.replace(',', '.')) < selectedPlanData.minInvestment || parseFloat(assignmentAmount.replace(',', '.')) > selectedPlanData.maxInvestment}
              >
                CONFIRMAR ATRIBUIÇÃO
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Balance Card */}
      {showAddBalanceCard && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-green-700">Adicionar Saldo</span>
              <Button variant="ghost" size="sm" onClick={handleCancelAddBalance}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Saldo Atual:</span>
                <span className="font-bold text-blue-600 ml-2">
                  R$ {(userInfo.currentBalance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Novo Saldo:</span>
                <span className="font-bold text-green-600 ml-2">
                  R$ {calculateNewBalance().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            
            <div>
              <Label className="text-gray-700 mb-2 block">Valor a Adicionar (R$)</Label>
              <Input
                type="text"
                placeholder="Ex: 1000,00"
                value={addBalanceAmount}
                onChange={(e) => setAddBalanceAmount(e.target.value)}
                className="h-12"
              />
              <p className="text-sm text-gray-500 mt-1">
                Insira o valor que deseja adicionar ao saldo do usuário
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCancelAddBalance} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmAddBalance}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                disabled={!addBalanceAmount || parseFloat(addBalanceAmount.replace(',', '.')) <= 0}
              >
                CONFIRMAR ADIÇÃO
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subtract Balance Card */}
      {showSubtractBalanceCard && (
        <Card className="border-2 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-red-700">Subtrair Saldo</span>
              <Button variant="ghost" size="sm" onClick={handleCancelSubtractBalance}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Saldo Atual:</span>
                <span className="font-bold text-blue-600 ml-2">
                  R$ {(userInfo.currentBalance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Novo Saldo:</span>
                <span className="font-bold text-red-600 ml-2">
                  R$ {calculateNewBalanceSubtract().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            
            <div>
              <Label className="text-gray-700 mb-2 block">Valor a Subtrair (R$)</Label>
              <Input
                type="text"
                placeholder="Ex: 500,00"
                value={subtractBalanceAmount}
                onChange={(e) => setSubtractBalanceAmount(e.target.value)}
                className="h-12"
              />
              <p className="text-sm text-gray-500 mt-1">
                Insira o valor que deseja subtrair do saldo do usuário (máximo: R$ {(userInfo.currentBalance || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCancelSubtractBalance} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmSubtractBalance}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                disabled={!subtractBalanceAmount || parseFloat(subtractBalanceAmount.replace(',', '.')) <= 0 || parseFloat(subtractBalanceAmount.replace(',', '.')) > (userInfo.currentBalance || 0)}
              >
                CONFIRMAR SUBTRAÇÃO
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upline Card */}
      {showUplineCard && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-blue-700">Alterar Patrocinador (Upline)</span>
              <Button variant="ghost" size="sm" onClick={handleCancelUpline}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <span className="text-gray-600">Patrocinador Atual:</span>
              <span className="font-bold text-gray-700 ml-2">
                {userInfo.currentSponsor?.name || 'Nenhum'}
              </span>
            </div>
            
            <div>
              <Label className="text-gray-700 mb-2 block">Novo Patrocinador</Label>
              <Popover open={sponsorOpen} onOpenChange={setSponsorOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={sponsorOpen}
                    className="w-full justify-between h-12"
                  >
                    {selectedNewSponsor ? (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{selectedNewSponsor.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span>Buscar novo patrocinador...</span>
                      </div>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar patrocinador..." />
                    <CommandList>
                      <CommandEmpty>Nenhum patrocinador encontrado.</CommandEmpty>
                      <CommandGroup>
                        {availableSponsors.map((sponsor) => (
                          <CommandItem
                            key={sponsor.id}
                            value={sponsor.name}
                            onSelect={() => {
                              setNewSponsorId(sponsor.id === newSponsorId ? '' : sponsor.id);
                              setSponsorOpen(false);
                            }}
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <Users className="w-4 h-4 text-gray-400" />
                              <div className="flex-1">
                                <p className="font-medium">{sponsor.name}</p>
                                <p className="text-sm text-gray-500">@{sponsor.username}</p>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  newSponsorId === sponsor.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCancelUpline} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmUpline}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!newSponsorId}
              >
                CONFIRMAR ALTERAÇÃO
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Downline Card */}
      {showDownlineCard && (
        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-purple-700">Adicionar ao Downline</span>
              <Button variant="ghost" size="sm" onClick={handleCancelDownline}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-700 mb-2 block">Nível do Downline</Label>
              <Popover open={levelOpen} onOpenChange={setLevelOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={levelOpen}
                    className="w-full justify-between h-12"
                  >
                    {selectedLevel ? (
                      <span>Nível {selectedLevel}</span>
                    ) : (
                      <span>Selecionar nível...</span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>Nenhum nível encontrado.</CommandEmpty>
                      <CommandGroup>
                        {levels.map((level) => (
                          <CommandItem
                            key={level}
                            value={level}
                            onSelect={() => handleLevelChange(level)}
                          >
                            <span>Nível {level}</span>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedLevel === level ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-gray-700 mb-2 block">Usuário do Downline</Label>
              <Popover open={downlineOpen} onOpenChange={setDownlineOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={downlineOpen}
                    className="w-full justify-between h-12"
                  >
                    {selectedDownline ? (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{selectedDownline.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <span>Buscar usuário...</span>
                      </div>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar usuário..." />
                    <CommandList>
                      <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                      <CommandGroup>
                        {availableSponsors.map((user) => (
                          <CommandItem
                            key={user.id}
                            value={user.name}
                            onSelect={() => {
                              setSelectedDownlineId(user.id === selectedDownlineId ? '' : user.id);
                              setDownlineOpen(false);
                            }}
                          >
                            <div className="flex items-center space-x-3 w-full">
                              <Users className="w-4 h-4 text-gray-400" />
                              <div className="flex-1">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">@{user.username}</p>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  selectedDownlineId === user.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Dynamic sponsor selection fields */}
            {renderDynamicSponsorFields()}

            <div className="flex gap-3 pt-4">
              <Button onClick={handleCancelDownline} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button 
                onClick={handleConfirmDownline}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!selectedLevel || !selectedDownlineId}
              >
                ADICIONAR DOWNLINE
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
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
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{activity.amount}</p>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status === 'completed' ? 'Concluído' : 
                     activity.status === 'pending' ? 'Pendente' : 'Falhou'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}