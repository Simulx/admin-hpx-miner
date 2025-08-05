import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Globe, Moon, Sun, Smartphone } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface SettingsProps {
  onBack?: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('pt-BR');
  
  // Add state for form fields
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    cpf: '123.456.789-00'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Configurações</h2>
        <p className="text-gray-600">Gerencie suas preferências e configurações da conta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Informações da Conta</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                  <input
                    type="text"
                    value={formData.cpf}
                    readOnly
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Notificações</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Notificações por Email</p>
                  <p className="text-sm text-gray-500">Receba atualizações por email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Notificações Push</p>
                  <p className="text-sm text-gray-500">Receba notificações no navegador</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Notificações SMS</p>
                  <p className="text-sm text-gray-500">Receba alertas por SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Segurança</h3>
            </div>

            <div className="space-y-4">
              <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Alterar Senha</p>
                    <p className="text-sm text-gray-500">Última alteração há 30 dias</p>
                  </div>
                  <div className="text-orange-500">→</div>
                </div>
              </button>

              <button className="w-full p-4 bg-gray-50 rounded-xl text-left hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Autenticação 2FA</p>
                    <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                  </div>
                  <div className="text-orange-500">→</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all">
                Salvar Alterações
              </button>
              <button className="w-full p-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all">
                Restaurar Padrão
              </button>
            </div>
          </div>

          {/* App Preferences */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Preferências</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="pt-BR">Português (BR)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}