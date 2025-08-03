import React, { useState, useEffect } from 'react';
import { ModernSidebar } from './components/ModernSidebar';
import { ModernHeader } from './components/ModernHeader';
import { ModernDashboard } from './components/ModernDashboard';
import { NewInvestment } from './components/NewInvestment';
import { ActiveInvestments } from './components/ActiveInvestments';
import { BonusEarnings } from './components/BonusEarnings';
import { AccountStatement } from './components/AccountStatement';
import { BankingInfo } from './components/BankingInfo';
import { WithdrawalRequest } from './components/WithdrawalRequest';
import { MyWithdrawals } from './components/MyWithdrawals';
import { ReferralProgram } from './components/ReferralProgram';
import { PointsSystem } from './components/PointsSystem';
import { Support } from './components/Support';
import { Settings } from './components/Settings';
import { Communications } from './components/Communications';
import { Users } from './components/Users';
import { Leaders } from './components/Leaders';
import { Blocked } from './components/Blocked';
import { UserRegistration } from './components/UserRegistration';
import { GeneratedInvoices } from './components/GeneratedInvoices';
import { InvestmentPlans } from './components/InvestmentPlans';
import { UserProfile } from './components/UserProfile';
import { AdminUserProfile } from './components/AdminUserProfile';
import { Logs } from './components/Logs';
import { WebHooks } from './components/WebHooks';
import { useIsMobile } from './components/ui/use-mobile';

export function DashboardApplication() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [networkUser, setNetworkUser] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarExpanded(false);
      setMobileSidebarOpen(false);
    } else {
      setSidebarExpanded(true);
    }
  }, [isMobile]);

  // Close mobile sidebar when tab changes
  useEffect(() => {
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  }, [activeTab, isMobile]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarExpanded(!sidebarExpanded);
    }
  };

  const handleBackToDashboard = () => {
    setActiveTab('dashboard');
    setNetworkUser(null);
  };

  const handleViewUserProfile = (user: any) => {
    setSelectedUser(user);
    setActiveTab('admin-user-profile');
  };

  const handleViewUserNetwork = (user: any) => {
    setNetworkUser(user);
    setActiveTab('referral-program');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <ModernDashboard activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'profile':
        return <UserProfile onBack={handleBackToDashboard} />;
      case 'admin-user-profile':
        return <AdminUserProfile onBack={handleBackToDashboard} userData={selectedUser} onViewNetwork={handleViewUserNetwork} />;
      case 'users':
        return <Users onBack={handleBackToDashboard} onViewProfile={handleViewUserProfile} />;
      case 'leaders':
        return <Leaders onBack={handleBackToDashboard} />;
      case 'blocked':
        return <Blocked onBack={handleBackToDashboard} />;
      case 'user-registration':
        return <UserRegistration onBack={handleBackToDashboard} />;
      case 'generated-invoices':
        return <GeneratedInvoices onBack={handleBackToDashboard} />;
      case 'investment-plans':
        return <InvestmentPlans onBack={handleBackToDashboard} />;
      case 'logs':
        return <Logs onBack={handleBackToDashboard} />;
      case 'webhooks':
        return <WebHooks onBack={handleBackToDashboard} />;
      case 'new-investment':
        return <NewInvestment onBack={handleBackToDashboard} />;
      case 'active-investments':
        return <ActiveInvestments onBack={handleBackToDashboard} />;
      case 'bonus-earnings':
        return <BonusEarnings onBack={handleBackToDashboard} />;
      case 'account-statement':
        return <AccountStatement onBack={handleBackToDashboard} />;
      case 'banking-info':
        return <BankingInfo onBack={handleBackToDashboard} />;
      case 'withdrawal':
        return <WithdrawalRequest onBack={handleBackToDashboard} />;
      case 'my-withdrawals':
        return <MyWithdrawals onBack={handleBackToDashboard} />;
      case 'referral-program':
        return <ReferralProgram onBack={handleBackToDashboard} networkUser={networkUser} />;
      case 'points-system':
        return <PointsSystem onBack={handleBackToDashboard} />;
      case 'support':
        return <Support onBack={handleBackToDashboard} />;
      case 'settings':
        return <Settings onBack={handleBackToDashboard} />;
      case 'communications':
        return <Communications onBack={handleBackToDashboard} />;
      default:
        return <ModernDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Desktop Sidebar - Hidden on mobile */}
      {!isMobile && (
        <div className="relative">
          <ModernSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            isExpanded={sidebarExpanded}
            setIsExpanded={setSidebarExpanded}
            isMobile={false}
            isAdminAuthenticated={isAdminAuthenticated}
            setIsAdminAuthenticated={setIsAdminAuthenticated}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full overflow-hidden">
        <ModernHeader 
          onToggleSidebar={handleToggleSidebar}
          sidebarExpanded={sidebarExpanded}
          isMobile={isMobile}
          mobileSidebarOpen={mobileSidebarOpen}
          onProfileClick={() => setActiveTab('profile')}
          isAdminAuthenticated={isAdminAuthenticated}
        />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}