import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Users, Share2, DollarSign, TrendingUp, Copy, ExternalLink, ArrowLeft, Calendar } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface ReferralProgramProps {
  onBack?: () => void;
  networkUser?: any;
}

export function ReferralProgram({ onBack, networkUser }: ReferralProgramProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Dados específicos do usuário ou dados padrão
  const currentUserData = networkUser || {
    name: 'Usuário Atual',
    email: 'usuario@example.com'
  };

  const referralStats = networkUser ? {
    totalReferrals: 32,
    totalEarnings: 2850.00,
    thisMonth: 620.00,
    activeReferrals: 28
  } : {
    totalReferrals: 24,
    totalEarnings: 1650.00,
    thisMonth: 485.00,
    activeReferrals: 18
  };

  const referralData = [
    {
      id: 1,
      name: 'Jesus the King',
      email: 'jesus@example.com',
      level: 1,
      earnings: 5150.00,
      members: 89,
      directReferrals: 18,
      status: 'active',
      joinDate: '2025-01-15',
      avatar: null
    },
    {
      id: 2,
      name: 'Bernice Morton',
      email: 'bernice@example.com',
      level: 2,
      earnings: 1200.00,
      members: 890,
      directReferrals: 0,
      status: 'active',
      joinDate: '2025-02-10',
      avatar: null
    },
    {
      id: 3,
      name: 'Kyle Padilla',
      email: 'kyle@example.com',
      level: 2,
      earnings: 486.05,
      members: 64,
      directReferrals: 0,
      status: 'dispute',
      joinDate: '2025-03-05',
      avatar: null
    },
    {
      id: 4,
      name: 'Cordelia Ellis',
      email: 'cordelia@example.com',
      level: 3,
      earnings: 725.00,
      members: 0,
      directReferrals: 0,
      status: 'active',
      joinDate: '2025-03-20',
      avatar: null
    },
    {
      id: 5,
      name: 'Emmanuel Irvlin',
      email: 'emmanuel@example.com',
      level: 3,
      earnings: 8200.00,
      members: 5,
      directReferrals: 0,
      status: 'active',
      joinDate: '2025-04-01',
      avatar: null
    },
    {
      id: 6,
      name: 'Lenora Pope',
      email: 'lenora@example.com',
      level: 4,
      earnings: 2314.00,
      members: 0,
      directReferrals: 0,
      status: 'active',
      joinDate: '2025-04-15',
      avatar: null
    },
    {
      id: 7,
      name: 'Luvetta McKenzie',
      email: 'luvetta@example.com',
      level: 4,
      earnings: 521.00,
      members: 34,
      directReferrals: 0,
      status: 'active',
      joinDate: '2025-05-01',
      avatar: null
    }
  ];

  // Dados mock dos indicados por nível
  // Dados mock dos indicados por nível baseados no usuário
  const levelReferrals = networkUser ? {
    1: [
      { id: 1, name: 'Carlos Mendes', plan: 'Pack Premium', bonusGenerated: 320.00, createdAt: '08/07/2024', email: 'carlos.mendes@example.com' },
      { id: 2, name: 'Ana Paula Costa', plan: 'Pack Elite', bonusGenerated: 750.00, createdAt: '10/07/2024', email: 'ana.costa@example.com' },
      { id: 3, name: 'Roberto Lima', plan: 'Pack Padrão', bonusGenerated: 180.00, createdAt: '12/07/2024', email: 'roberto.lima@example.com' },
      { id: 4, name: 'Fernanda Santos', plan: 'Pack Básico', bonusGenerated: 95.00, createdAt: '14/07/2024', email: 'fernanda.santos@example.com' },
      { id: 5, name: 'Paulo Sousa', plan: 'Pack Premium', bonusGenerated: 420.00, createdAt: '16/07/2024', email: 'paulo.sousa@example.com' },
    ],
    2: [
      { id: 6, name: 'Juliana Torres', plan: 'Pack Padrão', bonusGenerated: 165.00, createdAt: '18/07/2024', email: 'juliana.torres@example.com' },
      { id: 7, name: 'Ricardo Alves', plan: 'Pack Elite', bonusGenerated: 650.00, createdAt: '20/07/2024', email: 'ricardo.alves@example.com' },
      { id: 8, name: 'Mariana Oliveira', plan: 'Pack Básico', bonusGenerated: 125.00, createdAt: '22/07/2024', email: 'mariana.oliveira@example.com' },
    ],
    3: [
      { id: 9, name: 'Diego Pereira', plan: 'Pack Premium', bonusGenerated: 280.00, createdAt: '24/07/2024', email: 'diego.pereira@example.com' },
      { id: 10, name: 'Gabriela Nunes', plan: 'Pack Padrão', bonusGenerated: 145.00, createdAt: '26/07/2024', email: 'gabriela.nunes@example.com' },
    ],
    4: [
      { id: 11, name: 'Bruno Martins', plan: 'Pack Elite', bonusGenerated: 580.00, createdAt: '28/07/2024', email: 'bruno.martins@example.com' },
      { id: 12, name: 'Camila Sousa', plan: 'Pack Básico', bonusGenerated: 85.00, createdAt: '30/07/2024', email: 'camila.sousa@example.com' },
    ],
    5: [
      { id: 13, name: 'Rafael Carvalho', plan: 'Pack Padrão', bonusGenerated: 110.00, createdAt: '01/08/2024', email: 'rafael.carvalho@example.com' },
      { id: 14, name: 'Larissa Ribeiro', plan: 'Pack Premium', bonusGenerated: 260.00, createdAt: '03/08/2024', email: 'larissa.ribeiro@example.com' },
    ]
  } : {
    1: [
      { id: 1, name: 'João Silva', plan: 'Pack Padrão', bonusGenerated: 100.00, createdAt: '10/05/2024', email: 'joao@example.com' },
      { id: 2, name: 'Maria Santos', plan: 'Pack Básico', bonusGenerated: 85.50, createdAt: '12/05/2024', email: 'maria@example.com' },
      { id: 3, name: 'Carlos Oliveira', plan: 'Pack Premium', bonusGenerated: 250.00, createdAt: '15/05/2024', email: 'carlos@example.com' },
      { id: 4, name: 'Ana Costa', plan: 'Pack Padrão', bonusGenerated: 120.00, createdAt: '18/05/2024', email: 'ana@example.com' },
      { id: 5, name: 'Pedro Lima', plan: 'Pack Elite', bonusGenerated: 500.00, createdAt: '20/05/2024', email: 'pedro@example.com' },
    ],
    2: [
      { id: 6, name: 'Lucas Ferreira', plan: 'Pack Básico', bonusGenerated: 75.00, createdAt: '22/05/2024', email: 'lucas@example.com' },
      { id: 7, name: 'Julia Rodrigues', plan: 'Pack Padrão', bonusGenerated: 110.00, createdAt: '25/05/2024', email: 'julia@example.com' },
      { id: 8, name: 'Rafael Alves', plan: 'Pack Premium', bonusGenerated: 200.00, createdAt: '28/05/2024', email: 'rafael@example.com' },
    ],
    3: [
      { id: 9, name: 'Camila Sousa', plan: 'Pack Básico', bonusGenerated: 60.00, createdAt: '01/06/2024', email: 'camila@example.com' },
      { id: 10, name: 'Bruno Martins', plan: 'Pack Padrão', bonusGenerated: 95.00, createdAt: '05/06/2024', email: 'bruno@example.com' },
    ],
    4: [
      { id: 11, name: 'Fernanda Ribeiro', plan: 'Pack Premium', bonusGenerated: 180.00, createdAt: '08/06/2024', email: 'fernanda@example.com' },
      { id: 12, name: 'Roberto Carvalho', plan: 'Pack Elite', bonusGenerated: 400.00, createdAt: '12/06/2024', email: 'roberto@example.com' },
    ],
    5: [
      { id: 13, name: 'Gabriela Nunes', plan: 'Pack Básico', bonusGenerated: 50.00, createdAt: '15/06/2024', email: 'gabriela@example.com' },
      { id: 14, name: 'Diego Pereira', plan: 'Pack Padrão', bonusGenerated: 85.00, createdAt: '18/06/2024', email: 'diego@example.com' },
    ]
  };

  const levelColors = {
    1: 'bg-blue-100 text-blue-800',
    2: 'bg-green-100 text-green-800',
    3: 'bg-purple-100 text-purple-800',
    4: 'bg-yellow-100 text-yellow-800',
    5: 'bg-red-100 text-red-800'
  };

  const levelGradients = {
    1: 'from-blue-400 to-blue-600',
    2: 'from-purple-400 to-purple-600',
    3: 'from-emerald-400 to-emerald-600',
    4: 'from-amber-400 to-orange-500',
    5: 'from-red-400 to-red-600'
  };

  const levelStats = networkUser ? {
    1: { count: 89, bonus: 5150.00 },
    2: { count: 45, bonus: 2010.00 },
    3: { count: 23, bonus: 920.00 },
    4: { count: 12, bonus: 480.00 },
    5: { count: 8, bonus: 240.00 }
  } : {
    1: { count: 89, bonus: 5150.00 },
    2: { count: 45, bonus: 2010.00 },
    3: { count: 23, bonus: 920.00 },
    4: { count: 12, bonus: 480.00 },
    5: { count: 8, bonus: 240.00 }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const referralLink = networkUser ? 
    `https://hpxminer.com/ref/${networkUser.name.toLowerCase().replace(/\s+/g, '')}` : 
    "https://hpxminer.com/ref/user12345";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // You could add a toast notification here
  };

  const handleLevelClick = (level: number) => {
    setSelectedLevel(level);
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
  };

  const formatDate = (dateString: string) => {
    return dateString;
  };

  const formatCurrency = (amount: number) => {
    return `R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const renderLevelTable = (level: number) => {
    const referrals = levelReferrals[level as keyof typeof levelReferrals] || [];
    const stats = levelStats[level as keyof typeof levelStats];
    const gradient = levelGradients[level as keyof typeof levelGradients];

    return (
      <div className="space-y-6">
        {/* Header com botão voltar */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackToLevels}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar aos Níveis</span>
          </button>
        </div>

        {/* Cabeçalho do nível */}
        <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Nível {level}</h2>
                <p className="text-white/80">
                  {networkUser 
                    ? `Indicados de ${networkUser.name} - Nível ${level}` 
                    : 'Indicados diretos e seus detalhes'
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{stats.count}</div>
              <div className="text-white/80">Indicados</div>
            </div>
          </div>
        </div>

        {/* Tabela de indicados */}
        <Card className="shadow-custom">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>
                {networkUser 
                  ? `Indicados de ${networkUser.name} - Nível ${level}` 
                  : `Indicados do Nível ${level}`
                }
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Plano</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Bônus Gerado</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Data de Criação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {getInitials(referral.name)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{referral.name}</div>
                            <div className="text-sm text-gray-500">{referral.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge 
                          className={`${
                            referral.plan === 'Pack Básico' ? 'bg-blue-100 text-blue-800' :
                            referral.plan === 'Pack Padrão' ? 'bg-purple-100 text-purple-800' :
                            referral.plan === 'Pack Premium' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {referral.plan}
                        </Badge>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="font-semibold text-green-600">
                          {formatCurrency(referral.bonusGenerated)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end space-x-1 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(referral.createdAt)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Resumo da tabela */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Total de {referrals.length} indicados no Nível {level}
                </div>
                <div className="text-lg font-semibold text-green-600">
                  Total de Bônus: {formatCurrency(stats.bonus)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Se um nível está selecionado, mostrar a tabela
  if (selectedLevel) {
    return (
      <div className="space-y-8">
        <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
        {renderLevelTable(selectedLevel)}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {networkUser ? `Rede de Indicação - ${networkUser.name}` : 'Programa de Indicação'}
          </h1>
          <p className="text-gray-600">
            {networkUser 
              ? `Visualizando a rede de indicação de ${networkUser.name}` 
              : 'Ganhe até 5 níveis de comissão com suas indicações'
            }
          </p>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-custom" style={{ border: '1px solid rgba(255, 155, 51, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Indicados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">{referralStats.activeReferrals} ativos</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom" style={{ border: '1px solid rgba(255, 155, 51, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganhos Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {referralStats.totalEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Desde o início</p>
          </CardContent>
        </Card>

        
        <Card className="shadow-custom" style={{ border: '1px solid rgba(255, 155, 51, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Níveis Ativos</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">4</div>
            <p className="text-xs text-muted-foreground">de 5 níveis possíveis</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Link */}
      <Card className="bg-blue-50 border-blue-200 w-3/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <span>{networkUser ? `Link de Indicação - ${networkUser.name}` : 'Seu Link de Indicação'}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input 
              type="text" 
              value={referralLink}
              readOnly
              className="flex-1 p-3 bg-white border border-gray-300 rounded-lg text-sm"
            />
            <button 
              onClick={copyToClipboard}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copiar</span>
            </button>
            <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Multi Level Units */}
      <Card>
        <CardHeader>
          <CardTitle>Rede de Indicações Multi-Nível</CardTitle>
          
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Título destacado */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Rede de Indicações Multi-Nível</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Modern Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
              {/* Nível 1 */}
              <div className="group relative cursor-pointer" onClick={() => handleLevelClick(1)}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-custom hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-4 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">1</span>
                      </div>
                    </div>
                    
                    {/* Level */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nível 1</h3>
                    
                    {/* Stats */}
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">89</div>
                        <div className="text-sm text-blue-700">Indicados</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">R$ 5.150,00</div>
                        <div className="text-sm text-green-700">Bônus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nível 2 */}
              <div className="group relative cursor-pointer" onClick={() => handleLevelClick(2)}>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-custom hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200">
                  <div className="text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-4 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">2</span>
                      </div>
                    </div>
                    
                    {/* Level */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nível 2</h3>
                    
                    {/* Stats */}
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-purple-600">45</div>
                        <div className="text-sm text-purple-700">Indicados</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">R$ 2.010,00</div>
                        <div className="text-sm text-green-700">Bônus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nível 3 */}
              <div className="group relative cursor-pointer" onClick={() => handleLevelClick(3)}>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-custom hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                  <div className="text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-4 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">3</span>
                      </div>
                    </div>
                    
                    {/* Level */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nível 3</h3>
                    
                    {/* Stats */}
                    <div className="space-y-3">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-emerald-600">23</div>
                        <div className="text-sm text-emerald-700">Indicados</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">R$ 920,00</div>
                        <div className="text-sm text-green-700">Bônus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nível 4 */}
              <div className="group relative cursor-pointer" onClick={() => handleLevelClick(4)}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-custom hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-amber-200">
                  <div className="text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-4 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">4</span>
                      </div>
                    </div>
                    
                    {/* Level */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nível 4</h3>
                    
                    {/* Stats */}
                    <div className="space-y-3">
                      <div className="bg-amber-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-amber-600">12</div>
                        <div className="text-sm text-amber-700">Indicados</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">R$ 480,00</div>
                        <div className="text-sm text-green-700">Bônus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nível 5 */}
              <div className="group relative cursor-pointer" onClick={() => handleLevelClick(5)}>
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-custom hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-red-200">
                  <div className="text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-4 relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">5</span>
                      </div>
                    </div>
                    
                    {/* Level */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nível 5</h3>
                    
                    {/* Stats */}
                    <div className="space-y-3">
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-red-600">8</div>
                        <div className="text-sm text-red-700">Indicados</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">R$ 240,00</div>
                        <div className="text-sm text-green-700">Bônus</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Summary Card */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-6 shadow-custom border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Total de Indicados</div>
                      <div className="text-2xl font-bold text-gray-900">177</div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">Total em Bônus</div>
                      <div className="text-2xl font-bold text-green-600">R$ 8.800,00</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Atualizado em tempo real</span>
                </div>
              </div>
            </div>

            {/* Informações adicionais */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-blue-700">Nível Mais Ativo</span>
                </div>
                <p className="text-lg font-bold text-blue-900">Nível 1</p>
                <p className="text-sm text-blue-600">89 indicados ativos</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-green-700">Maior Rendimento</span>
                </div>
                <p className="text-lg font-bold text-green-900">R$ 5.150,00</p>
                <p className="text-sm text-green-600">Nível 1 - Maior retorno</p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-purple-700">Potencial de Crescimento</span>
                </div>
                <p className="text-lg font-bold text-purple-900">Nível 2</p>
                <p className="text-sm text-purple-600">45 indicados em expansão</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Commission Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Estrutura de Comissões</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((level) => (
              <div key={level} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{level}º</div>
                <div className="text-sm text-gray-600">Nível</div>
                <div className="text-lg font-medium mt-2">
                  {level === 1 ? '10%' : level === 2 ? '5%' : level === 3 ? '3%' : level === 4 ? '2%' : '1%'}
                </div>
                <div className="text-xs text-gray-500">comissão</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}