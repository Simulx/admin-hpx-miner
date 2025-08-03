import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface MyEarningsProps {
  onBack?: () => void;
}

export function MyEarnings({ onBack }: MyEarningsProps) {
  const [timers, setTimers] = useState<{[key: number]: {hours: number, minutes: number, seconds: number}}>({});

  const earningsData = [
    {
      id: 1,
      planName: 'Pack Premium',
      dailyEarning: 'R$ 200,00',
      maxEarning: 'R$ 8.000,00',
      rate: '4%',
      investment: 'R$ 5.000,00',
      nextPayment: { hours: 16, minutes: 30, seconds: 45 }
    },
    {
      id: 2,
      planName: 'Pack Elite',
      dailyEarning: 'R$ 500,00',
      maxEarning: 'R$ 15.000,00',
      rate: '5%',
      investment: 'R$ 10.000,00',
      nextPayment: { hours: 16, minutes: 30, seconds: 45 }
    },
    {
      id: 3,
      planName: 'Pack Premium',
      dailyEarning: 'R$ 200,00',
      maxEarning: 'R$ 8.000,00',
      rate: '4%',
      investment: 'R$ 5.000,00',
      nextPayment: { hours: 16, minutes: 30, seconds: 45 }
    },
    {
      id: 4,
      planName: 'Pack Elite',
      dailyEarning: 'R$ 500,00',
      maxEarning: 'R$ 15.000,00',
      rate: '5%',
      investment: 'R$ 10.000,00',
      nextPayment: { hours: 16, minutes: 30, seconds: 45 }
    },
    {
      id: 5,
      planName: 'Pack Premium',
      dailyEarning: 'R$ 200,00',
      maxEarning: 'R$ 8.000,00',
      rate: '4%',
      investment: 'R$ 5.000,00',
      nextPayment: { hours: 16, minutes: 30, seconds: 45 }
    }
  ];

  // Initialize timers
  useEffect(() => {
    const initialTimers: {[key: number]: {hours: number, minutes: number, seconds: number}} = {};
    earningsData.forEach(earning => {
      initialTimers[earning.id] = {
        hours: earning.nextPayment.hours,
        minutes: earning.nextPayment.minutes,
        seconds: earning.nextPayment.seconds
      };
    });
    setTimers(initialTimers);
  }, []);

  // Update timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const newTimers = { ...prev };
        Object.keys(newTimers).forEach(key => {
          const numKey = parseInt(key);
          let { hours, minutes, seconds } = newTimers[numKey];
          
          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else {
            // Reset to 24 hours when countdown reaches 0
            hours = 23;
            minutes = 59;
            seconds = 59;
          }
          
          newTimers[numKey] = { hours, minutes, seconds };
        });
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const totalToday = earningsData.reduce((sum, e) => sum + parseFloat(e.dailyEarning.replace('R$ ', '').replace('.', '').replace(',', '.')), 0);
  const totalWeek = 4900;
  const totalMonth = 21000;

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Rendimentos</h1>
          <p className="text-gray-600">Acompanhe seus ganhos diários em tempo real</p>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalToday.toFixed(2).replace('.', ',')}</div>
            <p className="text-xs text-muted-foreground">Aguardando pagamento</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalWeek.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">+15% vs semana anterior</p>
            <div className="mt-2 text-sm text-green-600">↗ Crescimento</div>
          </CardContent>
        </Card>

        <Card className="shadow-custom">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">Meta: R$ 25.000,00</p>
            <Progress value={84} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Earnings History */}
      <Card>
        <CardHeader>
          <CardTitle>Investimentos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Plano</th>
                  <th className="text-left py-3 px-4">Taxa</th>
                  <th className="text-left py-3 px-4">Rendimento diário</th>
                  <th className="text-left py-3 px-4">Rendimento máximo</th>
                  <th className="text-center py-3 px-4">Próximo rendimento em</th>
                </tr>
              </thead>
              <tbody>
                {earningsData.map((earning) => (
                  <tr key={earning.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{earning.planName}</td>
                    <td className="py-3 px-4">{earning.rate}</td>
                    <td className="py-3 px-4 font-bold text-green-600">{earning.dailyEarning}</td>
                    <td className="py-3 px-4 font-bold">{earning.maxEarning}</td>
                    <td className="py-3 px-4">
                      {timers[earning.id] && (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="bg-[rgba(255,155,51,1)] text-white px-2 py-1 rounded-[100px] text-sm font-bold min-w-[2rem] text-center text-[12px]">
                            {timers[earning.id].hours.toString().padStart(2, '0')}
                          </div>
                          <span className="text-gray-400 font-bold">:</span>
                          <div className="bg-[rgba(255,155,51,1)] text-white px-2 py-1 rounded-[100px] text-sm font-bold min-w-[2rem] text-center">
                            {timers[earning.id].minutes.toString().padStart(2, '0')}
                          </div>
                          <span className="text-gray-400 font-bold">:</span>
                          <div className="bg-[rgba(255,155,51,1)] text-white px-2 py-1 rounded-[100px] text-sm font-bold min-w-[2rem] text-center">
                            {timers[earning.id].seconds.toString().padStart(2, '0')}
                          </div>
                        </div>
                      )}
                      <div className="text-xs text-gray-500 text-center mt-1">
                        <span>Horas</span>
                        <span className="mx-3">Minutos</span>
                        <span>Segs</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}