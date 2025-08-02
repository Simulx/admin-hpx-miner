import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Banknote, X, Smartphone, DollarSign, Users, User, Mail, Search } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface WithdrawalRequestProps {
  onBack?: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  balance: number;
  withdrawalsDisabled: boolean;
  earningsWithdrawalsDisabled: boolean;
  bonusWithdrawalsDisabled: boolean;
}

export function WithdrawalRequest({ onBack }: WithdrawalRequestProps) {
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalsDisabled, setWithdrawalsDisabled] = useState(false);
  const [earningsWithdrawalsDisabled, setEarningsWithdrawalsDisabled] = useState(false);
  const [bonusWithdrawalsDisabled, setBonusWithdrawalsDisabled] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [usersData, setUsersData] = useState<UserData[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@email.com',
      balance: 5480.50,
      withdrawalsDisabled: false,
      earningsWithdrawalsDisabled: false,
      bonusWithdrawalsDisabled: false
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      balance: 3250.75,
      withdrawalsDisabled: false,
      earningsWithdrawalsDisabled: false,
      bonusWithdrawalsDisabled: false
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      balance: 7890.25,
      withdrawalsDisabled: true,
      earningsWithdrawalsDisabled: false,
      bonusWithdrawalsDisabled: false
    },
    {
      id: '4',
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      balance: 2145.80,
      withdrawalsDisabled: false,
      earningsWithdrawalsDisabled: false,
      bonusWithdrawalsDisabled: false
    },
    {
      id: '5',
      name: 'Pedro Rodrigues',
      email: 'pedro.rodrigues@email.com',
      balance: 6750.30,
      withdrawalsDisabled: false,
      earningsWithdrawalsDisabled: false,
      bonusWithdrawalsDisabled: false
    }
  ]);
  
  const availableBalances = {
    totalBalance: 2450.00,
    planEarnings: 1800.00,
    bonusEarnings: 650.00
  };

  const maxWithdrawal = availableBalances.totalBalance;

  const handleWithdrawal = () => {
    if (!withdrawalsDisabled) {
      setShowWithdrawalForm(true);
    }
  };

  const handleToggleWithdrawals = () => {
    setWithdrawalsDisabled(!withdrawalsDisabled);
    // Fechar formulários se estiverem abertos quando pausar saques
    if (!withdrawalsDisabled) {
      setShowWithdrawalForm(false);
      setShowPaymentMethod(false);
      setWithdrawalAmount('');
    }
  };

  const handleToggleEarningsWithdrawals = () => {
    setEarningsWithdrawalsDisabled(!earningsWithdrawalsDisabled);
  };

  const handleToggleBonusWithdrawals = () => {
    setBonusWithdrawalsDisabled(!bonusWithdrawalsDisabled);
  };

  const handleToggleUsersList = () => {
    setShowUsersList(!showUsersList);
  };

  const handleToggleUserWithdrawal = (userId: string) => {
    setUsersData(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, withdrawalsDisabled: !user.withdrawalsDisabled }
          : user
      )
    );
  };

  const handleToggleUserEarningsWithdrawal = (userId: string) => {
    setUsersData(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, earningsWithdrawalsDisabled: !user.earningsWithdrawalsDisabled }
          : user
      )
    );
  };

  const handleToggleUserBonusWithdrawal = (userId: string) => {
    setUsersData(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, bonusWithdrawalsDisabled: !user.bonusWithdrawalsDisabled }
          : user
      )
    );
  };

  // Filtrar usuários com base no termo de busca
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCancel = () => {
    setShowWithdrawalForm(false);
    setShowPaymentMethod(false);
    setWithdrawalAmount('');
  };

  const handleConfirm = () => {
    setShowPaymentMethod(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    // Aqui você pode adicionar a lógica para processar o saque
    console.log('Saque de R$', withdrawalAmount, 'via', method);
    setShowWithdrawalForm(false);
    setShowPaymentMethod(false);
    setWithdrawalAmount('');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFCF7' }}>
      <div className="space-y-8 p-4">
        <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Solicitar Retirada</h1>
            <p className="text-gray-600">Realize saques dos seus rendimentos</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Available Balance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
            {/* Total Balance */}
            <div className="flex-1">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-custom h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">Saldo Total</CardTitle>
                <Banknote className="h-4 w-4 opacity-90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {availableBalances.totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs opacity-90 mb-4">Disponível para saque</p>
                <div className="flex justify-end">
                  <Button 
                    onClick={handleWithdrawal}
                    disabled={withdrawalsDisabled}
                    className="w-[100px] h-[40px] bg-white/50 hover:bg-white/30 text-blue border-white/30 hover:border-white/50 transition-all text-[16px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/20 text-[rgba(255,255,255,1)] font-bold"
                    variant="outline"
                  >
                    Sacar
                  </Button>
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Saldo Rendimentos */}
            <div className="flex-1">
              <Card 
                className="text-gray-900 border-gray-200 h-full"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 6px -1px #E6E7E6, 0 2px 4px -1px #E6E7E6'
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Saldo Rendimentos</CardTitle>
                  <Banknote className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    R$ {availableBalances.planEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-gray-600 mb-4">Rendimentos dos planos</p>
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => console.log('Sacar Rendimentos')}
                      disabled={withdrawalsDisabled || earningsWithdrawalsDisabled}
                      className="w-[100px] h-[40px] bg-blue-500 hover:bg-blue-600 text-white transition-all text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sacar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Saldo Bônus */}
            <div className="flex-1">
              <Card 
                className="text-gray-900 border-gray-200 h-full"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 6px -1px #E6E7E6, 0 2px 4px -1px #E6E7E6'
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Saldo Bônus</CardTitle>
                  <Banknote className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    R$ {availableBalances.bonusEarnings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-gray-600 mb-4">Bônus de indicação</p>
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => console.log('Sacar Bônus')}
                      disabled={withdrawalsDisabled || bonusWithdrawalsDisabled}
                      className="w-[100px] h-[40px] bg-green-500 hover:bg-green-600 text-white transition-all text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sacar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Admin Control Section */}
          <div className="max-w-md">
            <Card className="bg-white text-gray-900 border-gray-200 shadow-custom">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Controle de Saques</CardTitle>
                <div className={`w-4 h-4 rounded-full ${withdrawalsDisabled ? 'bg-red-500' : 'bg-green-500'}`}></div>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-xs text-gray-600 mb-4">
                    {withdrawalsDisabled ? 'Saques pausados para todos os usuários' : 'Gerencie os saques dos usuários'}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full h-[40px] bg-blue-500 hover:bg-blue-600 text-white transition-all text-[14px]"
                    onClick={handleToggleUsersList}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {showUsersList ? 'Ocultar Usuários' : 'Mostrar Usuários'}
                  </Button>
                  <Button 
                    className={`w-full h-[40px] text-white transition-all text-[14px] ${
                      withdrawalsDisabled 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                    onClick={handleToggleWithdrawals}
                  >
                    {withdrawalsDisabled ? 'Reativar Saques' : 'Pausar Saque de todos os Usuários'}
                  </Button>
                  <Button 
                    className={`w-full h-[40px] text-white transition-all text-[14px] ${
                      earningsWithdrawalsDisabled 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-orange-500 hover:bg-orange-600'
                    }`}
                    onClick={handleToggleEarningsWithdrawals}
                  >
                    {earningsWithdrawalsDisabled ? 'Reativar Saque Rendimentos' : 'Pausar Saque Rendimentos'}
                  </Button>
                  <Button 
                    className={`w-full h-[40px] text-white transition-all text-[14px] ${
                      bonusWithdrawalsDisabled 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                    onClick={handleToggleBonusWithdrawals}
                  >
                    {bonusWithdrawalsDisabled ? 'Reativar Saque Bônus' : 'Pausar Saque Bônus'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users List */}
          {showUsersList && (
            <div className="max-w-4xl">
              <Card 
                className="bg-white text-gray-900 border-gray-200"
                style={{ 
                  boxShadow: `0 4px 20px -4px #E7E8EA, 0 8px 16px -8px #E7E8EA`
                }}
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Lista de Usuários
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">
                    Controle individual de saques: Total, Rendimentos e Bônus
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Campo de busca */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-input-background border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredUsers.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          {searchTerm ? 'Nenhum usuário encontrado' : 'Nenhum usuário disponível'}
                        </p>
                      </div>
                    ) : (
                      filteredUsers.map((user) => (
                      <div 
                        key={user.id}
                        className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1 space-y-2 lg:space-y-0 lg:mr-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-500" />
                              <span className="font-medium text-gray-900">{user.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Banknote className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-600">
                              R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 lg:mt-0">
                          <div className="flex flex-col gap-2 lg:flex-row lg:gap-2">
                            {/* Saque Total */}
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${user.withdrawalsDisabled ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <Button 
                                size="sm"
                                className={`text-white transition-all text-[10px] px-2 py-1 h-auto ${
                                  user.withdrawalsDisabled 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-red-500 hover:bg-red-600'
                                }`}
                                onClick={() => handleToggleUserWithdrawal(user.id)}
                              >
                                {user.withdrawalsDisabled ? 'Reativar Total' : 'Pausar Total'}
                              </Button>
                            </div>
                            
                            {/* Saque Rendimentos */}
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${user.earningsWithdrawalsDisabled ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <Button 
                                size="sm"
                                className={`text-white transition-all text-[10px] px-2 py-1 h-auto ${
                                  user.earningsWithdrawalsDisabled 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-orange-500 hover:bg-orange-600'
                                }`}
                                onClick={() => handleToggleUserEarningsWithdrawal(user.id)}
                              >
                                {user.earningsWithdrawalsDisabled ? 'Reativar Rendimentos' : 'Pausar Rendimentos'}
                              </Button>
                            </div>
                            
                            {/* Saque Bônus */}
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${user.bonusWithdrawalsDisabled ? 'bg-red-500' : 'bg-green-500'}`}></div>
                              <Button 
                                size="sm"
                                className={`text-white transition-all text-[10px] px-2 py-1 h-auto ${
                                  user.bonusWithdrawalsDisabled 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : 'bg-purple-500 hover:bg-purple-600'
                                }`}
                                onClick={() => handleToggleUserBonusWithdrawal(user.id)}
                              >
                                {user.bonusWithdrawalsDisabled ? 'Reativar Bônus' : 'Pausar Bônus'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Withdrawal Form Card */}
          {showWithdrawalForm && !showPaymentMethod && (
            <div className="flex justify-center">
              <div className="max-w-md">
              <Card 
                className="bg-white text-gray-900 border-gray-200"
                style={{ 
                  boxShadow: `0 4px 20px -4px #E7E8EA, 0 8px 16px -8px #E7E8EA`
                }}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-center text-lg font-bold flex-1 text-gray-900 text-[14px]">
                    Saldo Rendimento + Saldo Bônus
                  </CardTitle>
                  <Button
                    onClick={handleCancel}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:bg-gray-100 p-1 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Linha divisória */}
                  <div className="border-t border-gray-200"></div>
                  
                  {/* Valor Máximo */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Valor Máximo de Saque:</span>
                    <span className="font-bold" style={{ color: '#FF9B33' }}>
                      R${maxWithdrawal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  
                  {/* Linha divisória */}
                  <div className="border-t border-gray-200"></div>
                  
                  {/* Campo de entrada */}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">R$</span>
                    <Input
                      type="number"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      placeholder="0,00"
                      className="bg-input-background border-2 border-primary text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                      max={maxWithdrawal}
                    />
                  </div>
                  
                  {/* Botões */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      className="flex-1 text-white hover:opacity-90"
                      style={{ backgroundColor: '#FF9B33' }}
                    >
                      ESCOLHER FORMA DE SAQUE
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </div>
            </div>
          )}

          {/* Payment Method Selection Card */}
          {showPaymentMethod && (
            <div className="flex justify-center">
              <div className="max-w-md w-full">
                <Card 
                  className="bg-white text-gray-900 border-gray-200"
                  style={{ 
                    boxShadow: `0 4px 20px -4px #E7E8EA, 0 8px 16px -8px #E7E8EA`
                  }}
                >
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      Escolha a Forma de Saque
                    </CardTitle>
                    <div className="w-16 h-1 mx-auto mt-2" style={{ backgroundColor: '#FF9B33' }}></div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* PIX Option */}
                      <Button
                        onClick={() => handlePaymentMethodSelect('PIX')}
                        variant="outline"
                        className="h-auto p-6 flex flex-col items-center space-y-3 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">Sacar via Pix</span>
                      </Button>

                      {/* USDT Option */}
                      <Button
                        onClick={() => handlePaymentMethodSelect('USDT')}
                        variant="outline"
                        className="h-auto p-6 flex flex-col items-center space-y-3 border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <DollarSign className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-medium text-gray-900">Sacar via USDT</span>
                      </Button>
                    </div>

                    {/* Cancel Button */}
                    <div className="pt-4">
                      <Button
                        onClick={() => setShowPaymentMethod(false)}
                        variant="outline"
                        className="w-full bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Voltar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}