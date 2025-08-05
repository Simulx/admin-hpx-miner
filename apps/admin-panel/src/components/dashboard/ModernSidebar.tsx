import React, { useState } from 'react';
import { 
  Home, 
  Plus, 
  TrendingUp, 
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
  LogOut,
  Zap,
  Crown,
  Ban,
  Package,
  UserPlus,
  Activity,
  Webhook,
  Shield,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
const hpxLogo = '/assets/logo-redonda.png';

interface ModernSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  isMobile?: boolean;
  isAdminAuthenticated?: boolean;
  setIsAdminAuthenticated?: (authenticated: boolean) => void;
}

export function ModernSidebar({ 
  activeTab, 
  setActiveTab, 
  isExpanded, 
  setIsExpanded, 
  isMobile = false,
  isAdminAuthenticated = false,
  setIsAdminAuthenticated
}: ModernSidebarProps) {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [showAdminItems, setShowAdminItems] = useState(false);

  const ADMIN_PIN = 'Miner369$';

  const adminItems = [
    { id: 'users', icon: Users, label: 'Usuários', color: 'text-blue-500' },
    { id: 'leaders', icon: Crown, label: 'Líderes', color: 'text-yellow-500' },
    { id: 'blocked', icon: Ban, label: 'Bloqueados', color: 'text-red-500' },
    { id: 'user-registration', icon: UserPlus, label: 'Cadastrar Usuário', color: 'text-indigo-500' },
    { id: 'generated-invoices', icon: Receipt, label: 'Faturas Geradas', color: 'text-teal-500' },
    { id: 'investment-plans', icon: Package, label: 'Planos de Investimento', color: 'text-emerald-500' },
    { id: 'logs', icon: Activity, label: 'Logs', color: 'text-violet-500' },
    { id: 'webhooks', icon: Webhook, label: 'WebHooks', color: 'text-purple-500' },
  ];

  const firstMenuItem = { id: 'dashboard', icon: Home, label: 'Início', color: 'text-orange-500' };
  
  const otherMenuItems = [
    { id: 'new-investment', icon: Plus, label: 'Novo Investimento', color: 'text-green-500' },
    { id: 'active-investments', icon: TrendingUp, label: 'Investimentos Ativos', color: 'text-purple-500' },
    { id: 'bonus-earnings', icon: Gift, label: 'Extrato Bônus', color: 'text-pink-500' },
    { id: 'account-statement', icon: Receipt, label: 'Extrato Total da Conta', color: 'text-indigo-500' },
    { id: 'banking-info', icon: CreditCard, label: 'Informações Bancárias', color: 'text-cyan-500' },
    { id: 'withdrawal', icon: Banknote, label: 'Solicitar Saque', color: 'text-emerald-500' },
    { id: 'my-withdrawals', icon: FileText, label: 'Meus Saques Solicitados', color: 'text-blue-500' },
    { id: 'referral-program', icon: Users, label: 'Sistema de Indicação', color: 'text-orange-500' },
    { id: 'points-system', icon: Star, label: 'Sistema de Pontuação', color: 'text-amber-500' },
    { id: 'support', icon: HelpCircle, label: 'Suporte', color: 'text-gray-500' },
    { id: 'settings', icon: SettingsIcon, label: 'Configurações', color: 'text-slate-500' },
    { id: 'communications', icon: Bell, label: 'Avisos', color: 'text-red-500' },
  ];

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setShowAdminItems(!showAdminItems);
    } else {
      setShowPinModal(true);
      setPin('');
      setPinError('');
    }
  };

  const handlePinSubmit = () => {
    if (pin === ADMIN_PIN) {
      setIsAdminAuthenticated?.(true);
      setShowAdminItems(true);
      setShowPinModal(false);
      setPinError('');
    } else {
      setPinError('PIN incorreto. Tente novamente.');
    }
  };

  const handlePinModalClose = () => {
    setShowPinModal(false);
    setPin('');
    setPinError('');
  };

  const handleLogout = () => {
    // Implementar lógica de logout
    console.log('Logout');
  };

  const sidebarWidth = isMobile ? 'w-80' : (isExpanded ? 'w-64' : 'w-20');

  // Check if any admin item is active
  const isAnyAdminItemActive = adminItems.some(item => item.id === activeTab);

  return (
    <>
      <div className={`${sidebarWidth} shadow-xl flex flex-col transition-all duration-300 ease-in-out h-full`}>
        {/* Logo Section - Orange Background */}
        <div className="bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 p-4 border-b border-orange-700/20 rounded-[20px]">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
              <ImageWithFallback 
                src={hpxLogo} 
                alt="HPX MINER Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            {(isExpanded || isMobile) && (
              <div className="transition-opacity duration-300">
                <h1 className="text-xl font-bold text-white">HPX MINER</h1>
                <p className="text-sm text-orange-100">High Performance eXtraction</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items Section - Light Background */}
        <div className="flex-1 bg-[#F8EDE0] flex flex-col">
          {/* Menu Items */}
          <nav className="flex-1 py-4 overflow-y-auto bg-[rgba(221,112,33,0)]">
            <div className="space-y-1">
              {/* First Menu Item - Início */}
              <div className="px-3">
                <button
                  onClick={() => setActiveTab(firstMenuItem.id)}
                  className={`w-full p-3 rounded-xl transition-all duration-200 group relative flex items-center space-x-3 ${
                    activeTab === firstMenuItem.id
                      ? 'bg-[#FF9B33] shadow-lg'
                      : 'border border-[rgba(251,146,60,0.5)] hover:bg-[#FF9B33]/20'
                  }`}
                  title={(!isExpanded && !isMobile) ? firstMenuItem.label : undefined}
                >
                  <firstMenuItem.icon 
                    className={`w-6 h-6 flex-shrink-0 ${
                      activeTab === firstMenuItem.id ? 'text-white' : 'text-[#FF6A00] group-hover:text-orange'
                    }`} 
                  />
                  
                  {(isExpanded || isMobile) && (
                    <span className={`text-sm transition-opacity duration-300 ${
                      activeTab === firstMenuItem.id ? 'text-white font-medium' : 'text-[#FF6A00] group-hover:text-orange'
                    }`}>
                      {firstMenuItem.label}
                    </span>
                  )}
                  
                  {/* Active indicator */}
                  {activeTab === firstMenuItem.id && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[rgba(254,92,0,1)] rounded-r-full"></div>
                  )}
                  
                  {/* Tooltip for collapsed desktop state */}
                  {!isExpanded && !isMobile && (
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      {firstMenuItem.label}
                    </div>
                  )}
                </button>
              </div>

              {/* Administration Dropdown */}
              <div className="px-3">
                <button
                  onClick={handleAdminClick}
                  className={`w-full p-3 rounded-xl transition-all duration-200 group relative flex items-center space-x-3 ${
                    isAnyAdminItemActive || showAdminItems
                      ? 'shadow-lg'
                      : 'hover:opacity-80'
                  }`}
                  style={{ backgroundColor: '#F95300' }}
                  title={(!isExpanded && !isMobile) ? 'Administração' : undefined}
                >
                  <Shield className="w-6 h-6 flex-shrink-0 text-white" />
                  
                  {(isExpanded || isMobile) && (
                    <>
                      <span className="text-sm text-white font-medium flex-1 text-left">
                        Administração
                      </span>
                      {isAdminAuthenticated && (
                        <div className="text-white">
                          {showAdminItems ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Active indicator */}
                  {isAnyAdminItemActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[rgba(254,92,0,1)] rounded-r-full"></div>
                  )}
                  
                  {/* Tooltip for collapsed desktop state */}
                  {!isExpanded && !isMobile && (
                    <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      Administração
                    </div>
                  )}
                </button>

                {/* Admin Submenu Items */}
                {showAdminItems && isAdminAuthenticated && (isExpanded || isMobile) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {adminItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full p-2 rounded-lg transition-all duration-200 group relative flex items-center space-x-3 ${
                            isActive
                              ? 'shadow-lg'
                              : 'hover:opacity-80'
                          }`}
                          style={{ backgroundColor: '#F95300' }}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0 text-white" />
                          <span className="text-sm text-white font-medium">
                            {item.label}
                          </span>
                          
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-[rgba(254,92,0,1)] rounded-r-full"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Other Menu Items */}
              {otherMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <div key={item.id} className="px-3">
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full p-3 rounded-xl transition-all duration-200 group relative flex items-center space-x-3 ${
                        isActive
                          ? 'bg-[#FF9B33] shadow-lg'
                          : 'border border-[rgba(251,146,60,0.5)] hover:bg-[#FF9B33]/20'
                      }`}
                      title={(!isExpanded && !isMobile) ? item.label : undefined}
                    >
                      <Icon 
                        className={`w-6 h-6 flex-shrink-0 ${
                          isActive ? 'text-white' : 'text-[#FF6A00] group-hover:text-orange'
                        }`} 
                      />
                      
                      {(isExpanded || isMobile) && (
                        <span className={`text-sm transition-opacity duration-300 ${
                          isActive ? 'text-white font-medium' : 'text-[#FF6A00] group-hover:text-orange'
                        }`}>
                          {item.label}
                        </span>
                      )}
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[rgba(254,92,0,1)] rounded-r-full"></div>
                      )}
                      
                      {/* Tooltip for collapsed desktop state */}
                      {!isExpanded && !isMobile && (
                        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                          {item.label}
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>
          
          {/* Logout Button */}
          <div className="p-3 border-t border-orange-200/50">
            <button
              onClick={handleLogout}
              className="w-full p-3 rounded-xl transition-all duration-200 group relative flex items-center space-x-3 hover:bg-[#FF9B33]/20"
              title={(!isExpanded && !isMobile) ? 'Sair' : undefined}
            >
              <LogOut className="w-6 h-6 flex-shrink-0 text-[#FF6A00] group-hover:text-white" />
              
              {(isExpanded || isMobile) && (
                <span className="text-sm text-[#FF6A00] group-hover:text-white transition-opacity duration-300">
                  Sair
                </span>
              )}
              
              {/* Tooltip for collapsed desktop state */}
              {!isExpanded && !isMobile && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Sair
                </div>
              )}
            </button>
          </div>
          
          {/* User Section */}
          <div className="p-4 border-t border-orange-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#FF9B33]/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#FF6A00] text-sm font-medium">J</span>
              </div>
              {(isExpanded || isMobile) && (
                <div className="transition-opacity duration-300">
                  <div className="text-sm font-medium text-[#FF6A00]">João Silva</div>
                  <div className="text-xs text-[#FF6A00]/70">Premium User</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PIN Authentication Modal */}
      <Dialog open={showPinModal} onOpenChange={handlePinModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-orange-500" />
              Autenticação Administrativa
            </DialogTitle>
            <DialogDescription>
              Digite o PIN interno para acessar as ferramentas administrativas do sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Digite o PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePinSubmit()}
                className="text-center text-lg tracking-widest"
              />
              
              {pinError && (
                <Alert variant="destructive">
                  <AlertDescription>{pinError}</AlertDescription>
                </Alert>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePinModalClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handlePinSubmit}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                disabled={!pin}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}