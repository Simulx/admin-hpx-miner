import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Receipt, Download, Filter, Search, ArrowUpRight, ArrowDownLeft, Plus, Minus } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface AccountStatementProps {
  onBack?: () => void;
}

export function AccountStatement({ onBack }: AccountStatementProps) {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    {
      id: 'TXN001',
      date: '2025-07-11',
      time: '14:35',
      type: 'earnings',
      description: 'Rendimento Diário - Pack Premium',
      amount: 200.00,
      status: 'completed',
      reference: 'Pack Premium (4% ao dia)'
    },
    {
      id: 'TXN002',
      date: '2025-07-11',
      time: '14:35',
      description: 'Rendimento Diário - Pack Elite',
      type: 'earnings',
      amount: 500.00,
      status: 'completed',
      reference: 'Pack Elite (5% ao dia)'
    },
    {
      id: 'TXN003',
      date: '2025-07-11',
      time: '12:20',
      type: 'bonus',
      description: 'Bônus de Indicação - Jesus the King',
      amount: 25.00,
      status: 'completed',
      reference: '1º Nível (10%)'
    },
    {
      id: 'TXN004',
      date: '2025-07-10',
      time: '16:30',
      type: 'withdrawal',
      description: 'Saque via PIX',
      amount: -1000.00,
      status: 'completed',
      reference: 'PIX: ***123'
    },
    {
      id: 'TXN005',
      date: '2025-07-10',
      time: '14:35',
      type: 'earnings',
      description: 'Rendimento Diário - Pack Premium',
      amount: 200.00,
      status: 'completed',
      reference: 'Pack Premium (4% ao dia)'
    },
    {
      id: 'TXN006',
      date: '2025-07-09',
      time: '09:15',
      type: 'investment',
      description: 'Novo Investimento - Pack Elite',
      amount: -10000.00,
      status: 'completed',
      reference: 'Pack Elite (5% ao dia)'
    },
    {
      id: 'TXN007',
      date: '2025-07-08',
      time: '11:45',
      type: 'deposit',
      description: 'Depósito via PIX',
      amount: 10000.00,
      status: 'completed',
      reference: 'PIX: Banco XYZ'
    },
    {
      id: 'TXN008',
      date: '2025-07-07',
      time: '16:30',
      type: 'withdrawal',
      description: 'Saque via TED',
      amount: -750.00,
      status: 'pending',
      reference: 'TED: Banco ABC'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earnings':
      case 'bonus':
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case 'withdrawal':
      case 'investment':
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      default:
        return <Receipt className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (amount > 0) return 'text-green-600';
    if (amount < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return 'Desconhecido';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalIncome = transactions
    .filter(t => t.amount > 0 && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOutcome = transactions
    .filter(t => t.amount < 0 && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Extrato da Conta</h1>
          <p className="text-gray-600">Histórico completo de transações</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Exportar PDF</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-custom" style={{ border: '1px solid rgba(255, 155, 51, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Entradas</CardTitle>
            <Plus className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom" style={{ border: '1px solid rgba(255, 155, 51, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
            <Minus className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalOutcome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card className="shadow-custom" style={{ border: '1px solid rgba(255, 155, 51, 0.3)' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Líquido</CardTitle>
            <Receipt className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {(totalIncome - totalOutcome).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Diferença</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="w-5 h-5" />
              <span>Transações</span>
            </CardTitle>
            
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar transações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os tipos</option>
                <option value="earnings">Rendimentos</option>
                <option value="bonus">Bônus</option>
                <option value="deposit">Depósitos</option>
                <option value="withdrawal">Saques</option>
                <option value="investment">Investimentos</option>
              </select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Data/Hora</th>
                  <th className="text-left py-3 px-4">Tipo</th>
                  <th className="text-left py-3 px-4">Descrição</th>
                  <th className="text-left py-3 px-4">Referência</th>
                  <th className="text-left py-3 px-4">Valor</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <div>{new Date(transaction.date).toLocaleDateString('pt-BR')}</div>
                        <div className="text-gray-500">{transaction.time}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="text-sm capitalize">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{transaction.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">{transaction.reference}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`font-bold ${getTransactionColor(transaction.type, transaction.amount)}`}>
                        {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {getStatusText(transaction.status)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhuma transação encontrada</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}