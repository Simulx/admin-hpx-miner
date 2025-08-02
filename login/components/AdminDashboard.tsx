import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LogOut, 
  Users, 
  Settings, 
  Shield, 
  Activity,
  Database,
  AlertTriangle,
  CheckCircle,
  User
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageSelector } from './LanguageSelector';

export function AdminDashboard() {
  const { user, logout } = useAdminAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const translations = {
    en: {
      adminPanel: 'Admin Panel',
      welcome: 'Welcome',
      overview: 'Overview',
      userManagement: 'User Management',
      systemSettings: 'System Settings',
      securityLogs: 'Security Logs',
      logout: 'Logout',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      pendingApprovals: 'Pending Approvals',
      systemStatus: 'System Status',
      operational: 'Operational',
      lastLogin: 'Last Login',
      serverStatus: 'Server Status',
      databaseStatus: 'Database Status',
      securityLevel: 'Security Level',
      high: 'High',
      recentActivity: 'Recent Activity',
      userRegistration: 'New user registration',
      adminLogin: 'Admin login',
      systemMaintenance: 'System maintenance',
      securityAlert: 'Security alert',
      viewAll: 'View All',
      managementTools: 'Management Tools',
      userPermissions: 'User Permissions',
      systemBackup: 'System Backup',
      auditLogs: 'Audit Logs',
      networkSecurity: 'Network Security'
    },
    es: {
      adminPanel: 'Panel de Administración',
      welcome: 'Bienvenido',
      overview: 'Resumen',
      userManagement: 'Gestión de Usuarios',
      systemSettings: 'Configuración del Sistema',
      securityLogs: 'Registros de Seguridad',
      logout: 'Cerrar Sesión',
      totalUsers: 'Total de Usuarios',
      activeUsers: 'Usuarios Activos',
      pendingApprovals: 'Aprobaciones Pendientes',
      systemStatus: 'Estado del Sistema',
      operational: 'Operativo',
      lastLogin: 'Último Acceso',
      serverStatus: 'Estado del Servidor',
      databaseStatus: 'Estado de la Base de Datos',
      securityLevel: 'Nivel de Seguridad',
      high: 'Alto',
      recentActivity: 'Actividad Reciente',
      userRegistration: 'Nuevo registro de usuario',
      adminLogin: 'Acceso de administrador',
      systemMaintenance: 'Mantenimiento del sistema',
      securityAlert: 'Alerta de seguridad',
      viewAll: 'Ver Todo',
      managementTools: 'Herramientas de Gestión',
      userPermissions: 'Permisos de Usuario',
      systemBackup: 'Respaldo del Sistema',
      auditLogs: 'Registros de Auditoría',
      networkSecurity: 'Seguridad de Red'
    },
    pt: {
      adminPanel: 'Painel Administrativo',
      welcome: 'Bem-vindo',
      overview: 'Visão Geral',
      userManagement: 'Gestão de Usuários',
      systemSettings: 'Configurações do Sistema',
      securityLogs: 'Logs de Segurança',
      logout: 'Sair',
      totalUsers: 'Total de Usuários',
      activeUsers: 'Usuários Ativos',
      pendingApprovals: 'Aprovações Pendentes',
      systemStatus: 'Status do Sistema',
      operational: 'Operacional',
      lastLogin: 'Último Login',
      serverStatus: 'Status do Servidor',
      databaseStatus: 'Status do Banco de Dados',
      securityLevel: 'Nível de Segurança',
      high: 'Alto',
      recentActivity: 'Atividade Recente',
      userRegistration: 'Novo registro de usuário',
      adminLogin: 'Login de administrador',
      systemMaintenance: 'Manutenção do sistema',
      securityAlert: 'Alerta de segurança',
      viewAll: 'Ver Todos',
      managementTools: 'Ferramentas de Gestão',
      userPermissions: 'Permissões de Usuário',
      systemBackup: 'Backup do Sistema',
      auditLogs: 'Logs de Auditoria',
      networkSecurity: 'Segurança de Rede'
    }
  };

  const tLocal = (key: string) => {
    const { language } = useLanguage();
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const stats = [
    { label: tLocal('totalUsers'), value: '2,847', icon: Users, color: 'text-blue-600' },
    { label: tLocal('activeUsers'), value: '1,923', icon: Activity, color: 'text-green-600' },
    { label: tLocal('pendingApprovals'), value: '12', icon: AlertTriangle, color: 'text-orange-600' },
    { label: tLocal('systemStatus'), value: tLocal('operational'), icon: CheckCircle, color: 'text-green-600' }
  ];

  const recentActivities = [
    { type: 'user', message: tLocal('userRegistration'), time: '2 min ago', icon: User },
    { type: 'admin', message: tLocal('adminLogin'), time: '15 min ago', icon: Shield },
    { type: 'system', message: tLocal('systemMaintenance'), time: '1 hour ago', icon: Settings },
    { type: 'security', message: tLocal('securityAlert'), time: '2 hours ago', icon: AlertTriangle }
  ];

  const managementTools = [
    { name: tLocal('userPermissions'), icon: Users, color: 'bg-blue-500' },
    { name: tLocal('systemBackup'), icon: Database, color: 'bg-green-500' },
    { name: tLocal('auditLogs'), icon: Activity, color: 'bg-orange-500' },
    { name: tLocal('networkSecurity'), icon: Shield, color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#2c3e50]">{tLocal('adminPanel')}</h1>
                <p className="text-sm text-[#7f8c8d]">HPX MINER {tLocal('adminPanel')}</p>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#2d2d2d] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-[#2c3e50]">{user?.name}</p>
                  <p className="text-xs text-[#7f8c8d]">{user?.email}</p>
                </div>
              </div>

              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {tLocal('logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2c3e50] mb-2">
            {tLocal('welcome')}, {user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-[#7f8c8d]">
            {tLocal('lastLogin')}: {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#7f8c8d] mb-1">{stat.label}</p>
                      <p className="text-2xl font-semibold text-[#2c3e50]">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Status */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#2c3e50] flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                {tLocal('systemStatus')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#7f8c8d]">{tLocal('serverStatus')}</span>
                <Badge className="bg-green-100 text-green-800">{tLocal('operational')}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7f8c8d]">{tLocal('databaseStatus')}</span>
                <Badge className="bg-green-100 text-green-800">{tLocal('operational')}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#7f8c8d]">{tLocal('securityLevel')}</span>
                <Badge className="bg-[#2d2d2d] text-white">{tLocal('high')}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#2c3e50] flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  {tLocal('recentActivity')}
                </div>
                <Button variant="ghost" size="sm" className="text-[#2d2d2d]">
                  {tLocal('viewAll')}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon className="w-4 h-4 text-[#7f8c8d] mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#2c3e50]">{activity.message}</p>
                        <p className="text-xs text-[#7f8c8d]">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Management Tools */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-[#2c3e50] flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                {tLocal('managementTools')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {managementTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 border-gray-200 hover:bg-gray-50"
                    >
                      <div className={`w-8 h-8 ${tool.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs text-[#2c3e50] text-center leading-tight">
                        {tool.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}