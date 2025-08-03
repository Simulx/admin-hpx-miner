import { useState } from "react";
import { AdminLoginForm } from "./components/AdminLoginForm";
import { TwoFactorAuth } from "./components/TwoFactorAuth";
import { LanguageProvider, useLanguage } from "./components/LanguageContext";
import { LanguageSelector } from "./components/LanguageSelector";
import { AdminAuthProvider, useAdminAuth } from "./hooks/useAdminAuth";
import { Toaster } from "./dashboard/components/ui/sonner";
import { DashboardApplication } from "./dashboard/App";

function AppContent() {
  const { t } = useLanguage();
  const { user, isLoading, requiresTwoFactor, logout } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2d2d2d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#7f8c8d]">Carregando...</p>
        </div>
      </div>
    );
  }

  // If user is logged in and 2FA is completed, show admin dashboard
  if (user && !requiresTwoFactor) {
    return <DashboardApplication />;
  }

  // If user completed initial login but needs 2FA
  if (requiresTwoFactor) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] relative">
        {/* Language Selector */}
        <div className="fixed top-4 right-4 z-[200]">
          <LanguageSelector />
        </div>

        <TwoFactorAuth 
          onVerificationSuccess={() => {
            // The hook will handle the state change
          }}
          onLogout={logout}
        />

        {/* Toast notifications */}
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              background: 'white',
              color: '#2c3e50',
              border: '1px solid #e2e8f0',
            },
          }}
        />
      </div>
    );
  }

  // Default login screen
  return (
    <div className="min-h-screen bg-[#f8f9fa] relative">
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-[200]">
        <LanguageSelector />
      </div>

      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main diagonal shape */}
        <div 
          className="absolute top-0 right-0 w-2/3 h-full"
          style={{
            background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #0d0d0d 100%)",
            clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)"
          }}
        />
        
        {/* Secondary geometric elements */}
        <div 
          className="absolute top-20 right-20 w-32 h-32 opacity-20"
          style={{
            background: "linear-gradient(45deg, #2d2d2d 0%, rgba(45, 45, 45, 0.5) 100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)"
          }}
        />
        
        <div 
          className="absolute bottom-32 right-32 w-24 h-24 opacity-15"
          style={{
            background: "linear-gradient(225deg, #2d2d2d 0%, rgba(45, 45, 45, 0.3) 100%)",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)"
          }}
        />
      </div>

      {/* Main content - Centered Admin Login */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md relative z-20">
          <AdminLoginForm />
          
          {/* Terms footer */}
          <div className="text-center mt-8">
            <p className="text-[#7f8c8d] text-sm">
              <a href="#" className="hover:text-[#2d2d2d] transition-colors">{t('termsConditions')}</a>
              {" • "}
              <a href="#" className="hover:text-[#2d2d2d] transition-colors">{t('privacyPolicy')}</a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-2">
        <div className="w-2 h-2 bg-[#2d2d2d] rounded-full"></div>
        <div className="w-2 h-2 bg-[#1a1a1a] opacity-70 rounded-full"></div>
        <div className="w-2 h-2 bg-[#0d0d0d] opacity-50 rounded-full"></div>
        <div className="w-2 h-2 bg-[#2d2d2d] opacity-70 rounded-full"></div>
      </div>

      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'white',
            color: '#2c3e50',
            border: '1px solid #e2e8f0',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminAuthProvider>
        <AppContent />
      </AdminAuthProvider>
    </LanguageProvider>
  );
}