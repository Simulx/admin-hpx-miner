import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CreditCard, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface BankingInfoProps {
  onBack?: () => void;
}

export function BankingInfo({ onBack }: BankingInfoProps) {
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [editingAccount, setEditingAccount] = useState<number | null>(null);

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      type: 'pix',
      bank: 'Banco do Brasil',
      accountHolder: 'João Silva Santos',
      pixKey: 'joao@email.com',
      pixKeyType: 'email',
      isDefault: true,
      status: 'verified'
    },
    {
      id: 2,
      type: 'usdt_wallet',
      bank: 'USDT Wallet',
      accountHolder: 'João Silva Santos',
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      network: 'TRC20',
      isDefault: false,
      status: 'pending'
    }
  ]);

  const [newAccount, setNewAccount] = useState({
    type: 'pix',
    bank: '',
    accountHolder: '',
    pixKey: '',
    pixKeyType: 'email',
    agency: '',
    account: '',
    accountType: 'Conta Corrente',
    walletAddress: '',
    network: 'TRC20'
  });

  const handleAddAccount = () => {
    const account = {
      id: Date.now(),
      ...newAccount,
      isDefault: bankAccounts.length === 0,
      status: 'pending'
    };
    setBankAccounts([...bankAccounts, account]);
    setNewAccount({
      type: 'pix',
      bank: '',
      accountHolder: '',
      pixKey: '',
      pixKeyType: 'email',
      agency: '',
      account: '',
      accountType: 'Conta Corrente',
      walletAddress: '',
      network: 'TRC20'
    });
    setIsAddingAccount(false);
  };

  const handleSetDefault = (id: number) => {
    setBankAccounts(accounts =>
      accounts.map(account => ({
        ...account,
        isDefault: account.id === id
      }))
    );
  };

  const handleDeleteAccount = (id: number) => {
    setBankAccounts(accounts => accounts.filter(account => account.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified':
        return 'Verificada';
      case 'pending':
        return 'Pendente';
      case 'rejected':
        return 'Rejeitada';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Informações Bancárias</h1>
          <p className="text-gray-600">Gerencie suas contas para recebimento de saques</p>
        </div>
        <Button onClick={() => setIsAddingAccount(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Adicionar Conta</span>
        </Button>
      </div>

      {/* Add New Account Form */}
      {isAddingAccount && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>Adicionar Nova Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Conta</label>
                <select
                  value={newAccount.type}
                  onChange={(e) => setNewAccount({...newAccount, type: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pix">PIX</option>
                  <option value="bank_account">Conta Bancária</option>
                  <option value="usdt_wallet">USDT Wallet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                <input
                  type="text"
                  value={newAccount.bank}
                  onChange={(e) => setNewAccount({...newAccount, bank: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nome do banco"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Titular</label>
              <input
                type="text"
                value={newAccount.accountHolder}
                onChange={(e) => setNewAccount({...newAccount, accountHolder: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nome completo do titular"
              />
            </div>

            {newAccount.type === 'pix' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo da Chave PIX</label>
                  <select
                    value={newAccount.pixKeyType}
                    onChange={(e) => setNewAccount({...newAccount, pixKeyType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="email">E-mail</option>
                    <option value="cpf">CPF</option>
                    <option value="phone">Telefone</option>
                    <option value="random">Chave Aleatória</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chave PIX</label>
                  <input
                    type="text"
                    value={newAccount.pixKey}
                    onChange={(e) => setNewAccount({...newAccount, pixKey: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Sua chave PIX"
                  />
                </div>
              </div>
            ) : newAccount.type === 'usdt_wallet' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rede</label>
                  <select
                    value={newAccount.network}
                    onChange={(e) => setNewAccount({...newAccount, network: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="TRC20">TRC20 (Tron)</option>
                    <option value="ERC20">ERC20 (Ethereum)</option>
                    <option value="BEP20">BEP20 (BSC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço da Wallet</label>
                  <input
                    type="text"
                    value={newAccount.walletAddress}
                    onChange={(e) => setNewAccount({...newAccount, walletAddress: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Endereço da sua wallet USDT"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agência</label>
                  <input
                    type="text"
                    value={newAccount.agency}
                    onChange={(e) => setNewAccount({...newAccount, agency: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conta</label>
                  <input
                    type="text"
                    value={newAccount.account}
                    onChange={(e) => setNewAccount({...newAccount, account: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="00000-0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Conta</label>
                  <select
                    value={newAccount.accountType}
                    onChange={(e) => setNewAccount({...newAccount, accountType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Conta Corrente">Conta Corrente</option>
                    <option value="Conta Poupança">Conta Poupança</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsAddingAccount(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddAccount}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Adicionar Conta
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bank Accounts List */}
      <div className="grid gap-6">
        {bankAccounts.map((account) => (
          <Card key={account.id} className={`${account.isDefault ? 'border-2 border-blue-200 bg-blue-50' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{account.bank}</span>
                      {account.isDefault && (
                        <Badge className="bg-blue-100 text-blue-800">Padrão</Badge>
                      )}
                    </CardTitle>
                    <p className="text-gray-600">{account.accountHolder}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(account.status)}>
                    {getStatusText(account.status)}
                  </Badge>
                  <div className="flex space-x-1">
                    {!account.isDefault && account.status === 'verified' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSetDefault(account.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    {!account.isDefault && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteAccount(account.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Tipo de Conta</h4>
                  <p className="text-gray-600 capitalize">
                    {account.type === 'pix' ? 'PIX' : account.type === 'usdt_wallet' ? 'USDT Wallet' : 'Conta Bancária'}
                  </p>
                </div>
                
                {account.type === 'pix' ? (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Chave PIX</h4>
                    <p className="text-gray-600">{account.pixKey}</p>
                    <p className="text-sm text-gray-500 capitalize">Tipo: {account.pixKeyType}</p>
                  </div>
                ) : account.type === 'usdt_wallet' ? (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Informações da Wallet</h4>
                    <p className="text-gray-600 font-mono text-sm break-all">{account.walletAddress}</p>
                    <p className="text-sm text-gray-500">Rede: {account.network}</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Dados da Conta</h4>
                    <p className="text-gray-600">Agência: {account.agency}</p>
                    <p className="text-gray-600">Conta: {account.account}</p>
                    <p className="text-sm text-gray-500">{account.accountType}</p>
                  </div>
                )}
              </div>
              
              {account.status === 'verified' && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">Conta verificada e aprovada para saques</span>
                  </div>
                </div>
              )}
              
              {account.status === 'pending' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-yellow-800">Aguardando verificação (até 24h)</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {bankAccounts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma conta cadastrada</h3>
            <p className="text-gray-600 mb-4">Adicione uma conta bancária para receber seus saques</p>
            <Button onClick={() => setIsAddingAccount(true)}>
              Adicionar Primeira Conta
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}