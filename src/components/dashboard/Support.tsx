import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { HelpCircle, MessageCircle, Phone, Mail, FileText, ExternalLink, Clock } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface SupportProps {
  onBack?: () => void;
}

export function Support({ onBack }: SupportProps) {
  const supportChannels = [
    {
      name: 'WhatsApp',
      description: 'Atendimento via WhatsApp',
      availability: '8h às 22h',
      contact: '+55 (11) 9999-9999',
      icon: Phone,
      color: 'bg-green-100 text-green-600'
    },
    {
      name: 'Telegram',
      description: 'Canal oficial no Telegram',
      availability: '24/7',
      contact: '@hpxminer_oficial',
      icon: MessageCircle,
      color: 'bg-cyan-100 text-cyan-600'
    }
  ];

  const faqItems = [
    {
      question: 'Como posso fazer um investimento?',
      answer: 'Acesse a seção "Novo Investimento", escolha seu plano e siga as instruções de pagamento.'
    },
    {
      question: 'Quando recebo meus rendimentos?',
      answer: 'Os rendimentos são creditados automaticamente todos os dias às 16:30h.'
    },
    {
      question: 'Como funciona o programa de indicação?',
      answer: 'Você ganha comissões de até 5 níveis. Compartilhe seu link e ganhe quando seus indicados investem.'
    },
    {
      question: 'Posso sacar meus rendimentos a qualquer momento?',
      answer: 'Sim, você pode solicitar saques entre 10/am e 20/pm. PIX é processado em até 30 minutos.'
    }
  ];

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suporte</h1>
          <p className="text-gray-600">Estamos aqui para ajudar você</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">Online</span>
        </div>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportChannels.map((channel) => {
          const Icon = channel.icon;
          return (
            <Card key={channel.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${channel.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{channel.name}</CardTitle>
                    <p className="text-sm text-gray-600">{channel.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium">Disponibilidade:</span> {channel.availability}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Contato:</span> {channel.contact}
                  </div>
                  <Button className="w-full" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Entrar em Contato
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5" />
            <span>Perguntas Frequentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

          
    </div>
  );
}