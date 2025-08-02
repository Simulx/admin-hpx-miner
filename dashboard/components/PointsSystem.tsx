import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Star, Trophy, Target, Gift, Award, Zap } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface PointsSystemProps {
  onBack?: () => void;
}

export function PointsSystem({ onBack }: PointsSystemProps) {
  const userPoints = {
    current: 8450,
    level: 'Premium',
    nextLevel: 'Elite',
    pointsToNext: 1550,
    totalRequired: 10000
  };

  const levels = [
    { name: 'Iniciante', points: 0, color: 'text-gray-600', bgColor: 'bg-gray-100' },
    { name: 'Bronze', points: 1000, color: 'text-orange-600', bgColor: 'bg-orange-100' },
    { name: 'Prata', points: 2500, color: 'text-gray-600', bgColor: 'bg-gray-200' },
    { name: 'Ouro', points: 5000, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { name: 'Premium', points: 7500, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Elite', points: 10000, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { name: 'Master', points: 15000, color: 'text-red-600', bgColor: 'bg-red-100' }
  ];

  const pointsHistory = [
    {
      id: 1,
      date: '2025-07-11',
      action: 'Investimento Pack Elite - R$ 10.000',
      points: 1000,
      type: 'investment'
    },
    {
      id: 2,
      date: '2025-07-10',
      action: 'Indicação de novo usuário',
      points: 500,
      type: 'referral'
    },
    {
      id: 3,
      date: '2025-07-09',
      action: 'Rendimento diário',
      points: 70,
      type: 'daily'
    },
    {
      id: 4,
      date: '2025-07-08',
      action: 'Bônus de fidelidade',
      points: 250,
      type: 'bonus'
    },
    {
      id: 5,
      date: '2025-07-07',
      action: 'Completar perfil',
      points: 100,
      type: 'profile'
    }
  ];

  const benefits = [
    {
      level: 'Bronze',
      benefits: ['Suporte por chat', 'Relatórios básicos'],
      icon: Award
    },
    {
      level: 'Prata',
      benefits: ['Suporte prioritário', 'Relatórios avançados', 'Cashback 0.5%'],
      icon: Star
    },
    {
      level: 'Ouro',
      benefits: ['Gerente dedicado', 'Análises personalizadas', 'Cashback 1%'],
      icon: Trophy
    },
    {
      level: 'Premium',
      benefits: ['Suporte VIP 24/7', 'Consultoria gratuita', 'Cashback 1.5%', 'Eventos exclusivos'],
      icon: Zap
    },
    {
      level: 'Elite',
      benefits: ['Atendimento personalizado', 'Produtos exclusivos', 'Cashback 2%', 'Convites especiais'],
      icon: Target
    },
    {
      level: 'Master',
      benefits: ['Concierge service', 'Acesso antecipado', 'Cashback 2.5%', 'Programa VIP'],
      icon: Gift
    }
  ];

  const getPointsIcon = (type: string) => {
    switch (type) {
      case 'investment':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'referral':
        return <Star className="w-4 h-4 text-blue-500" />;
      case 'daily':
        return <Target className="w-4 h-4 text-green-500" />;
      case 'bonus':
        return <Gift className="w-4 h-4 text-purple-500" />;
      case 'profile':
        return <Award className="w-4 h-4 text-orange-500" />;
      default:
        return <Star className="w-4 h-4 text-gray-500" />;
    }
  };

  const progressPercentage = ((userPoints.current - 7500) / (userPoints.totalRequired - 7500)) * 100;

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Pontuação</h1>
          <p className="text-gray-600">Acumule pontos e desbloqueie benefícios exclusivos</p>
        </div>
      </div>

      {/* Current Status */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-6 h-6" />
            <span>Nível Atual: {userPoints.level}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{userPoints.current.toLocaleString()}</div>
              <div className="text-sm opacity-90">Pontos Atuais</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{userPoints.pointsToNext.toLocaleString()}</div>
              <div className="text-sm opacity-90">Para Próximo Nível</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{userPoints.nextLevel}</div>
              <div className="text-sm opacity-90">Próximo Nível</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>{userPoints.level}</span>
              <span>{userPoints.nextLevel}</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-white/20" />
            <div className="text-center mt-2 text-sm opacity-90">
              {progressPercentage.toFixed(1)}% para o próximo nível
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Levels Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Níveis e Requisitos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {levels.map((level, index) => (
              <div 
                key={level.name}
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  level.name === userPoints.level 
                    ? 'border-blue-500 bg-blue-50' 
                    : userPoints.current >= level.points
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className={`text-2xl font-bold ${level.color} mb-2`}>
                  {index + 1}
                </div>
                <div className="font-medium">{level.name}</div>
                <div className="text-sm text-gray-600">
                  {level.points.toLocaleString()} pts
                </div>
                {userPoints.current >= level.points && (
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Conquistado
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits by Level */}
      <Card>
        <CardHeader>
          <CardTitle>Benefícios por Nível</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              const isUnlocked = levels.find(l => l.name === benefit.level)?.points <= userPoints.current;
              
              return (
                <div 
                  key={benefit.level}
                  className={`p-4 rounded-lg border ${
                    isUnlocked 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon className={`w-5 h-5 ${isUnlocked ? 'text-green-600' : 'text-gray-400'}`} />
                    <h3 className={`font-medium ${isUnlocked ? 'text-green-800' : 'text-gray-600'}`}>
                      {benefit.level}
                    </h3>
                    {isUnlocked && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Desbloqueado
                      </Badge>
                    )}
                  </div>
                  <ul className="space-y-1">
                    {benefit.benefits.map((item, index) => (
                      <li key={index} className={`text-sm ${isUnlocked ? 'text-green-700' : 'text-gray-500'}`}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Histórico de Pontos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pointsHistory.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getPointsIcon(entry.type)}
                  <div>
                    <div className="font-medium">{entry.action}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+{entry.points}</div>
                  <div className="text-sm text-gray-500">pontos</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Como Ganhar Pontos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Investimentos</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 100 pontos por R$ 1.000 investidos</li>
                <li>• Bônus de 50% em planos Premium+</li>
                <li>• Pontos extras por renovações</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Indicações</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 500 pontos por indicado que investe</li>
                <li>• 10% dos pontos dos indicados</li>
                <li>• Bônus por indicados ativos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}