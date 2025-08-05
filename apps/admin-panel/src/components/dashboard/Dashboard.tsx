import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, DollarSign, Gift, Target, Users, Coins } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel do Usuário</h1>
          <p className="text-gray-600">Bem-vindo de volta! Aqui está o resumo dos seus investimentos.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Última atualização</p>
          <p className="font-medium">11 de Julho, 2025 - 14:30</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Plano Atual */}
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Plano Atual</CardTitle>
            <Target className="h-4 w-4 opacity-90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Pack Premium</div>
            <p className="text-xs opacity-90">4% ao dia de rendimento</p>
            <div className="mt-2 text-sm opacity-90">
              Expira em: <span className="font-medium">15 dias</span>
            </div>
          </CardContent>
        </Card>

        {/* Saldo Disponível */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.450,00</div>
            <p className="text-xs text-muted-foreground">Disponível para saque</p>
            <div className="mt-2">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Solicitar Retirada →
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Bônus Desbloqueável */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bônus Desbloqueável</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 850,00</div>
            <p className="text-xs text-muted-foreground">Disponível em 3 dias</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Total Investido */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investido</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 15.000,00</div>
            <p className="text-xs text-muted-foreground">Desde Janeiro 2025</p>
            <div className="mt-2 text-sm text-green-600">
              +12.5% este mês
            </div>
          </CardContent>
        </Card>

        {/* Total de Rendimentos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Rendimentos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ 4.850,00</div>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>Próprios: R$ 3.200,00</div>
              <div>Por indicação: R$ 1.650,00</div>
            </div>
          </CardContent>
        </Card>

        {/* Total de Pontos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pontos</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">8,450</div>
            <p className="text-xs text-muted-foreground">Nível: Premium</p>
            <div className="mt-2 text-sm text-yellow-600">
              1.550 para próximo nível
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Card de Indicações */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Programa de Indicação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-gray-600">Total de Indicados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">R$ 1.650,00</div>
              <div className="text-sm text-gray-600">Bônus Recebido</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Níveis Ativos</div>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Ver Programa de Indicação →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}