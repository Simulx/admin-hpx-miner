import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';

interface MobileBackButtonProps {
  onBack: () => void;
  title?: string;
}

export function MobileBackButton({ onBack, title = "Voltar ao Início" }: MobileBackButtonProps) {
  const isMobile = useIsMobile();
  
  if (!isMobile) {
    return null;
  }

  return (
    <div className="mb-4">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 p-3 rounded-xl transition-all duration-200 hover:scale-105 bg-gray-100 text-gray-600 hover:bg-gray-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">{title}</span>
      </button>
    </div>
  );
}