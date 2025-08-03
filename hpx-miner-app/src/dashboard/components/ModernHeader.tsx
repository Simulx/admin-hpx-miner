import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, Menu, Globe, X, User, LogOut } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ModernHeaderProps {
  onToggleSidebar: () => void;
  sidebarExpanded: boolean;
  isMobile?: boolean;
  mobileSidebarOpen?: boolean;
  onProfileClick?: () => void;
  isAdminAuthenticated?: boolean;
}

export function ModernHeader({ onToggleSidebar, sidebarExpanded, isMobile = false, mobileSidebarOpen = false, onProfileClick, isAdminAuthenticated = false }: ModernHeaderProps) {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('pt-BR');

  const languages = [
    { 
      code: 'pt-BR', 
      name: 'BR Português', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/40px-Flag_of_Brazil.svg.png' 
    },
    { 
      code: 'en', 
      name: 'US English', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/40px-Flag_of_the_United_States.svg.png' 
    },
    { 
      code: 'es', 
      name: 'ES Español', 
      flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/40px-Flag_of_Spain.svg.png' 
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Left side with hamburger and title */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          {/* Hamburger Menu - Hidden on mobile */}
          {!isMobile && (
            <button
              onClick={onToggleSidebar}
              className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {/* Page Title */}
          <div className="min-w-0 flex-1">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
              {isAdminAuthenticated ? 'Bem vindo, Administrador.' : 'Bem vindo, João!'}
            </p>
            {/* Sponsored by text with highlight - Hidden on mobile */}
            {!isMobile && (
              <div className="mt-1">
                {isAdminAuthenticated ? (
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg" style={{ backgroundColor: '#084480' }}>
                    <span className="w-2 h-2 bg-white rounded-full mr-1 sm:mr-2 animate-pulse"></span>
                    <span>Administrador</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg">
                    <span className="w-2 h-2 bg-white rounded-full mr-1 sm:mr-2 animate-pulse"></span>
                    <span className="hidden sm:inline">Patrocinado por: Alan Rufino</span>
                    <span className="sm:hidden">Por: Alan Rufino</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Search and Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search - Hidden on mobile, visible on tablet+ */}
          {!isMobile && (
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 w-48 lg:w-64 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          )}
          
          {/* Mobile search button */}
          {isMobile && (
            <button className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {/* Notifications */}
          <button className="relative p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          
          {/* Language Selector - Simplified on mobile */}
          <div className="relative">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center space-x-1 sm:space-x-2"
            >
              <Globe className="w-5 h-5 text-gray-600" />
              <ImageWithFallback 
                src={currentLanguage?.flag || ''} 
                alt={currentLanguage?.name || ''} 
                className="w-5 h-5 rounded-sm object-cover"
              />
              {!isMobile && <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            
            {/* Language Dropdown */}
            {languageDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 sm:w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <div className="py-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language.code);
                        setLanguageDropdownOpen(false);
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 sm:space-x-3 ${
                        selectedLanguage === language.code ? 'bg-orange-50 text-orange-600' : 'text-gray-700'
                      }`}
                    >
                      <ImageWithFallback 
                        src={language.flag} 
                        alt={language.name} 
                        className="w-5 h-5 rounded-sm object-cover flex-shrink-0"
                      />
                      <span className="font-medium text-sm">{language.name}</span>
                      {selectedLanguage === language.code && (
                        <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Settings - Hidden on mobile */}
          {!isMobile && (
            <button className="p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          )}
          
          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-xl px-2 sm:px-3 py-2 hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">J</span>
              </div>
              
              {/* Desktop: Show full info */}
              {!isMobile && (
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">
                    {isAdminAuthenticated ? 'Admin' : 'João Silva'}
                  </div>
                  {!isAdminAuthenticated && (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg">
                        ★ Premium
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <div className="py-2">
                  <button
                    onClick={() => {
                      onProfileClick?.();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium text-sm">Ver Perfil</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="font-medium text-sm">Sair</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      

      
      {/* Click outside to close dropdowns */}
      {languageDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setLanguageDropdownOpen(false)}
        ></div>
      )}
      
      {profileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setProfileDropdownOpen(false)}
        ></div>
      )}
    </header>
  );
}