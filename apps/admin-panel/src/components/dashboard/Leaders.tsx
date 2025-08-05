import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Crown, Search, TrendingUp, Users, DollarSign, MoreVertical, Eye, UserMinus, MessageCircle } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface LeadersProps {
  onBack?: () => void;
}

export function Leaders({ onBack }: LeadersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('performance');

  const leaders = [
    {
      id: 2,
      name: 'Maria Oliveira',
      email: 'maria@email.com',
      phone: '(11) 88888-8888',
      cpf: '987.654.321-00',
      totalInvested: 50000.00,
      totalEarnings: 12500.00,
      networkSize: 23,
      monthlyEarnings: 3200.00,
      performanceScore: 94.5,
      joinDate: '2024-11-20',
      lastLogin: '2025-07-11 16:15',
      avatar: null,
      status: 'active'
    },
    {
      id: 5,
      name: 'Carlos Ferreira',
      email: 'carlos@email.com',
      phone: '(11) 55555-5555',
      cpf: '321.654.987-00',
      totalInvested: 75000.00,
      totalEarnings: 22750.00,
      networkSize: 42,
      monthlyEarnings: 5800.00,
      performanceScore: 97.2,
      joinDate: '2024-08-05',
      lastLogin: '2025-07-11 18:00',
      avatar: null,
      status: 'active'
    },
    {
      id: 7,
      name: 'Ana Costa Silva',
      email: 'ana@email.com',
      phone: '(11) 44444-4444',
      cpf: '654.321.987-00',
      totalInvested: 30000.00,
      totalEarnings: 8750.00,
      networkSize: 18,
      monthlyEarnings: 2100.00,
      performanceScore: 89.3,
      joinDate: '2024-12-10',
      lastLogin: '2025-07-11 11:45',
      avatar: null,
      status: 'active'
    },
    {
      id: 9,
      name: 'Roberto Santos',
      email: 'roberto@email.com',
      phone: '(11) 33333-3333',
      cpf: '789.123.456-00',
      totalInvested: 45000.00,
      totalEarnings: 13200.00,
      networkSize: 31,
      monthlyEarnings: 3900.00,
      performanceScore: 91.8,
      joinDate: '2024-09-15',
      lastLogin: '2025-07-11 09:30',
      avatar: null,
      status: 'active'
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 95) return 'bg-green-100 text-green-800';
    if (score >= 85) return 'bg-blue-100 text-blue-800';
    if (score >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-orange-100 text-orange-800';
  };

  const getPerformanceText = (score: number) => {
    if (score >= 95) return 'Excelente';
    if (score >= 85) return 'Muito Bom';
    if (score >= 75) return 'Bom';
    return 'Regular';
  };

  const filteredLeaders = leaders.filter(leader => 
    leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leader.cpf.includes(searchTerm)
  );

  const sortedLeaders = [...filteredLeaders].sort((a, b) => {
    switch (sortBy) {
      case 'performance':
        return b.performanceScore - a.performanceScore;
      case 'earnings':
        return b.monthlyEarnings - a.monthlyEarnings;
      case 'network':
        return b.networkSize - a.networkSize;
      case 'investment':
        return b.totalInvested - a.totalInvested;
      default:
        return 0;
    }
  });

  // Calculate totals
  const totalLeaders = leaders.length;
  const totalNetworkSize = leaders.reduce((sum, leader) => sum + leader.networkSize, 0);
  const totalMonthlyEarnings = leaders.reduce((sum, leader) => sum + leader.monthlyEarnings, 0);
  const avgPerformance = leaders.reduce((sum, leader) => sum + leader.performanceScore, 0) / leaders.length;

  const handleRemoveLeader = (leaderId: number) => {
    console.log('Removing leader:', leaderId);
  };

  const handleSendMessage = (leaderId: number) => {
    console.log('Sending message to leader:', leaderId);
  };

  const handleViewDetails = (leaderId: number) => {
    console.log('Viewing leader details:', leaderId);
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Líderes da Rede</h1>
          <p className="text-gray-600">Gerencie e monitore o desempenho dos líderes da plataforma</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Crown className="w-4 h-4" />
          <span>Relatório de Líderes</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Líderes</CardTitle>
            <Crown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{totalLeaders}</div>
            <p className="text-xs text-muted-foreground">Usuários promovidos</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rede Total</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalNetworkSize}</div>
            <p className="text-xs text-muted-foreground">Usuários na rede</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendimento Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalMonthlyEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Gerado pelos líderes</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Média</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{avgPerformance.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Score de performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span>Lista de Líderes</span>
            </CardTitle>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar líder..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-64"
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="performance">Performance</option>
                <option value="earnings">Rendimentos</option>
                <option value="network">Tamanho da Rede</option>
                <option value="investment">Investimento Total</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Líder</th>
                  <th className="text-left py-3 px-4">Contato</th>
                  <th className="text-left py-3 px-4">Performance</th>
                  <th className="text-left py-3 px-4">Rede</th>
                  <th className="text-left py-3 px-4">Investido</th>
                  <th className="text-left py-3 px-4">Rendimento Mensal</th>
                  <th className="text-left py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sortedLeaders.map((leader) => (
                  <tr key={leader.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={leader.avatar || ''} />
                          <AvatarFallback className="bg-yellow-100 text-yellow-600">
                            {getInitials(leader.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="font-medium">{leader.name}</div>
                            <Crown className="w-4 h-4 text-yellow-500" />
                          </div>
                          <div className="text-sm text-gray-500">CPF: {leader.cpf}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{leader.email}</div>
                        <div className="text-gray-500">{leader.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Badge className={getPerformanceBadge(leader.performanceScore)}>
                          {getPerformanceText(leader.performanceScore)}
                        </Badge>
                        <span className={`font-medium ${getPerformanceColor(leader.performanceScore)}`}>
                          {leader.performanceScore.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-blue-600">{leader.networkSize} usuários</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-purple-600">
                        R$ {leader.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-green-600">
                        R$ {leader.monthlyEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(leader.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <Button size="sm" variant="outline" onClick={() => handleRemoveLeader(leader.id)}>
                          <UserMinus className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedLeaders.length === 0 && (
            <div className="text-center py-8">
              <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum líder encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}