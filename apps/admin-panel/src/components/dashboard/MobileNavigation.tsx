import React, { useState } from 'react';
import { 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Gift, 
  Receipt, 
  CreditCard, 
  Banknote, 
  FileText,
  Users, 
  Star, 
  HelpCircle, 
  Bell,
  Settings as SettingsIcon,
  MoreHorizontal,
  Crown,
  Ban
} from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function MobileNavigation({ activeTab, setActiveTab }: MobileNavigationProps) {
  const [showAll, setShowAll] = useState(false);

  // Itens do menu lateral (sem o "Início") - Novo Investimento como primeiro item
  const allNavigationItems = [
    { id: 'new-investment', icon: Plus, label: 'Novo Investimento' },
    { id: 'users', icon: Users, label: 'Usuários' },
    { id: 'leaders', icon: Crown, label: 'Líderes' },
    { id: 'blocked', icon: Ban, label: 'Bloqueados' },
    { id: 'active-investments', icon: TrendingUp, label: 'Investimentos Ativos' },
    { id: 'my-earnings', icon: DollarSign, label: 'Meus Rendimentos' },
    { id: 'bonus-earnings', icon: Gift, label: 'Extrato Bônus' },
    { id: 'account-statement', icon: Receipt, label: 'Extrato Total da Conta' },
    { id: 'banking-info', icon: CreditCard, label: 'Informações Bancárias' },
    { id: 'withdrawal', icon: Banknote, label: 'Solicitar Saque' },
    { id: 'my-withdrawals', icon: FileText, label: 'Meus Saques Solicitados' },
    { id: 'referral-program', icon: Users, label: 'Sistema de Indicação' },
    { id: 'points-system', icon: Star, label: 'Sistema de Pontuação' },
    { id: 'support', icon: HelpCircle, label: 'Suporte' },
    { id: 'settings', icon: SettingsIcon, label: 'Configurações' },
    { id: 'communications', icon: Bell, label: 'Avisos' }
  ];

  // Primeiros 6 itens
  const initialItems = allNavigationItems.slice(0, 6);
  // Restante dos itens
  const remainingItems = allNavigationItems.slice(6);

  const itemsToShow = showAll ? allNavigationItems : initialItems;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">TODAS AS NAVEGAÇÕES</h2>
      
      {/* Grid 3x2 ou 3x? dependendo do showAll */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {itemsToShow.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                item.id === 'new-investment' 
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:from-green-600 hover:to-green-700' 
                  : ''
              }`}
              style={item.id === 'new-investment' ? {} : { backgroundColor: '#F8EDE0', color: '#FF9B33' }}
            >
              <div className="mb-2">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Botão Carregar mais / Mostrar menos */}
      <button 
        onClick={() => setShowAll(!showAll)}
        className="w-full p-3 rounded-xl border-2 border-gray-300 text-gray-600 hover:border-gray-400 transition-colors flex items-center justify-center space-x-2"
      >
        <MoreHorizontal className="w-5 h-5" />
        <span className="font-medium">
          {showAll ? 'Mostrar menos' : 'Carregar mais'}
        </span>
      </button>
    </div>
  );
}