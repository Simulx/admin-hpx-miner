import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, AlertTriangle, Info, CheckCircle, Calendar, ExternalLink } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface CommunicationsProps {
  onBack?: () => void;
}

export function Communications({ onBack }: CommunicationsProps) {
  const announcements = [
    {
      id: 1,
      title: 'Novo Plano Elite Disponível',
      message: 'Lançamos o novo Pack Elite com rendimento de 5% ao dia. Valor mínimo de R$ 5.000.',
      type: 'info',
      date: '2025-07-11',
      isRead: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Manutenção Programada',
      message: 'Sistema estará em manutenção no sábado das 2h às 4h. Saques e investimentos não serão afetados.',
      type: 'warning',
      date: '2025-07-10',
      isRead: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Pagamentos Processados',
      message: 'Todos os rendimentos do dia foram creditados com sucesso. Confira sua conta.',
      type: 'success',
      date: '2025-07-10',
      isRead: true,
      priority: 'low'
    },
    {
      id: 4,
      title: 'Atualização de Segurança',
      message: 'Implementamos novas medidas de segurança. Recomendamos atualizar sua senha.',
      type: 'info',
      date: '2025-07-09',
      isRead: true,
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Programa de Indicação Melhorado',
      message: 'Aumentamos as comissões do programa de indicação. Confira os novos percentuais.',
      type: 'info',
      date: '2025-07-08',
      isRead: true,
      priority: 'high'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Comunicados</h1>
          <p className="text-gray-600">Fique atualizado com as novidades da plataforma</p>
        </div>
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <Badge className="bg-blue-100 text-blue-800">
            {unreadCount} não lidas
          </Badge>
        </div>
      </div>

      {/* Announcements */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card 
            key={announcement.id}
            className={`transition-all hover:shadow-md ${
              !announcement.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getIcon(announcement.type)}
                  <div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getTypeColor(announcement.type)}>
                        {announcement.type === 'warning' ? 'Aviso' : 
                         announcement.type === 'success' ? 'Sucesso' : 'Informação'}
                      </Badge>
                      <Badge className={getPriorityColor(announcement.priority)}>
                        {announcement.priority === 'high' ? 'Alta' :
                         announcement.priority === 'medium' ? 'Média' : 'Baixa'}
                      </Badge>
                      {!announcement.isRead && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Não lida
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(announcement.date).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{announcement.message}</p>
              <div className="flex space-x-2">
                {!announcement.isRead && (
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Marcar como lida
                  </button>
                )}
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Ver detalhes
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Communication Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferências de Comunicação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notificações por Email</div>
                <div className="text-sm text-gray-600">Receba comunicados importantes por email</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notificações Push</div>
                <div className="text-sm text-gray-600">Receba notificações no navegador</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">WhatsApp</div>
                <div className="text-sm text-gray-600">Receba atualizações via WhatsApp</div>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}