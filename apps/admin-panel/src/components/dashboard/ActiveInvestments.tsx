import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { TrendingUp, Clock, DollarSign, Calendar } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface ActiveInvestmentsProps {
  onBack?: () => void;
}

export function ActiveInvestments({ onBack }: ActiveInvestmentsProps) {
  const activeInvestments = [
    {
      id: 1,
      planName: 'Pack Premium',
      amount: 'R$ 5.000,00',
      dailyRate: '4%',
      startDate: '2025-06-15',
      endDate: '2025-07-15',
      daysRemaining: 4,
      totalDays: 30,
      earnedToday: 'R$ 200,00',
      totalEarned: 'R$ 5.200,00',
      status: 'active',
      nextPayment: '16:30'
    },
    {
      id: 2,
      planName: 'Pack Padrão',
      amount: 'R$ 2.000,00',
      dailyRate: '3%',
      startDate: '2025-06-01',
      endDate: '2025-07-01',
      daysRemaining: 0,
      totalDays: 30,
      earnedToday: 'R$ 0,00',
      totalEarned: 'R$ 1.800,00',
      status: 'completed',
      nextPayment: 'Finalizado'
    },
    {
      id: 3,
      planName: 'Pack Elite',
      amount: 'R$ 10.000,00',
      dailyRate: '5%',
      startDate: '2025-07-01',
      endDate: '2025-07-31',
      daysRemaining: 20,
      totalDays: 30,
      earnedToday: 'R$ 500,00',
      totalEarned: 'R$ 5.000,00',
      status: 'active',
      nextPayment: '16:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'completed':
        return 'Finalizado';
      case 'pending':
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investimentos Ativos</h1>
          <p className="text-gray-600">Acompanhe o desempenho dos seus investimentos</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Total Investido</div>
          <div className="text-2xl font-bold text-blue-600">R$ 17.000,00</div>
        </div>
      </div>

      <div className="grid gap-6">
        {activeInvestments.map((investment) => (
          <Card key={investment.id} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{investment.planName}</CardTitle>
                    <p className="text-gray-600">Investimento: {investment.amount}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={getStatusColor(investment.status)}>
                    {getStatusText(investment.status)}
                  </Badge>
                  <div className="text-sm text-gray-500">
                    {investment.dailyRate} ao dia
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Progresso</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Dias restantes</span>
                      <span className="font-medium">{investment.daysRemaining} de {investment.totalDays}</span>
                    </div>
                    <Progress 
                      value={((investment.totalDays - investment.daysRemaining) / investment.totalDays) * 100} 
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Rendimento Hoje</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {investment.earnedToday}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total ganho: {investment.totalEarned}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Próximo Pagamento</span>
                  </div>
                  <div className="text-lg font-medium">
                    {investment.nextPayment}
                  </div>
                  <div className="text-sm text-gray-500">
                    Data: {new Date(investment.endDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Período</div>
                  <div className="text-sm">
                    <div>Início: {new Date(investment.startDate).toLocaleDateString('pt-BR')}</div>
                    <div>Fim: {new Date(investment.endDate).toLocaleDateString('pt-BR')}</div>
                  </div>
                  {investment.status === 'active' && (
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Ver Detalhes →
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Resumo dos Investimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Total de Planos</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">Planos Ativos</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600">R$ 15.000,00</div>
              <div className="text-sm text-gray-600">Valor Ativo</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">R$ 700,00</div>
              <div className="text-sm text-gray-600">Rendimento Diário</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}