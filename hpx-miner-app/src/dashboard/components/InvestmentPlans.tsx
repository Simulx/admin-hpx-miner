import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Plus, Save, Upload, DollarSign, Percent, Target, TrendingUp } from 'lucide-react';
import { MobileBackButton } from './MobileBackButton';
import { toast } from 'sonner@2.0.3';

interface InvestmentPlansProps {
  onBack?: () => void;
}

interface Level {
  id: number;
  enabled: boolean;
  percentage: string;
}

export function InvestmentPlans({ onBack }: InvestmentPlansProps) {
  const [planName, setPlanName] = useState('');
  const [planImage, setPlanImage] = useState('');
  const [yieldPercentage, setYieldPercentage] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [lockValue, setLockValue] = useState('');
  
  const [levels, setLevels] = useState<Level[]>(
    Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      enabled: false,
      percentage: ''
    }))
  );

  const handleLevelToggle = (levelId: number, enabled: boolean) => {
    setLevels(prev => prev.map(level => 
      level.id === levelId ? { ...level, enabled } : level
    ));
  };

  const handleLevelPercentage = (levelId: number, percentage: string) => {
    setLevels(prev => prev.map(level => 
      level.id === levelId ? { ...level, percentage } : level
    ));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPlanImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePlan = () => {
    if (!planName.trim()) {
      toast.error('Nome do plano é obrigatório');
      return;
    }
    
    if (!yieldPercentage.trim()) {
      toast.error('Porcentagem de rendimento é obrigatória');
      return;
    }
    
    if (!minValue.trim() || !maxValue.trim()) {
      toast.error('Valores mínimo e máximo são obrigatórios');
      return;
    }

    const enabledLevels = levels.filter(level => level.enabled);
    
    const planData = {
      name: planName,
      image: planImage,
      yieldPercentage: parseFloat(yieldPercentage),
      minValue: parseFloat(minValue),
      maxValue: parseFloat(maxValue),
      lockValue: parseFloat(lockValue) || 0,
      levels: enabledLevels.map(level => ({
        level: level.id,
        percentage: parseFloat(level.percentage)
      }))
    };

    console.log('Plano salvo:', planData);
    toast.success('Plano de investimento salvo com sucesso!');
    
    // Reset form
    setPlanName('');
    setPlanImage('');
    setYieldPercentage('');
    setMinValue('');
    setMaxValue('');
    setLockValue('');
    setLevels(prev => prev.map(level => ({ ...level, enabled: false, percentage: '' })));
  };

  return (
    <div className="space-y-8">
      <MobileBackButton onBack={onBack || (() => {})} title="Voltar ao Início" />
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cadastro de Planos de Investimento</h1>
          <p className="text-gray-600">Crie e configure novos planos de investimento para a plataforma</p>
        </div>
        <Button onClick={handleSavePlan} className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
          <Save className="w-4 h-4" />
          <span>Salvar Plano</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informações Básicas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Informações Básicas do Plano</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="planName">Nome do Plano</Label>
                <Input
                  id="planName"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="Ex: Plano Premium Elite"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="planImage">Imagem do Plano</Label>
                <div className="mt-1 space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      id="planImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('planImage')?.click()}
                      className="flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Selecionar Imagem</span>
                    </Button>
                  </div>
                  {planImage && (
                    <div className="w-32 h-32 border rounded-lg overflow-hidden">
                      <img src={planImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yieldPercentage">Porcentagem de Rendimento (%)</Label>
                  <div className="relative">
                    <Input
                      id="yieldPercentage"
                      type="number"
                      step="0.01"
                      value={yieldPercentage}
                      onChange={(e) => setYieldPercentage(e.target.value)}
                      placeholder="Ex: 2.5"
                      className="mt-1 pr-8"
                    />
                    <Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="lockValue">Valor de Trava de Rendimento (R$)</Label>
                  <div className="relative">
                    <Input
                      id="lockValue"
                      type="number"
                      step="0.01"
                      value={lockValue}
                      onChange={(e) => setLockValue(e.target.value)}
                      placeholder="Ex: 10000.00"
                      className="mt-1 pl-8"
                    />
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minValue">Valor Mínimo de Investimento (R$)</Label>
                  <div className="relative">
                    <Input
                      id="minValue"
                      type="number"
                      step="0.01"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                      placeholder="Ex: 100.00"
                      className="mt-1 pl-8"
                    />
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxValue">Valor Máximo de Investimento (R$)</Label>
                  <div className="relative">
                    <Input
                      id="maxValue"
                      type="number"
                      step="0.01"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      placeholder="Ex: 50000.00"
                      className="mt-1 pl-8"
                    />
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sistema de Níveis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Sistema de Níveis e Bônus</span>
              </CardTitle>
              <p className="text-sm text-gray-600">Configure os níveis de indicação e suas respectivas porcentagens de bônus</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levels.map((level, index) => (
                  <div key={level.id}>
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700 min-w-[80px]">
                            Nível {level.id}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={level.enabled}
                              onCheckedChange={(checked) => handleLevelToggle(level.id, checked)}
                            />
                            <span className="text-sm text-gray-600">
                              {level.enabled ? 'Ativado' : 'Desativado'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {level.enabled && (
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`level-${level.id}`} className="text-sm">
                            Porcentagem:
                          </Label>
                          <div className="relative">
                            <Input
                              id={`level-${level.id}`}
                              type="number"
                              step="0.01"
                              value={level.percentage}
                              onChange={(e) => handleLevelPercentage(level.id, e.target.value)}
                              placeholder="0.00"
                              className="w-24 pr-8"
                            />
                            <Percent className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                          </div>
                        </div>
                      )}
                    </div>
                    {index < levels.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview do Plano */}
        <div className="space-y-6">
          <Card className="shadow-custom">
            <CardHeader>
              <CardTitle>Preview do Plano</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {planImage && (
                <div className="w-full h-32 border rounded-lg overflow-hidden">
                  <img src={planImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{planName || 'Nome do Plano'}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Rendimento:</strong> {yieldPercentage || '0'}% ao mês</p>
                  <p><strong>Investimento:</strong> R$ {minValue || '0'} - R$ {maxValue || '0'}</p>
                  {lockValue && <p><strong>Trava:</strong> R$ {lockValue}</p>}
                </div>
                
                {levels.some(level => level.enabled) && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">Níveis Ativos:</h4>
                    <div className="space-y-1">
                      {levels
                        .filter(level => level.enabled)
                        .map(level => (
                          <div key={level.id} className="flex justify-between text-xs">
                            <span>Nível {level.id}</span>
                            <span>{level.percentage || '0'}%</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-custom">
            <CardHeader>
              <CardTitle className="text-sm">Estatísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Níveis Ativados:</span>
                <span className="font-medium">{levels.filter(level => level.enabled).length}/12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bônus Total:</span>
                <span className="font-medium">
                  {levels
                    .filter(level => level.enabled && level.percentage)
                    .reduce((sum, level) => sum + parseFloat(level.percentage || '0'), 0)
                    .toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}