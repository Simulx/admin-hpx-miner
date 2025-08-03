import React, { useState, useEffect } from 'react';
import { ModernSidebar } from '@/components/dashboard/ModernSidebar';
import { ModernHeader } from '@/components/dashboard/ModernHeader';
import { ModernDashboard } from '@/components/dashboard/ModernDashboard';
import { NewInvestment } from '@/components/dashboard/NewInvestment';
import { ActiveInvestments } from '@/components/dashboard/ActiveInvestments';
import { BonusEarnings } from '@/components/dashboard/BonusEarnings';
import { AccountStatement } from '@/components/dashboard/AccountStatement';
import { BankingInfo } from '@/components/dashboard/BankingInfo';
import { WithdrawalRequest } from '@/components/dashboard/WithdrawalRequest';
import { MyWithdrawals } from '@/components/dashboard/MyWithdrawals';
import { ReferralProgram } from '@/components/dashboard/ReferralProgram';
import { PointsSystem } from '@/components/dashboard/PointsSystem';
import { Support } from '@/components/dashboard/Support';
import { Settings } from '@/components/dashboard/Settings';
import { Communications } from '@/components/dashboard/Communications';
import { Users } from '@/components/dashboard/Users';
import { Leaders } from '@/components/dashboard/Leaders';
import { Blocked } from '@/components/dashboard/Blocked';
import { UserRegistration } from '@/components/dashboard/UserRegistration';
import { GeneratedInvoices } from '@/components/dashboard/GeneratedInvoices';
import { InvestmentPlans } from '@/components/dashboard/InvestmentPlans';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { AdminUserProfile } from '@/components/dashboard/AdminUserProfile';
import { Logs } from '@/components/dashboard/Logs';
import { WebHooks } from '@/components/dashboard/WebHooks';
import { useIsMobile } from '@/components/ui/use-mobile';

export default function DashboardPage() {
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