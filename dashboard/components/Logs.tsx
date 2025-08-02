import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  XCircle,
  Clock,
  User,
  Database,
  Shield,
  Activity
} from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';

interface LogsProps {
  onBack: () => void;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  category: string;
  user?: string;
  action: string;
  details: string;
  ip?: string;
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2025-01-14 10:30:25',
    level: 'INFO',
    category: 'Sistema',
    user: 'admin@hpxminer.com',
    action: 'Login realizado',
    details: 'Usuário administrador fez login no sistema',
    ip: '192.168.1.100'
  },
  {
    id: '2',
    timestamp: '2025-01-14 10:28:15',
    level: 'SUCCESS',
    category: 'Investimento',
    user: 'joao.silva@email.com',
    action: 'Novo investimento criado',
    details: 'Investimento de R$ 5.000,00 no plano Premium',
    ip: '203.45.67.89'
  },
  {
    id: '3',
    timestamp: '2025-01-14 10:25:42',
    level: 'WARNING',
    category: 'Segurança',
    user: 'maria.santos@email.com',
    action: 'Tentativa de login falhada',
    details: 'Falha na autenticação - senha incorreta (3ª tentativa)',
    ip: '187.23.45.67'
  },
  {
    id: '4',
    timestamp: '2025-01-14 10:22:18',
    level: 'INFO',
    category: 'Financeiro',
    user: 'pedro.oliveira@email.com',
    action: 'Saque solicitado',
    details: 'Solicitação de saque no valor de R$ 2.500,00',
    ip: '201.34.56.78'
  },
  {
    id: '5',
    timestamp: '2025-01-14 10:20:05',
    level: 'ERROR',
    category: 'Sistema',
    action: 'Erro de conexão com banco de dados',
    details: 'Falha na conexão com servidor MySQL - timeout após 30s',
    ip: 'localhost'
  },
  {
    id: '6',
    timestamp: '2025-01-14 10:15:33',
    level: 'INFO',
    category: 'Usuário',
    user: 'ana.costa@email.com',
    action: 'Perfil atualizado',
    details: 'Informações bancárias atualizadas pelo usuário',
    ip: '179.12.34.56'
  },
  {
    id: '7',
    timestamp: '2025-01-14 10:12:47',
    level: 'SUCCESS',
    category: 'Financeiro',
    user: 'carlos.mendes@email.com',
    action: 'Pagamento processado',
    details: 'Rendimento de R$ 150,00 creditado na conta',
    ip: 'sistema'
  },
  {
    id: '8',
    timestamp: '2025-01-14 10:08:21',
    level: 'WARNING',
    category: 'Sistema',
    action: 'Alta utilização de CPU',
    details: 'Uso de CPU acima de 80% por mais de 5 minutos',
    ip: 'servidor-01'
  }
];

export function Logs({ onBack }: LogsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'SUCCESS':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'WARNING':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'ERROR':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLogBadgeColor = (level: string) => {
    switch (level) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'WARNING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'ERROR':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sistema':
        return <Database className="w-4 h-4" />;
      case 'Segurança':
        return <Shield className="w-4 h-4" />;
      case 'Usuário':
        return <User className="w-4 h-4" />;
      case 'Financeiro':
      case 'Investimento':
        return <Activity className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || log.category === selectedCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const categories = Array.from(new Set(mockLogs.map(log => log.category)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <MobileBackButton onBack={onBack} />
          <h1 className="text-3xl text-slate-800 mb-2">Logs do Sistema</h1>
          <p className="text-slate-600">
            Registro histórico detalhado das atividades do sistema
          </p>
        </div>
      </div>

      {/* Filtros e Controles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros e Controles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar logs..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtro por Nível */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                <SelectItem value="INFO">INFO</SelectItem>
                <SelectItem value="SUCCESS">SUCCESS</SelectItem>
                <SelectItem value="WARNING">WARNING</SelectItem>
                <SelectItem value="ERROR">ERROR</SelectItem>
              </SelectContent>
            </Select>

            {/* Filtro por Categoria */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Ações */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex-1"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Logs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Registros de Atividade
            </CardTitle>
            <Badge variant="secondary">
              {filteredLogs.length} registros encontrados
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="space-y-0">
              {filteredLogs.map((log, index) => (
                <div key={log.id}>
                  <div className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* Ícone e Timestamp */}
                      <div className="flex flex-col items-center gap-2 min-w-0">
                        {getLogIcon(log.level)}
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {log.timestamp.split(' ')[1]}
                        </div>
                      </div>

                      {/* Conteúdo do Log */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getLogBadgeColor(log.level)}>
                            {log.level}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getCategoryIcon(log.category)}
                            {log.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {log.timestamp.split(' ')[0]}
                          </span>
                        </div>

                        <h4 className="font-medium text-slate-900 mb-1">
                          {log.action}
                        </h4>
                        
                        <p className="text-sm text-slate-600 mb-2">
                          {log.details}
                        </p>

                        {/* Informações adicionais */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {log.user && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {log.user}
                            </div>
                          )}
                          {log.ip && (
                            <div className="flex items-center gap-1">
                              <span>IP:</span>
                              <code className="bg-slate-100 px-1 rounded">
                                {log.ip}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < filteredLogs.length - 1 && <Separator />}
                </div>
              ))}
              
              {filteredLogs.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum log encontrado com os filtros aplicados.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">INFO</p>
                <p className="text-2xl font-bold">
                  {mockLogs.filter(log => log.level === 'INFO').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">SUCCESS</p>
                <p className="text-2xl font-bold">
                  {mockLogs.filter(log => log.level === 'SUCCESS').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">WARNING</p>
                <p className="text-2xl font-bold">
                  {mockLogs.filter(log => log.level === 'WARNING').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">ERROR</p>
                <p className="text-2xl font-bold">
                  {mockLogs.filter(log => log.level === 'ERROR').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}