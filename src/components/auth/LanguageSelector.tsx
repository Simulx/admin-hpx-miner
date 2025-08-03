import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage, Language } from './LanguageContext';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ImageWithFallback } from './figma/ImageWithFallback';

const languages = [
  { 
    code: 'en' as Language, 
    name: 'English', 
    flag: '//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/40px-Flag_of_the_United_States.svg.png',
    fallback: '🇺🇸'
  },
  { 
    code: 'es' as Language, 
    name: 'Español', 
    flag: '//upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/40px-Flag_of_Spain.svg.png',
    fallback: '🇪🇸'
  },
  { 
    code: 'pt' as Language, 
    name: 'Português', 
    flag: '//upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/40px-Flag_of_Brazil.svg.png',
    fallback: '🇧🇷'
  }
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 py-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white relative z-[201]">
            <Globe className="h-4 w-4" />
            <div className="w-4 h-4 rounded-sm overflow-hidden">
              <ImageWithFallback 
                src={`https:${currentLanguage?.flag}`}
                alt={currentLanguage?.name || 'Flag'}
                className="w-full h-full object-cover"
                style={{ width: '16px', height: '16px' }}
              />
            </div>
            <ChevronDown className="h-3 w-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-48 p-1 bg-white shadow-2xl border border-gray-200 relative z-[9999]"
          align="end" 
          sideOffset={12}
          avoidCollisions={true}
          style={{ zIndex: 9999 }}
        >
          <div className="space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                  language === lang.code
                    ? 'bg-[#2d2d2d] text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="w-6 h-4 rounded-sm overflow-hidden flex-shrink-0">
                  <ImageWithFallback 
                    src={`https:${lang.flag}`}
                    alt={lang.name}
                    className="w-full h-full object-cover"
                    style={{ width: '24px', height: '16px' }}
                  />
                </div>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}