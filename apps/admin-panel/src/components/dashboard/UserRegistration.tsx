import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown, User, Mail, Phone, Lock, Users, Search } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';
import { toast } from 'sonner';
import { cn } from './ui/utils';

interface UserRegistrationProps {
  onBack?: () => void;
}

export function UserRegistration({ onBack }: UserRegistrationProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    isLeader: false,
    sponsorId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sponsorOpen, setSponsorOpen] = useState(false);

  // Mock data for sponsors - in a real app, this would come from an API
  const availableSponsors = [
    { id: '1', name: 'João Silva Santos', username: 'joao.silva', email: 'joao.silva@email.com' },
    { id: '2', name: 'Maria Oliveira', username: 'maria.oliveira', email: 'maria.oliveira@email.com' },
    { id: '3', name: 'Carlos Alberto', username: 'carlos.alberto', email: 'carlos.alberto@email.com' },
    { id: '4', name: 'Ana Paula Costa', username: 'ana.costa', email: 'ana.costa@email.com' },
    { id: '5', name: 'Roberto Mendes', username: 'roberto.mendes', email: 'roberto.mendes@email.com' },
    { id: '6', name: 'Fernanda Lima', username: 'fernanda.lima', email: 'fernanda.lima@email.com' }
  ];

  const selectedSponsor = availableSponsors.find(sponsor => sponsor.id === formData.sponsorId);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Usuário é obrigatório';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Usuário deve ter pelo menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sponsorName = selectedSponsor?.name || 'Nenhum';
      const leaderStatus = formData.isLeader ? 'Sim' : 'Não';
      
      toast.success(`Usuário cadastrado com sucesso!\nNome: ${formData.name}\nUsuário: ${formData.username}\nLíder: ${leaderStatus}\nPatrocinado por: ${sponsorName}`);
      
      // Reset form
      setFormData({
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isLeader: false,
        sponsorId: ''
      });
      
    } catch (error) {
      toast.error('Erro ao cadastrar usuário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cadastrar Usuário</h1>
          <p className="text-gray-600">Adicione um novo usuário ao sistema</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Informações do Usuário</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <div>
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite o nome completo"
                className={cn(
                  "mt-1",
                  errors.name && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Usuário */}
            <div>
              <Label htmlFor="username">Usuário *</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder="Digite o nome de usuário"
                className={cn(
                  "mt-1",
                  errors.username && "border-red-500 focus:border-red-500"
                )}
              />
              {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Digite o email"
                  className={cn(
                    "mt-1 pl-10",
                    errors.email && "border-red-500 focus:border-red-500"
                  )}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Telefone */}
            <div>
              <Label htmlFor="phone">Telefone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(11) 99999-9999"
                  className={cn(
                    "mt-1 pl-10",
                    errors.phone && "border-red-500 focus:border-red-500"
                  )}
                />
              </div>
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Digite a senha"
                    className={cn(
                      "mt-1 pl-10",
                      errors.password && "border-red-500 focus:border-red-500"
                    )}
                  />
                </div>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirme a senha"
                    className={cn(
                      "mt-1 pl-10",
                      errors.confirmPassword && "border-red-500 focus:border-red-500"
                    )}
                  />
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Líder Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="leader-toggle" className="text-base font-medium">
                  Líder
                </Label>
                <p className="text-sm text-gray-600">
                  Definir este usuário como líder no sistema
                </p>
              </div>
              <Switch
                id="leader-toggle"
                checked={formData.isLeader}
                onCheckedChange={(checked: boolean) => handleInputChange('isLeader', checked)}
              />
            </div>

            {/* Patrocinado por */}
            <div>
              <Label htmlFor="sponsor">Patrocinado por</Label>
              <div className="mt-1">
                <Popover open={sponsorOpen} onOpenChange={setSponsorOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={sponsorOpen}
                      className="w-full justify-between"
                    >
                      {selectedSponsor ? (
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <div className="text-left">
                            <div className="font-medium">{selectedSponsor.name}</div>
                            <div className="text-sm text-gray-500">@{selectedSponsor.username}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Search className="w-4 h-4" />
                          <span>Selecionar patrocinador...</span>
                        </div>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-w-none p-0">
                    <Command>
                      <CommandInput placeholder="Buscar usuário..." />
                      <CommandList>
                        <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                        <CommandGroup>
                          {availableSponsors.map((sponsor) => (
                            <CommandItem
                              key={sponsor.id}
                              value={`${sponsor.name} ${sponsor.username} ${sponsor.email}`}
                              onSelect={() => {
                                handleInputChange('sponsorId', sponsor.id === formData.sponsorId ? '' : sponsor.id);
                                setSponsorOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.sponsorId === sponsor.id ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div className="flex flex-col">
                                <div className="font-medium">{sponsor.name}</div>
                                <div className="text-sm text-gray-500">@{sponsor.username} • {sponsor.email}</div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Opcional: Selecione o usuário que patrocinou este cadastro
              </p>
            </div>

            {/* Botões */}
            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar Usuário'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}