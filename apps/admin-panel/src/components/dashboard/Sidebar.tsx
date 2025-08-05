import React from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Gift, 
  Receipt, 
  CreditCard, 
  Banknote, 
  Users, 
  Star, 
  HelpCircle, 
  Bell 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Painel Principal', icon: LayoutDashboard },
    { id: 'new-investment', label: 'Novo Investimento', icon: Plus },
    { id: 'active-investments', label: 'Investimentos Ativos', icon: TrendingUp },
    { id: 'my-earnings', label: 'Meus Rendimentos', icon: DollarSign },
    { id: 'bonus-earnings', label: 'Rendimentos Bônus', icon: Gift },
    { id: 'account-statement', label: 'Extrato da Conta', icon: Receipt },
    { id: 'banking-info', label: 'Informações Bancárias', icon: CreditCard },
    { id: 'withdrawal', label: 'Solicitar Retirada', icon: Banknote },
    { id: 'referral-program', label: 'Programa de Indicação', icon: Users },
    { id: 'points-system', label: 'Sistema de Pontuação', icon: Star },
    { id: 'support', label: 'Suporte', icon: HelpCircle },
    { id: 'communications', label: 'Comunicados', icon: Bell },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">HPX</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">HPX MINER</h1>
            <p className="text-sm text-gray-500">Investment Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}