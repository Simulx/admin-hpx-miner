import React from 'react';
import { TrendingUp, DollarSign, Users, Target, ArrowUpRight, ArrowDownRight, ExternalLink, Share2, Star, User } from 'lucide-react';
import { MobileNavigation } from './MobileNavigation';
import { useIsMobile } from './ui/use-mobile';

interface ModernDashboardProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function ModernDashboard({ activeTab, setActiveTab }: ModernDashboardProps = {}) {
  const isMobile = useIsMobile();
  const statsCards = [
    {
      title: 'Saldo Rendimentos',
      value: '2.450',
      subtitle: 'Disponível',
      change: '+2.5%',
      isPositive: true,
      icon: DollarSign,
      iconGradient: 'from-blue-400 to-blue-600',
      bgGradient: 'from-orange-50 to-orange-100'
    },
    {
      title: 'Saldo Bônus',
      value: '3.250',
      subtitle: 'Bônus Acumulado',
      change: '+15.8%',
      isPositive: true,
      icon: TrendingUp,
      iconGradient: 'from-yellow-400 to-amber-600',
      bgGradient: 'from-orange-50 to-orange-100'
    },
    {
      title: 'Total Sacado',
      value: '700',
      subtitle: 'Total enviado para a conta',
      change: '+4.2%',
      isPositive: true,
      icon: TrendingUp,
      iconGradient: 'from-green-400 to-emerald-600',
      bgGradient: 'from-orange-50 to-orange-100'
    },
    {
      title: 'Total Investido',
      value: '15.000',
      subtitle: 'Capital Ativo',
      change: '+12.5%',
      isPositive: true,
      icon: Target,
      iconGradient: 'from-purple-400 to-purple-600',
      bgGradient: 'from-orange-50 to-orange-100'
    },
    {
      title: 'Total Indicados',
      value: '47',
      subtitle: 'Rede Total',
      change: '+12.3%',
      isPositive: true,
      icon: Users,
      iconGradient: 'from-indigo-400 to-indigo-600',
      bgGradient: 'from-orange-50 to-orange-100'
    },
    {
      title: 'Indicados Ativos',
      value: '24',
      subtitle: 'Rede Ativa',
      change: '+8.1%',
      isPositive: true,
      icon: Users,
      iconGradient: 'from-orange-400 to-orange-500',
      bgGradient: 'from-orange-50 to-orange-100'
    }
  ];

