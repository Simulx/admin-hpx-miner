import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Receipt, 
  Search, 
  Filter, 
  MessageCircle,
  Eye,
  Download,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';
import { toast } from 'sonner';

interface GeneratedInvoicesProps {
  onBack?: () => void;
}

interface Invoice {
  id: string;
  name: string;
  plan: string;
  paymentMethod: 'PIX' | 'USDT';
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  amount: number;
  createdAt: string;
  dueDate: string;
  phone: string;
}

export function GeneratedInvoices({ onBack }: GeneratedInvoicesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');

  // Mock data for invoices
  const invoices: Invoice[] = [
    {
      id: '001',
      name: 'João Silva Santos',
      plan: 'Pack Elite',
      paymentMethod: 'PIX',
      status: 'paid',
      amount: 15000.00,
      createdAt: '2025-07-10',
      dueDate: '2025-07-15',
      phone: '5511999999999'
    },
    {
      id: '002',
      name: 'Maria Oliveira Costa',
      plan: 'Pack Premium',
      paymentMethod: 'USDT',
      status: 'pending',
      amount: 8000.00,
      createdAt: '2025-07-12',
      dueDate: '2025-07-17',
      phone: '5511888888888'
    },
    {
      id: '003',
      name: 'Carlos Alberto Mendes',
      plan: 'Pack Padrão',
      paymentMethod: 'PIX',
      status: 'overdue',
      amount: 3500.00,
      createdAt: '2025-07-08',
      dueDate: '2025-07-13',
      phone: '5511777777777'
    },
    {
      id: '004',
      name: 'Ana Paula Costa Silva',
      plan: 'Pack Básico',
      paymentMethod: 'PIX',
      status: 'paid',
      amount: 500.00,
      createdAt: '2025-07-11',
      dueDate: '2025-07-16',
      phone: '5511666666666'
    },
    {
      id: '005',
      name: 'Roberto Mendes Lima',
      plan: 'Pack Elite',
      paymentMethod: 'USDT',
      status: 'pending',
      amount: 25000.00,
      createdAt: '2025-07-13',
      dueDate: '2025-07-18',
      phone: '5511555555555'
    },
    {
      id: '006',
      name: 'Fernanda Lima Santos',
      plan: 'Pack Premium',
      paymentMethod: 'PIX',
      status: 'cancelled',
      amount: 12000.00,
      createdAt: '2025-07-09',
      dueDate: '2025-07-14',
      phone: '5511444444444'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Vencida';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'PIX':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'USDT':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleWhatsAppContact = (phone: string, name: string, invoiceId: string) => {
    const message = encodeURIComponent(
      `Olá ${name}! Estamos entrando em contato sobre a fatura ${invoiceId}. Como podemos ajudá-lo?`
    );
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    toast.success(`Abrindo WhatsApp para contato com ${name}`);
  };

  const handleViewInvoice = (invoiceId: string) => {
    toast.info(`Visualizando fatura ${invoiceId}`);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Download da fatura ${invoiceId} iniciado`);
  };

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'all' || invoice.paymentMethod === paymentMethodFilter;
    
    return matchesSearch && matchesStatus && matchesPaymentMethod;
  });

  // Statistics
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faturas Geradas</h1>
          <p className="text-gray-600">Gerencie e acompanhe todas as faturas da plataforma</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Faturas</CardTitle>
            <Receipt className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvoices}</div>
            <p className="text-xs text-muted-foreground">Faturas emitidas</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{paidInvoices}</div>
            <p className="text-xs text-muted-foreground">Faturas quitadas</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingInvoices}</div>
            <p className="text-xs text-muted-foreground">Aguardando pagamento</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueInvoices}</div>
            <p className="text-xs text-muted-foreground">Faturas vencidas</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-admin-cards bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <DollarSign className="w-5 h-5" />
              <span>Valor Total Emitido</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span>Valor Total Recebido</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {paidAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-admin-cards">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar por nome, plano ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status da fatura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="overdue">Vencida</SelectItem>
                <SelectItem value="cancelled">Cancelada</SelectItem>
              </SelectContent>
            </Select>

            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as formas</SelectItem>
                <SelectItem value="PIX">PIX</SelectItem>
                <SelectItem value="USDT">USDT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card className="shadow-admin-cards">
        <CardHeader>
          <CardTitle>Lista de Faturas ({filteredInvoices.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-bold text-gray-900">ID</TableHead>
                  <TableHead className="font-bold text-gray-900">Nome</TableHead>
                  <TableHead className="font-bold text-gray-900">Plano Contratado</TableHead>
                  <TableHead className="font-bold text-gray-900">Valor</TableHead>
                  <TableHead className="font-bold text-gray-900">Forma de Pagamento</TableHead>
                  <TableHead className="font-bold text-gray-900">Status do Pagamento</TableHead>
                  <TableHead className="font-bold text-gray-900">Data de Criação</TableHead>
                  <TableHead className="font-bold text-gray-900">Data de Vencimento</TableHead>
                  <TableHead className="font-bold text-gray-900">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">#{invoice.id}</TableCell>
                    <TableCell className="font-medium">{invoice.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {invoice.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      R$ {invoice.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPaymentMethodColor(invoice.paymentMethod)}>
                        {invoice.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(invoice.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(invoice.status)}
                          <span>{getStatusLabel(invoice.status)}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(invoice.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(invoice.dueDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewInvoice(invoice.id)}
                          className="h-8 w-8 p-0"
                          title="Visualizar fatura"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                          className="h-8 w-8 p-0"
                          title="Download da fatura"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleWhatsAppContact(invoice.phone, invoice.name, invoice.id)}
                          className="bg-green-500 hover:bg-green-600 text-white h-8 w-8 p-0"
                          title="Contato via WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8">
              <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">Nenhuma fatura encontrada</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' || paymentMethodFilter !== 'all'
                  ? 'Tente ajustar os filtros para ver mais resultados.'
                  : 'Não há faturas cadastradas no sistema.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}