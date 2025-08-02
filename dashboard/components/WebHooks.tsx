import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Webhook,
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download,
  ArrowUpDown,
  Calendar,
  DollarSign,
  CreditCard,
  Banknote,
  TrendingUp,
  TrendingDown,
  Activity,
  Bell
} from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';
import { toast } from 'sonner@2.0.3';

interface WebHooksProps {
  onBack?: () => void;
}

export function WebHooks({ onBack }: WebHooksProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedWebhook, setSelectedWebhook] = useState<any>(null);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock data for webhooks
  const webhooksData = [
    {
      id: 'wh_001',
      timestamp: '2025-07-18 10:30:15',
      type: 'PIX_PAYMENT',
      category: 'PAYMENT',
      status: 'SUCCESS',
      amount: 1500.00,
      currency: 'BRL',
      userId: 'user_123',
      userName: 'João Silva Santos',
      transactionId: 'tx_pix_789456',
      pixKey: 'joao.silva@email.com',
      description: 'Pagamento de investimento - Pack Premium',
      processingTime: '2.3s',
      attempts: 1,
      response: { status: 'approved', message: 'Payment processed successfully' },
      headers: { 'x-signature': 'sha256=abc123', 'content-type': 'application/json' },
      rawPayload: '{"amount": 1500.00, "currency": "BRL", "status": "approved"}'
    },
    {
      id: 'wh_002',
      timestamp: '2025-07-18 09:45:32',
      type: 'USDT_PAYMENT',
      category: 'PAYMENT',
      status: 'SUCCESS',
      amount: 500.00,
      currency: 'USDT',
      userId: 'user_456',
      userName: 'Maria Oliveira Santos',
      transactionId: 'tx_usdt_123789',
      walletAddress: '0x742d35Cc6232d8532c38C4dd7b6E1E5A99D1A4A4',
      description: 'Pagamento de investimento - Pack Padrão',
      processingTime: '1.8s',
      attempts: 1,
      response: { status: 'confirmed', confirmations: 12 },
      headers: { 'authorization': 'Bearer token123', 'content-type': 'application/json' },
      rawPayload: '{"amount": 500.00, "currency": "USDT", "confirmations": 12}'
    },
    {
      id: 'wh_003',
      timestamp: '2025-07-18 09:15:22',
      type: 'PIX_WITHDRAWAL',
      category: 'WITHDRAWAL',
      status: 'PENDING',
      amount: 800.00,
      currency: 'BRL',
      userId: 'user_789',
      userName: 'Carlos Alberto Mendes',
      transactionId: 'tx_pix_withdraw_456',
      pixKey: '123.456.789-00',
      description: 'Saque de rendimentos via PIX',
      processingTime: '5.2s',
      attempts: 2,
      response: { status: 'processing', estimated_completion: '10 minutes' },
      headers: { 'x-signature': 'sha256=def456', 'content-type': 'application/json' },
      rawPayload: '{"amount": 800.00, "currency": "BRL", "status": "processing"}'
    },
    {
      id: 'wh_004',
      timestamp: '2025-07-18 08:30:45',
      type: 'USDT_WITHDRAWAL',
      category: 'WITHDRAWAL',
      status: 'FAILED',
      amount: 1200.00,
      currency: 'USDT',
      userId: 'user_321',
      userName: 'Ana Paula Costa Silva',
      transactionId: 'tx_usdt_withdraw_789',
      walletAddress: '0x8ba1f109551bD432803012645Hac136c82dC3e2d',
      description: 'Saque de bônus via USDT',
      processingTime: '15.7s',
      attempts: 3,
      response: { status: 'failed', error: 'Insufficient gas fee' },
      headers: { 'authorization': 'Bearer token456', 'content-type': 'application/json' },
      rawPayload: '{"amount": 1200.00, "currency": "USDT", "error": "Insufficient gas fee"}'
    },
    {
      id: 'wh_005',
      timestamp: '2025-07-18 07:20:18',
      type: 'PIX_PAYMENT',
      category: 'PAYMENT',
      status: 'SUCCESS',
      amount: 2500.00,
      currency: 'BRL',
      userId: 'user_654',
      userName: 'Roberto Mendes Lima',
      transactionId: 'tx_pix_987321',
      pixKey: '(11) 99999-8888',
      description: 'Pagamento de investimento - Pack Elite',
      processingTime: '1.9s',
      attempts: 1,
      response: { status: 'approved', message: 'Payment processed successfully' },
      headers: { 'x-signature': 'sha256=ghi789', 'content-type': 'application/json' },
      rawPayload: '{"amount": 2500.00, "currency": "BRL", "status": "approved"}'
    },
    {
      id: 'wh_006',
      timestamp: '2025-07-18 06:45:12',
      type: 'USDT_PAYMENT',
      category: 'PAYMENT',
      status: 'PENDING',
      amount: 750.00,
      currency: 'USDT',
      userId: 'user_987',
      userName: 'Fernanda Lima Santos',
      transactionId: 'tx_usdt_654987',
      walletAddress: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      description: 'Pagamento de investimento - Pack Premium',
      processingTime: '8.3s',
      attempts: 1,
      response: { status: 'pending', confirmations: 3, required: 12 },
      headers: { 'authorization': 'Bearer token789', 'content-type': 'application/json' },
      rawPayload: '{"amount": 750.00, "currency": "USDT", "confirmations": 3}'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'FAILED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string, category: string) => {
    if (category === 'PAYMENT') {
      if (type.includes('PIX')) {
        return <CreditCard className="w-4 h-4 text-blue-500" />;
      } else {
        return <DollarSign className="w-4 h-4 text-green-500" />;
      }
    } else {
      if (type.includes('PIX')) {
        return <Banknote className="w-4 h-4 text-orange-500" />;
      } else {
        return <TrendingDown className="w-4 h-4 text-purple-500" />;
      }
    }
  };

  const getCategoryBadge = (category: string) => {
    return category === 'PAYMENT' ? (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        <TrendingUp className="w-3 h-3 mr-1" />
        Pagamento
      </Badge>
    ) : (
      <Badge className="bg-orange-100 text-orange-800 border-orange-200">
        <TrendingDown className="w-3 h-3 mr-1" />
        Saque
      </Badge>
    );
  };

  const filteredWebhooks = webhooksData.filter(webhook => {
    const matchesSearch = webhook.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webhook.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webhook.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || webhook.status === statusFilter;
    const matchesType = typeFilter === 'all' || webhook.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedWebhooks = [...filteredWebhooks].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'timestamp':
        aValue = new Date(a.timestamp).getTime();
        bValue = new Date(b.timestamp).getTime();
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        aValue = a.timestamp;
        bValue = b.timestamp;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleRefresh = () => {
    toast.success('WebHooks atualizados com sucesso!');
  };

  const handleViewDetails = (webhook: any) => {
    setSelectedWebhook(webhook);
  };

  const handleExport = () => {
    toast.success('Relatório de WebHooks exportado com sucesso!');
  };

  const getStats = () => {
    const total = webhooksData.length;
    const success = webhooksData.filter(w => w.status === 'SUCCESS').length;
    const pending = webhooksData.filter(w => w.status === 'PENDING').length;
    const failed = webhooksData.filter(w => w.status === 'FAILED').length;
    const totalAmount = webhooksData.reduce((sum, w) => sum + w.amount, 0);
    
    return { total, success, pending, failed, totalAmount };
  };

  const stats = getStats();

  if (selectedWebhook) {
    return (
      <div className="space-y-6">
        <MobileBackButton onBack={() => setSelectedWebhook(null)} title="Voltar aos WebHooks" />
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detalhes do WebHook</h1>
            <p className="text-gray-600">ID: {selectedWebhook.id}</p>
          </div>
          <Button onClick={() => setSelectedWebhook(null)} variant="outline">
            Voltar à Lista
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Informações Básicas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedWebhook.status)}
                    <Badge className={getStatusColor(selectedWebhook.status)}>
                      {selectedWebhook.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tipo</p>
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(selectedWebhook.type, selectedWebhook.category)}
                    <span className="font-medium">{selectedWebhook.type}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Categoria</p>
                  {getCategoryBadge(selectedWebhook.category)}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valor</p>
                  <p className="font-bold text-lg">
                    {selectedWebhook.currency} {selectedWebhook.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Data/Hora</p>
                  <p className="font-medium">{selectedWebhook.timestamp}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tempo de Processamento</p>
                  <p className="font-medium">{selectedWebhook.processingTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Informações do Usuário</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Usuário</p>
                <p className="font-medium">{selectedWebhook.userName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID do Usuário</p>
                <p className="font-mono text-sm">{selectedWebhook.userId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ID da Transação</p>
                <p className="font-mono text-sm">{selectedWebhook.transactionId}</p>
              </div>
              {selectedWebhook.pixKey && (
                <div>
                  <p className="text-sm text-gray-500">Chave PIX</p>
                  <p className="font-mono text-sm">{selectedWebhook.pixKey}</p>
                </div>
              )}
              {selectedWebhook.walletAddress && (
                <div>
                  <p className="text-sm text-gray-500">Endereço da Carteira</p>
                  <p className="font-mono text-xs break-all">{selectedWebhook.walletAddress}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Descrição</p>
                <p className="text-sm">{selectedWebhook.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Webhook className="w-5 h-5" />
                <span>Detalhes Técnicos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Tentativas</p>
                  <p className="font-medium">{selectedWebhook.attempts}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Status da Resposta</p>
                  <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto">
{JSON.stringify(selectedWebhook.response, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Headers</p>
                <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto">
{JSON.stringify(selectedWebhook.headers, null, 2)}
                </pre>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Payload Bruto</p>
                <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto">
{selectedWebhook.rawPayload}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Monitoramento de WebHooks</h1>
          <p className="text-gray-600">Monitore webhooks de pagamentos PIX/USDT e saques em tempo real</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total WebHooks</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sucesso</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.success}</div>
            <p className="text-xs text-muted-foreground">{((stats.success / stats.total) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">{((stats.pending / stats.total) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Falhas</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">{((stats.failed / stats.total) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card className="shadow-admin-cards">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              R$ {stats.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Últimas 24h</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por usuário, transação ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="SUCCESS">Sucesso</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="FAILED">Falha</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="PIX_PAYMENT">PIX Pagamento</SelectItem>
                <SelectItem value="USDT_PAYMENT">USDT Pagamento</SelectItem>
                <SelectItem value="PIX_WITHDRAWAL">PIX Saque</SelectItem>
                <SelectItem value="USDT_WITHDRAWAL">USDT Saque</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timestamp">Data/Hora</SelectItem>
                <SelectItem value="amount">Valor</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* WebHooks Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Webhook className="w-5 h-5" />
              <span>WebHooks Recebidos</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tentativas</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedWebhooks.map((webhook) => (
                <TableRow key={webhook.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{webhook.timestamp.split(' ')[1]}</p>
                      <p className="text-sm text-gray-500">{webhook.timestamp.split(' ')[0]}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(webhook.type, webhook.category)}
                      <div>
                        <p className="font-medium text-sm">{webhook.type.replace('_', ' ')}</p>
                        {getCategoryBadge(webhook.category)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{webhook.userName}</p>
                      <p className="text-sm text-gray-500 font-mono">{webhook.transactionId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-bold">
                        {webhook.currency} {webhook.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-gray-500">{webhook.processingTime}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(webhook.status)}
                      <Badge className={getStatusColor(webhook.status)}>
                        {webhook.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {webhook.attempts}x
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(webhook)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {sortedWebhooks.length === 0 && (
            <div className="text-center py-8">
              <Webhook className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum webhook encontrado</p>
              <p className="text-sm text-gray-400">Tente ajustar os filtros de busca</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}