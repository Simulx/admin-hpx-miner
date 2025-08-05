import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Users as UsersIcon, Search, Filter, Crown, Ban, MoreVertical, MessageCircle, Edit, UserCheck, RefreshCw, AlertCircle } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';
import { userService, type User } from '../../services/userService';

interface UsersProps {
  onBack?: () => void;
  onViewProfile?: (user: any) => void;
}

export function Users({ onBack, onViewProfile }: UsersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Load users from Supabase when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo('Iniciando carregamento...');
      
      console.log('=== Starting user load process ===');
      
      setDebugInfo('Verificando saúde do serviço...');
      const isHealthy = await userService.healthCheck();
      console.log('Service health check:', isHealthy);
      
      if (!isHealthy) {
        setDebugInfo('Serviço não está respondendo');
        throw new Error('Serviço não está disponível');
      }
      
      setDebugInfo('Buscando usuários do banco de dados...');
      const fetchedUsers = await userService.getAllUsers();
      console.log('Users fetched successfully:', fetchedUsers);
      
      setUsers(fetchedUsers);
      setDebugInfo(`${fetchedUsers.length} usuários carregados com sucesso`);
      setError(null);
    } catch (err: any) {
      console.error('Failed to load users:', err);
      const errorMessage = err.message || 'Erro desconhecido';
      setError(`Falha ao carregar usuários: ${errorMessage}`);
      setDebugInfo(`Erro: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInitializeDatabase = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo('Inicializando banco de dados...');
      
      await userService.initializeDatabase();
      setDebugInfo('Banco de dados inicializado, recarregando usuários...');
      
      // Reload users after initialization
      await loadUsers();
    } catch (err: any) {
      console.error('Failed to initialize database:', err);
      setError(`Falha ao inicializar banco: ${err.message}`);
      setDebugInfo(`Erro na inicialização: ${err.message}`);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'blocked':
        return 'Bloqueado';
      default:
        return 'Desconhecido';
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.cpf.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;
  const blockedUsers = users.filter(u => u.status === 'blocked').length;
  const leadersCount = users.filter(u => u.isLeader).length;

  const handleMakeLeader = async (userId: string) => {
    try {
      await userService.makeUserLeader(userId, true);
      await loadUsers(); // Refresh the list
    } catch (err: any) {
      console.error('Failed to make user leader:', err);
      setError(`Falha ao promover usuário: ${err.message}`);
    }
  };

  const handleBlockUser = async (userId: string) => {
    try {
      await userService.updateUserStatus(userId, 'blocked');
      await loadUsers(); // Refresh the list
    } catch (err: any) {
      console.error('Failed to block user:', err);
      setError(`Falha ao bloquear usuário: ${err.message}`);
    }
  };

  const handleOpenWhatsApp = (user: User) => {
    const message = `Olá ${user.name}, tudo bem? Sou da equipe HPX MINER e gostaria de entrar em contato com você.`;
    // Extract numbers from phone for WhatsApp
    const phoneNumbers = user.phone.replace(/\D/g, '');
    const whatsappNumber = phoneNumbers.startsWith('55') ? phoneNumbers : `55${phoneNumbers}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleViewProfile = (user: User) => {
    if (onViewProfile) {
      onViewProfile(user);
    }
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
          <p className="text-gray-600">Visualize e gerencie todos os usuários da plataforma</p>
          {debugInfo && (
            <p className="text-sm text-blue-600 mt-1">Debug: {debugInfo}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={loadUsers} 
            disabled={loading}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar</span>
          </Button>
          <Button 
            onClick={handleInitializeDatabase}
            disabled={loading}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <AlertCircle className="w-4 h-4" />
            <span>Inicializar DB</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <UsersIcon className="w-4 h-4" />
            <span>Exportar Lista</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Todos os cadastros</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Verificados e ativos</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Líderes</CardTitle>
            <Crown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{leadersCount}</div>
            <p className="text-xs text-muted-foreground">Usuários promovidos</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Bloqueados</CardTitle>
            <Ban className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{blockedUsers}</div>
            <p className="text-xs text-muted-foreground">Suspensos ou banidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <UsersIcon className="w-5 h-5" />
              <span>Lista de Usuários ({totalUsers} encontrados)</span>
            </CardTitle>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, email ou CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-64"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
                <option value="blocked">Bloqueados</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <p className="mt-2 text-gray-500">Carregando usuários do banco de dados...</p>
              {debugInfo && <p className="text-sm text-blue-600 mt-1">{debugInfo}</p>}
            </div>
          )}
          
          {error && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-600 mb-2 font-medium">Erro ao carregar dados</p>
              <p className="text-sm text-red-500 mb-4">{error}</p>
              <div className="flex justify-center space-x-2">
                <Button onClick={loadUsers} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tentar Novamente
                </Button>
                <Button onClick={handleInitializeDatabase} variant="outline">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Inicializar Banco
                </Button>
              </div>
            </div>
          )}
          
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Usuário</th>
                    <th className="text-left py-3 px-4">Contato</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Investido</th>
                    <th className="text-left py-3 px-4">Rendimentos</th>
                    <th className="text-left py-3 px-4">Indicações</th>
                    <th className="text-left py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar || ''} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="font-medium">{user.name}</div>
                              {user.isLeader && (
                                <Crown className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500">CPF: {user.cpf}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>{user.email}</div>
                          <div className="text-gray-500">{user.phone}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(user.status)}>
                          {getStatusText(user.status)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-blue-600">
                          R$ {user.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-green-600">
                          R$ {user.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium">{user.referrals}</div>
                      </td>
                      
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={() => handleOpenWhatsApp(user)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Contatar via WhatsApp</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {!user.isLeader && user.status === 'active' && (
                            <Button size="sm" variant="outline" onClick={() => handleMakeLeader(user.id)}>
                              <Crown className="w-4 h-4 text-yellow-500" />
                            </Button>
                          )}
                          {user.status !== 'blocked' && (
                            <Button size="sm" variant="outline" onClick={() => handleBlockUser(user.id)}>
                              <Ban className="w-4 h-4 text-red-500" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline" onClick={() => handleViewProfile(user)}>
                            Ver Perfil
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {!loading && !error && filteredUsers.length === 0 && users.length > 0 && (
            <div className="text-center py-8">
              <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum usuário encontrado com os filtros aplicados</p>
            </div>
          )}
          
          {!loading && !error && users.length === 0 && (
            <div className="text-center py-8">
              <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Nenhum usuário cadastrado no sistema</p>
              <Button onClick={handleInitializeDatabase} className="mt-2">
                <AlertCircle className="w-4 h-4 mr-2" />
                Inicializar Banco de Dados
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}