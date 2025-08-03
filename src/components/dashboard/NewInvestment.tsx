import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { Check, Star, Crown, Zap, X, DollarSign, Smartphone } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface NewInvestmentProps {
  onBack?: () => void;
}

export function NewInvestment({ onBack }: NewInvestmentProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState<any>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Pack Básico',
      dailyRate: '2%',
      minInvestment: 100,
      maxInvestment: 1000,
      duration: '30 dias',
      totalReturn: '60%',
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Rendimento diário garantido',
        'Saque disponível 24/7',
        'Suporte técnico premium'
      ],
      popular: false
    },
    {
      id: 'standard',
      name: 'Pack Padrão',
      dailyRate: '3%',
      minInvestment: 1000,
      maxInvestment: 5000,
      duration: '45 dias',
      totalReturn: '135%',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Rendimento diário garantido',
        'Saque disponível 24/7',
        'Suporte técnico premium',
        'Bônus de indicação aumentado'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Pack Premium',
      dailyRate: '4%',
      minInvestment: 5000,
      maxInvestment: 15000,
      duration: '60 dias',
      totalReturn: '240%',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      features: [
        'Rendimento diário garantido',
        'Saque disponível 24/7',
        'Suporte técnico premium',
        'Bônus de indicação máximo',
        'Atendimento VIP'
      ],
      popular: false
    },
    {
      id: 'elite',
      name: 'Pack Elite',
      dailyRate: '5%',
      minInvestment: 15000,
      maxInvestment: 50000,
      duration: '90 dias',
      totalReturn: '450%',
      icon: Crown,
      color: 'from-yellow-500 to-orange-600',
      features: [
        'Rendimento diário garantido',
        'Saque disponível 24/7',
        'Suporte técnico premium',
        'Bônus de indicação máximo',
        'Atendimento VIP',
        'Consultoria personalizada'
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan.id);
    setSelectedPlanData(plan);
    setShowPaymentCard(true);
    setDepositAmount('');
  };

  const handleCancelPayment = () => {
    setShowPaymentCard(false);
    setShowPaymentMethod(false);
    setSelectedPlan(null);
    setSelectedPlanData(null);
    setDepositAmount('');
  };

  const handleChoosePaymentMethod = () => {
    if (depositAmount && parseFloat(depositAmount.replace(',', '.')) >= selectedPlanData.minInvestment && parseFloat(depositAmount.replace(',', '.')) <= selectedPlanData.maxInvestment) {
      setShowPaymentMethod(true);
    }
  };

  const handlePaymentMethodSelect = (method: string) => {
    console.log('Payment method selected:', method, 'Amount:', depositAmount, 'Plan:', selectedPlanData.name);
    // Aqui você pode adicionar a lógica para processar o investimento
    handleCancelPayment();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFCF7' }}>
      <div className="space-y-8 p-4">
        <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Novo Investimento</h1>
            <p className="text-gray-600">Escolha o melhor plano para seus objetivos</p>
          </div>
        </div>

        {/* Investment Plans Grid - Hidden when payment card is shown */}
        {!showPaymentCard && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={plan.id} 
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    selectedPlan === plan.id ? 'ring-2 ring-blue-500 shadow-2xl' : ''
                  } ${plan.popular ? 'border-2 border-yellow-400' : ''} shadow-custom`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        Mais Popular
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pt-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">{plan.name}</CardTitle>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-blue-600">{plan.dailyRate}</div>
                      <div className="text-gray-600">ao dia</div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Mínimo:</span>
                        <span className="font-bold">R$ {plan.minInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Máximo:</span>
                        <span className="font-bold">R$ {plan.maxInvestment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duração:</span>
                        <span className="font-bold">{plan.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Retorno Total:</span>
                        <span className="font-bold text-green-600">{plan.totalReturn}</span>
                      </div>
                    </div>
                    
                    
                    
                    <Button 
                      className={`w-full ${
                        selectedPlan === plan.id 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlan(plan);
                      }}
                    >
                      {selectedPlan === plan.id ? 'Selecionado' : 'Selecionar Plano'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}



        {/* Payment Card */}
        {showPaymentCard && !showPaymentMethod && selectedPlanData && (
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <Card className="bg-white text-gray-900 border-gray-200 shadow-custom">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-center text-lg font-bold flex-1 text-gray-900">
                    {selectedPlanData.name}
                  </CardTitle>
                  <Button
                    onClick={handleCancelPayment}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:bg-gray-100 p-1 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Linha divisória */}
                  <div className="border-t border-gray-200"></div>
                  
                  {/* Valor de Depósito */}
                  <div className="text-center">
                    <p className="text-gray-700 mb-2">Valor de Depósito</p>
                    <p className="text-sm text-gray-600">
                      (Valores entre{' '}
                      <span style={{ color: '#FF9B33' }} className="font-bold">
                        R$ {selectedPlanData.minInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      {' '}e{' '}
                      <span style={{ color: '#FF9B33' }} className="font-bold">
                        R$ {selectedPlanData.maxInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      )
                    </p>
                  </div>
                  
                  {/* Linha divisória */}
                  <div className="border-t border-gray-200"></div>
                  
                  {/* Campo de entrada */}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">R$</span>
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0,00"
                      className="bg-input-background border-2 border-primary text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                      min={selectedPlanData.minInvestment}
                      max={selectedPlanData.maxInvestment}
                    />
                  </div>
                  
                  {/* Botões */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={handleCancelPayment}
                      variant="outline"
                      className="flex-1 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleChoosePaymentMethod}
                      className="flex-1 text-white hover:opacity-90"
                      style={{ backgroundColor: '#FF9B33' }}
                      disabled={
                        !depositAmount || 
                        parseFloat(depositAmount.replace(',', '.')) < selectedPlanData.minInvestment || 
                        parseFloat(depositAmount.replace(',', '.')) > selectedPlanData.maxInvestment
                      }
                    >
                      ESCOLHER FORMA DE PAGAMENTO
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Payment Method Selection Card */}
        {showPaymentMethod && (
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <Card className="bg-white text-gray-900 border-gray-200 shadow-custom">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Escolha a Forma de Pagamento
                  </CardTitle>
                  <div className="w-16 h-1 mx-auto mt-2" style={{ backgroundColor: '#FF9B33' }}></div>
                  <p className="text-sm text-gray-600 mt-2">
                    Plano: {selectedPlanData.name} | Valor: R$ {parseFloat(depositAmount.replace(',', '.')).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* PIX Option */}
                    <Button
                      onClick={() => handlePaymentMethodSelect('PIX')}
                      variant="outline"
                      className="h-auto p-6 flex flex-col items-center space-y-3 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">Pagar via Pix</span>
                    </Button>

                    {/* USDT Option */}
                    <Button
                      onClick={() => handlePaymentMethodSelect('USDT')}
                      variant="outline"
                      className="h-auto p-6 flex flex-col items-center space-y-3 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-medium text-gray-900">Pagar via USDT</span>
                    </Button>
                  </div>

                  {/* Cancel Button */}
                  <div className="pt-4">
                    <Button
                      onClick={() => setShowPaymentMethod(false)}
                      variant="outline"
                      className="w-full bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Voltar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}