  const recentActivity = [
    {
      type: 'earning',
      description: 'Rendimento Pack Elite',
      amount: '+R$ 500,00',
      time: '16:30',
      isPositive: true
    },
    {
      type: 'earning',
      description: 'Rendimento Pack Premium',
      amount: '+R$ 200,00',
      time: '16:30',
      isPositive: true
    },
    {
      type: 'bonus',
      description: 'Bônus Indicação - Jesus',
      amount: '+R$ 25,00',
      time: '14:20',
      isPositive: true
    },
    {
      type: 'withdrawal',
      description: 'Saque via PIX',
      amount: '-R$ 1.000,00',
      time: '10:15',
      isPositive: false
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 text-sm sm:text-base">Visão geral dos seus investimentos</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-500">Última atualização</p>
          <p className="font-medium text-gray-900">Hoje às 16:30</p>
        </div>
      </div>

      {/* Stats Grid - Mobile: 2 colunas exatamente igual aos cards de navegação */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          
          return (
            <div
              key={index}
              className={`relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border-2 ${
                isMobile 
                  ? 'p-3 rounded-xl h-32' // Fixed height for mobile
                  : 'p-4 lg:p-6 rounded-2xl text-left'
              }`}
              style={{ borderColor: '#f5a90030' }}
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 opacity-10 ${isMobile ? 'w-6 h-6' : 'w-6 sm:w-24 lg:w-32 h-6 sm:h-24 lg:h-32'}`}>
                <div className={`w-full h-full bg-gradient-to-br ${card.iconGradient} rounded-full blur-3xl`}></div>
              </div>
              
              {isMobile ? (
                /* Mobile Layout */
                <div className="relative z-10 h-full flex flex-col">
                  {/* Top Row - Icon/Title on left, Value on right */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      {/* Icon */}
                      <div className={`inline-flex bg-gradient-to-br ${card.iconGradient} rounded-xl shadow-lg mb-2 w-fit`}>
                        <Icon className="text-white w-6 h-6 p-1" />
                      </div>
                      {/* Title */}
                      <p className="font-medium text-gray-600 leading-tight text-xs">
                        {card.title}
                      </p>
                      {/* Subtitle */}
                      <p className="text-gray-500 leading-tight text-xs">
                        {card.subtitle}
                      </p>
                    </div>
                    
                    {/* Value - Top Right */}
                    <div className="text-right">
                      <p className="font-bold text-gray-900 leading-none text-lg">
                        {card.title.includes('Saldo') || card.title.includes('Investido') || card.title.includes('Rendimento') || card.title.includes('Bônus') ? (
                          <span className="text-sm">R$ </span>
                        ) : ''}
                        {card.value}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom - Percentage centered */}
                  <div className="flex-1 flex items-end justify-center">
                    <div className={`flex items-center space-x-1 ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {card.isPositive ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      <span className="font-medium text-xs">
                        {card.change}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop Layout - Keep original */
                <>
                  {/* Icon with original colors */}
                  <div className={`inline-flex bg-gradient-to-br ${card.iconGradient} rounded-xl shadow-lg p-0.5 sm:p-2 lg:p-3 mb-0.5 sm:mb-3 lg:mb-4`}>
                    <Icon className="text-white w-2 h-2 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <p className="font-medium text-gray-600 leading-tight text-xs sm:text-sm mb-0.5">
                      {card.title}
                    </p>
                    <p className="font-bold text-gray-900 leading-none text-xs sm:text-xl lg:text-2xl xl:text-3xl mb-0.5">
                      {card.title.includes('Saldo') || card.title.includes('Investido') || card.title.includes('Rendimento') || card.title.includes('Bônus') ? (
                        <span className="text-xs sm:text-sm lg:text-lg">R$ </span>
                      ) : ''}
                      {card.value}
                    </p>
                    <p className="text-gray-500 leading-tight text-xs mb-1">
                      {card.subtitle}
                    </p>
                    
                    {/* Percentage */}
                    <div className={`flex items-center justify-start space-x-1 ${card.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {card.isPositive ? (
                        <ArrowUpRight className="w-2 h-2 sm:w-4 sm:h-4" />
                      ) : (
                        <ArrowDownRight className="w-2 h-2 sm:w-4 sm:h-4" />
                      )}
                      <span className="font-medium text-xs sm:text-sm">
                        {card.change}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>



      {/* Mobile Navigation - Show only on mobile, after stats cards */}
      {isMobile && activeTab && setActiveTab && (
        <MobileNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {/* Main Content Grid - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Card */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Atividade Recente</h3>
              <button className="text-sm text-orange-500 hover:text-orange-600 font-medium">Ver tudo</button>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.isPositive ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {activity.isPositive ? (
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{activity.description}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-sm sm:text-base flex-shrink-0 ml-2 ${activity.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {activity.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="space-y-6 order-1 lg:order-2">
          {/* Programa de Indicação */}
          <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-20">
              <div className="w-full h-full rounded-full bg-white/30"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Programa de Indicação</h3>
              
              {/* Sponsor info - Only show on mobile */}
              {isMobile && (
                <div className="mb-4">
                  <div className="inline-flex items-center bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    <span className="mr-1">●</span>
                    Patrocinado por: Alan Rufino
                  </div>
                </div>
              )}
              <p className="text-xs sm:text-sm text-cyan-100 mb-3 sm:mb-4">
                Convide seus amigos e ganhe comissões de até 5 níveis. Quanto mais indicar, mais você ganha!
              </p>
              
              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-cyan-100">Total Indicados:</span>
                  <span className="font-bold">24 pessoas</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-cyan-100">Ganhos este mês:</span>
                  <span className="font-bold">R$ 1.650</span>
                </div>
              </div>

              {/* Avatar section */}
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="flex -space-x-1 sm:-space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-xs sm:text-sm text-cyan-100">+21 outros</span>
              </div>

              <button 
                onClick={() => setActiveTab?.('referral-program')}
                className="w-full bg-white/20 backdrop-blur text-white p-2 sm:p-3 rounded-xl hover:bg-white/30 transition-all flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm sm:text-base">Convidar Amigos</span>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full p-2 sm:p-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-xl hover:from-orange-500 hover:to-orange-600 transition-all text-sm sm:text-base">
                Novo Investimento
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}