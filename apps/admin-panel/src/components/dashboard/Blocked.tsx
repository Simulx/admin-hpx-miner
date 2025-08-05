import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Ban, Search, UserCheck, AlertTriangle, Calendar, MoreVertical, Eye, Unlock } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface BlockedProps {
  onBack?: () => void;
}

export function Blocked({ onBack }: BlockedProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterReason, setFilterReason] = useState('all');

  const blockedUsers = [
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      phone: '(11) 77777-7777',
      cpf: '456.789.123-00',
      totalInvested: 2500.00,
      totalEarnings: 150.00,
      referrals: 1,
      blockDate: '2025-07-05',
      blockReason: 'suspicious_activity',
      blockDetails: 'Atividade suspeita detectada no sistema de pagamentos',
      blockedBy: 'Sistema Automático',
      lastActivity: '2025-07-05 10:20',
      avatar: null
    },
    {
      id: 8,
      name: 'Lucas Mendes',
      email: 'lucas@email.com',
      phone: '(11) 22222-2222',
      cpf: '852.963.741-00',
      totalInvested: 5000.00,
      totalEarnings: 800.00,
      referrals: 3,
      blockDate: '2025-07-01',
      blockReason: 'policy_violation',
      blockDetails: 'Violação dos termos de uso - múltiplas contas',
      blockedBy: 'Admin: João Silva',
      lastActivity: '2025-07-01 15:30',
      avatar: null
    },
    {
      id: 9,
      name: 'Fernanda Oliveira',
      email: 'fernanda@email.com',
      phone: '(11) 11111-1111',
      cpf: '741.852.963-00',
      totalInvested: 1200.00,
      totalEarnings: 0.00,
      referrals: 0,
      blockDate: '2025-06-28',
      blockReason: 'fraud_attempt',
      blockDetails: 'Tentativa de fraude em solicitação de saque',
      blockedBy: 'Admin: Maria Santos',
      lastActivity: '2025-06-28 09:15',
      avatar: null
    },
    {
      id: 10,
      name: 'Ricardo Silva',
      email: 'ricardo@email.com',
      phone: '(11) 99999-1111',
      cpf: '159.753.486-00',
      totalInvested: 800.00,
      totalEarnings: 45.00,
      referrals: 0,
      blockDate: '2025-06-25',
      blockReason: 'spam_activity',
      blockDetails: 'Envio excessivo de mensagens spam para outros usuários',
      blockedBy: 'Moderador: Carlos Admin',
      lastActivity: '2025-06-25 18:45',
      avatar: null
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'suspicious_activity':
        return 'bg-yellow-100 text-yellow-800';
      case 'policy_violation':
        return 'bg-red-100 text-red-800';
      case 'fraud_attempt':
        return 'bg-purple-100 text-purple-800';
      case 'spam_activity':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getReasonText = (reason: string) => {
    switch (reason) {
      case 'suspicious_activity':
        return 'Atividade Suspeita';
      case 'policy_violation':
        return 'Violação de Política';
      case 'fraud_attempt':
        return 'Tentativa de Fraude';
      case 'spam_activity':
        return 'Atividade de Spam';
      default:
        return 'Outro Motivo';
    }
  };

  const filteredUsers = blockedUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.cpf.includes(searchTerm);
    const matchesReason = filterReason === 'all' || user.blockReason === filterReason;
    return matchesSearch && matchesReason;
  });

  const totalBlocked = blockedUsers.length;
  const suspiciousActivity = blockedUsers.filter(u => u.blockReason === 'suspicious_activity').length;
  const policyViolations = blockedUsers.filter(u => u.blockReason === 'policy_violation').length;
  const fraudAttempts = blockedUsers.filter(u => u.blockReason === 'fraud_attempt').length;

  const handleUnblockUser = (userId: number) => {
    console.log('Unblocking user:', userId);
  };

  const handleViewDetails = (userId: number) => {
    console.log('Viewing blocked user details:', userId);
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usuários Bloqueados</h1>
          <p className="text-gray-600">Gerencie usuários suspensos e suas respectivas violações</p>
        </div>
        <Button className="flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Relatório de Bloqueios</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bloqueados</CardTitle>
            <Ban className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalBlocked}</div>
            <p className="text-xs text-muted-foreground">Usuários suspensos</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividade Suspeita</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{suspiciousActivity}</div>
            <p className="text-xs text-muted-foreground">Comportamento anômalo</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violações de Política</CardTitle>
            <Ban className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{policyViolations}</div>
            <p className="text-xs text-muted-foreground">Quebra de regras</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tentativas de Fraude</CardTitle>
            <AlertTriangle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{fraudAttempts}</div>
            <p className="text-xs text-muted-foreground">Atividades fraudulentas</p>
          </CardContent>
        </Card>
      </div>

      {/* Blocked Users Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <Ban className="w-5 h-5 text-red-500" />
              <span>Lista de Usuários Bloqueados</span>
            </CardTitle>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuário bloqueado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-64"
                />
              </div>
              
              <select
                value={filterReason}
                onChange={(e) => setFilterReason(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os motivos</option>
                <option value="suspicious_activity">Atividade Suspeita</option>
                <option value="policy_violation">Violação de Política</option>
                <option value="fraud_attempt">Tentativa de Fraude</option>
                <option value="spam_activity">Atividade de Spam</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="border border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={user.avatar || ''} />
                          <AvatarFallback className="bg-red-100 text-red-600 text-lg">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <Ban className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-semibold">{user.name}</h3>
                          <Badge className={getReasonColor(user.blockReason)}>
                            {getReasonText(user.blockReason)}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>{user.email}</div>
                          <div>{user.phone}</div>
                          <div>CPF: {user.cpf}</div>
                          <div className="flex items-center space-x-2 text-red-600">
                            <Calendar className="w-4 h-4" />
                            <span>Bloqueado em: {new Date(user.blockDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewDetails(user.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleUnblockUser(user.id)}>
                        <Unlock className="w-4 h-4 text-green-500" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-white rounded-lg border border-red-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-red-800">Motivo do Bloqueio</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{user.blockDetails}</p>
                    <div className="text-xs text-gray-500">
                      <span>Bloqueado por: {user.blockedBy}</span>
                      <span className="ml-4">Última atividade: {user.lastActivity}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-blue-600">
                        R$ {user.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-gray-600">Total Investido</div>
                    </div>
                    
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-green-600">
                        R$ {user.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs text-gray-600">Total Ganho</div>
                    </div>
                    
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{user.referrals}</div>
                      <div className="text-xs text-gray-600">Indicações</div>
                    </div>
                    
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-red-600">
                        {Math.floor((new Date().getTime() - new Date(user.blockDate).getTime()) / (1000 * 60 * 60 * 24))}
                      </div>
                      <div className="text-xs text-gray-600">Dias Bloqueado</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum usuário bloqueado encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}