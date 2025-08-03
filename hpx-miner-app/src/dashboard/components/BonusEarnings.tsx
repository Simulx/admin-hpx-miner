import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Gift, Users } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface BonusEarningsProps {
  onBack?: () => void;
}

export function BonusEarnings({ onBack }: BonusEarningsProps) {
  const bonusData = [
    {
      id: 1,
      referralName: 'Jesus the King',
      referralLevel: 1,
      bonusAmount: 250.00,
      bonusType: 'Investment Bonus',
      date: '2025-07-11',
      investmentAmount: 2500.00,
      percentage: '10%'
    },
    {
      id: 2,
      referralName: 'Bernice Morton',
      referralLevel: 2,
      bonusAmount: 60.00,
      bonusType: 'Investment Bonus',
      date: '2025-07-10',
      investmentAmount: 1200.00,
      percentage: '5%'
    },
    {
      id: 3,
      referralName: 'Kyle Padilla',
      referralLevel: 2,
      bonusAmount: 24.30,
      bonusType: 'Daily Earnings',
      date: '2025-07-10',
      investmentAmount: 486.05,
      percentage: '5%'
    },
    {
      id: 4,
      referralName: 'Emmanuel Irvlin',
      referralLevel: 3,
      bonusAmount: 246.00,
      bonusType: 'Investment Bonus',
      date: '2025-07-09',
      investmentAmount: 8200.00,
      percentage: '3%'
    },
    {
      id: 5,
      referralName: 'Lenora Pope',
      referralLevel: 4,
      bonusAmount: 46.28,
      bonusType: 'Daily Earnings',
      date: '2025-07-09',
      investmentAmount: 2314.00,
      percentage: '2%'
    }
  ];

  const monthlyStats = {
    totalBonus: 1650.00
  };

  const getLevelColor = (level: number) => {
    const colors = {
      1: 'bg-blue-100 text-blue-800',
      2: 'bg-green-100 text-green-800',
      3: 'bg-purple-100 text-purple-800',
      4: 'bg-yellow-100 text-yellow-800',
      5: 'bg-red-100 text-red-800'
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getBonusTypeColor = (type: string) => {
    return type === 'Investment Bonus' 
      ? 'bg-emerald-100 text-emerald-800' 
      : 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Extrato Bônus</h1>
          <p className="text-gray-600">Ganhos provenientes das suas indicações</p>
        </div>
      </div>

      {/* Bonus Stats */}
      <div className="flex justify-left">
        <div className="w-full max-w-sm">
          <Card className="shadow-custom" style={{ border: '1px solid rgba(255, 155, 51, 0.3)' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Bônus</CardTitle>
              <Gift className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                R$ {monthlyStats.totalBonus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">Acumulado total</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bonus Breakdown by Level */}
      <Card>
        <CardHeader>
          <CardTitle>Bônus por Nível de Indicação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((level) => {
              const levelBonus = bonusData
                .filter(b => b.referralLevel === level)
                .reduce((sum, b) => sum + b.bonusAmount, 0);
              
              return (
                <div key={level} className="text-center p-4 bg-gray-50 rounded-lg shadow-custom" style={{ border: '1px solid rgba(255, 155, 51, 0.3)' }}>
                  <div className="text-lg font-bold text-blue-600">{level}º Nível</div>
                  <div className="text-2xl font-bold text-green-600 mt-2">
                    R$ {levelBonus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {level === 1 ? '10%' : level === 2 ? '5%' : level === 3 ? '3%' : level === 4 ? '2%' : '1%'} comissão
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bonus History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Histórico de Bônus por Indicação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Data</th>
                  <th className="text-left py-3 px-4">Indicado</th>
                  <th className="text-left py-3 px-4">Nível</th>
                  <th className="text-left py-3 px-4">Tipo de Bônus</th>
                  <th className="text-left py-3 px-4">Valor Base</th>
                  <th className="text-left py-3 px-4">%</th>
                  <th className="text-left py-3 px-4">Bônus Recebido</th>
                </tr>
              </thead>
              <tbody>
                {bonusData.map((bonus) => (
                  <tr key={bonus.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {new Date(bonus.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 font-medium">{bonus.referralName}</td>
                    <td className="py-3 px-4">
                      <Badge className={getLevelColor(bonus.referralLevel)}>
                        {bonus.referralLevel}º
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={getBonusTypeColor(bonus.bonusType)}>
                        {bonus.bonusType === 'Investment Bonus' ? 'Investimento' : 'Rendimento Diário'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      R$ {bonus.investmentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 font-medium">{bonus.percentage}</td>
                    <td className="py-3 px-4 font-bold text-green-600">
                      R$ {bonus.bonusAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bonus Rules */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Como Funcionam os Bônus de Indicação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Bônus de Investimento</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Recebido quando seu indicado faz um novo investimento</li>
                <li>• Percentual varia conforme o nível (1º: 10%, 2º: 5%, etc.)</li>
                <li>• Pago imediatamente após confirmação do investimento</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Bônus de Rendimento Diário</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Percentual dos rendimentos diários dos seus indicados</li>
                <li>• Pago junto com seus rendimentos diários</li>
                <li>• Válido durante toda a duração do plano</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}