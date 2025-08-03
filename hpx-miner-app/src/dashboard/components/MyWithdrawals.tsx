import React from 'react';
import { Clock, CheckCircle, XCircle, Calendar, DollarSign } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface MyWithdrawalsProps {
  onBack?: () => void;
}

export function MyWithdrawals({ onBack }: MyWithdrawalsProps) {
  const withdrawals = [
    {
      id: 1,
      amount: 1500,
      date: '2024-01-15',
      status: 'completed',
      method: 'PIX',
      processedDate: '2024-01-15',
      transactionId: 'WD001'
    },
    {
      id: 2,
      amount: 800,
      date: '2024-01-10',
      status: 'pending',
      method: 'PIX',
      processedDate: null,
      transactionId: 'WD002'
    },
    {
      id: 3,
      amount: 2000,
      date: '2024-01-05',
      status: 'rejected',
      method: 'TED',
      processedDate: '2024-01-06',
      transactionId: 'WD003'
    },
    {
      id: 4,
      amount: 500,
      date: '2024-01-03',
      status: 'completed',
      method: 'PIX',
      processedDate: '2024-01-03',
      transactionId: 'WD004'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'rejected':
        return 'Rejeitado';
      default:
        return 'Pendente';
    }
  };

  return (
    <div className="space-y-6">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Meus Saques Solicitados</h2>
          <p className="text-gray-600">Histórico de todas as suas solicitações de saque</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 shadow-custom">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600">Saques Concluídos</p>
              <p className="text-2xl font-bold text-gray-900">R$ 2.000</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-100 shadow-custom">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-600">Saques Pendentes</p>
              <p className="text-2xl font-bold text-gray-900">R$ 800</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 shadow-custom">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-600">Total Solicitado</p>
              <p className="text-2xl font-bold text-gray-900">R$ 4.800</p>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawals List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Histórico de Saques</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Solicitação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Método
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Processamento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {withdrawal.transactionId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {withdrawal.amount.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(withdrawal.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {withdrawal.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                      {getStatusIcon(withdrawal.status)}
                      <span>{getStatusText(withdrawal.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {withdrawal.processedDate ? new Date(withdrawal.processedDate).toLocaleDateString('pt-BR') : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}