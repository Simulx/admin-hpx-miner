import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'pt';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Common
  email: {
    en: 'Email',
    es: 'Correo electrónico',
    pt: 'Email'
  },
  password: {
    en: 'Password',
    es: 'Contraseña',
    pt: 'Senha'
  },
  phone: {
    en: 'Phone',
    es: 'Teléfono',
    pt: 'Telefone'
  },
  
  // Login Form
  signIn: {
    en: 'Sign in',
    es: 'Iniciar sesión',
    pt: 'Entrar'
  },
  welcomeBack: {
    en: 'Welcome back to HPX Miner',
    es: 'Bienvenido de vuelta a HPX Miner',
    pt: 'Bem-vindo de volta ao HPX Miner'
  },
  enterEmail: {
    en: 'Enter your email',
    es: 'Ingrese su correo electrónico',
    pt: 'Digite seu email'
  },
  enterPassword: {
    en: 'Enter your password',
    es: 'Ingrese su contraseña',
    pt: 'Digite sua senha'
  },
  forgotPassword: {
    en: 'Forgot password?',
    es: '¿Olvidaste tu contraseña?',
    pt: 'Esqueceu a senha?'
  },
  dontHaveAccount: {
    en: "Don't have an account?",
    es: '¿No tienes una cuenta?',
    pt: 'Não tem uma conta?'
  },
  signUp: {
    en: 'Sign up',
    es: 'Registrarse',
    pt: 'Cadastrar'
  },
  
  // Register Form
  createAccount: {
    en: 'Create Account',
    es: 'Crear Cuenta',
    pt: 'Criar Conta'
  },
  joinToday: {
    en: 'Join HPX Miner today',
    es: 'Únete a HPX Miner hoy',
    pt: 'Junte-se ao HPX Miner hoje'
  },
  completeName: {
    en: 'Complete Name',
    es: 'Nombre Completo',
    pt: 'Nome Completo'
  },
  completeNamePlaceholder: {
    en: 'Complete name',
    es: 'Nombre completo',
    pt: 'Nome completo'
  },
  user: {
    en: 'User',
    es: 'Usuario',
    pt: 'Usuário'
  },
  chooseUsername: {
    en: 'Choose a username',
    es: 'Elige un nombre de usuario',
    pt: 'Escolha um nome de usuário'
  },
  enterPhoneNumber: {
    en: 'Enter your phone number',
    es: 'Ingrese su número de teléfono',
    pt: 'Digite seu número de telefone'
  },
  createPassword: {
    en: 'Create a password',
    es: 'Crear una contraseña',
    pt: 'Criar uma senha'
  },
  confirmPassword: {
    en: 'Confirm Password',
    es: 'Confirmar Contraseña',
    pt: 'Confirmar Senha'
  },
  confirmPasswordPlaceholder: {
    en: 'Confirm your password',
    es: 'Confirma tu contraseña',
    pt: 'Confirme sua senha'
  },
  sponsoredBy: {
    en: 'Sponsored by',
    es: 'Patrocinado por',
    pt: 'Patrocinado por'
  },
  sponsorCode: {
    en: 'Sponsor code (optional)',
    es: 'Código de patrocinador (opcional)',
    pt: 'Código do patrocinador (opcional)'
  },
  agreeTerms: {
    en: 'I agree to the',
    es: 'Acepto los',
    pt: 'Concordo com os'
  },
  termsConditions: {
    en: 'Terms & Conditions',
    es: 'Términos y Condiciones',
    pt: 'Termos e Condições'
  },
  and: {
    en: 'and',
    es: 'y',
    pt: 'e'
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    es: 'Política de Privacidad',
    pt: 'Política de Privacidade'
  },
  alreadyHaveAccount: {
    en: 'Already have an account?',
    es: '¿Ya tienes una cuenta?',
    pt: 'Já tem uma conta?'
  },
  
  // Main page
  welcomeTitle: {
    en: 'Welcome to HPX Miner',
    es: 'Bienvenido a HPX Miner',
    pt: 'Bem-vindo ao HPX Miner'
  },
  welcomeDescription: {
    en: 'Join thousands of miners worldwide and start your cryptocurrency mining journey with our advanced platform and cutting-edge technology.',
    es: 'Únete a miles de mineros en todo el mundo y comienza tu viaje de minería de criptomonedas con nuestra plataforma avanzada y tecnología de vanguardia.',
    pt: 'Junte-se a milhares de mineradores em todo o mundo e comece sua jornada de mineração de criptomoedas com nossa plataforma avançada e tecnologia de ponta.'
  },
  learnMore: {
    en: 'Learn More',
    es: 'Saber Más',
    pt: 'Saiba Mais'
  },
  
  // Validation messages
  passwordsDontMatch: {
    en: "Passwords don't match!",
    es: '¡Las contraseñas no coinciden!',
    pt: 'As senhas não coincidem!'
  },
  acceptTermsError: {
    en: 'Please accept the terms and conditions!',
    es: '¡Por favor acepta los términos y condiciones!',
    pt: 'Por favor aceite os termos e condições!'
  },
  example: {
    en: 'Example',
    es: 'Ejemplo',
    pt: 'Exemplo'
  },
  firstNameRequired: {
    en: 'First name is required',
    es: 'El nombre es obligatorio',
    pt: 'O nome é obrigatório'
  },
  usernameRequired: {
    en: 'Username is required',
    es: 'El nombre de usuario es obligatorio',
    pt: 'O nome de usuário é obrigatório'
  },
  emailRequired: {
    en: 'Email is required',
    es: 'El email es obligatorio',
    pt: 'O email é obrigatório'
  },
  phoneRequired: {
    en: 'Phone is required',
    es: 'El teléfono es obligatorio',
    pt: 'O telefone é obrigatório'
  },
  passwordRequired: {
    en: 'Password is required',
    es: 'La contraseña es obligatoria',
    pt: 'A senha é obrigatória'
  },
  confirmPasswordRequired: {
    en: 'Password confirmation is required',
    es: 'La confirmación de contraseña es obligatoria',
    pt: 'A confirmação de senha é obrigatória'
  },
  passwordTooShort: {
    en: 'Password must be at least 6 characters',
    es: 'La contraseña debe tener al menos 6 caracteres',
    pt: 'A senha deve ter pelo menos 6 caracteres'
  },
  emailAlreadyExists: {
    en: 'This email is already in use',
    es: 'Este email ya está en uso',
    pt: 'Este email já está em uso'
  },
  usernameAlreadyExists: {
    en: 'This username is already in use',
    es: 'Este nombre de usuario ya está en uso',
    pt: 'Este nome de usuário já está em uso'
  },
  invalidSponsorCode: {
    en: 'Invalid sponsor code',
    es: 'Código de patrocinador inválido',
    pt: 'Código de indicação inválido'
  },
  accountCreatedSuccess: {
    en: 'Account created successfully!',
    es: '¡Cuenta creada exitosamente!',
    pt: 'Conta criada com sucesso!'
  },
  registrationError: {
    en: 'Registration error',
    es: 'Error de registro',
    pt: 'Erro no registro'
  },
  connectionError: {
    en: 'Connection error. Please try again.',
    es: 'Error de conexión. Inténtalo de nuevo.',
    pt: 'Erro de conexão. Tente novamente.'
  },
  creating: {
    en: 'Creating...',
    es: 'Creando...',
    pt: 'Criando...'
  },
  logout: {
    en: 'Logout',
    es: 'Cerrar sesión',
    pt: 'Sair'
  },
  welcome: {
    en: 'Welcome',
    es: 'Bienvenido',
    pt: 'Bem-vindo'
  },
  dashboardSubtitle: {
    en: 'Manage your account and track your referrals',
    es: 'Gestiona tu cuenta y rastrea tus referencias',
    pt: 'Gerencie sua conta e acompanhe suas indicações'
  },
  profileInfo: {
    en: 'Profile Information',
    es: 'Información del Perfil',
    pt: 'Informações do Perfil'
  },
  memberSince: {
    en: 'Member since',
    es: 'Miembro desde',
    pt: 'Membro desde'
  },
  referralProgram: {
    en: 'Referral Program',
    es: 'Programa de Referencias',
    pt: 'Programa de Indicações'
  },
  yourReferralCode: {
    en: 'Your Referral Code',
    es: 'Tu Código de Referencia',
    pt: 'Seu Código de Indicação'
  },
  totalReferrals: {
    en: 'Total Referrals',
    es: 'Total de Referencias',
    pt: 'Total de Indicações'
  },
  recentReferrals: {
    en: 'Recent Referrals',
    es: 'Referencias Recientes',
    pt: 'Indicações Recentes'
  },
  noReferralsYet: {
    en: 'No referrals yet',
    es: 'Aún no hay referencias',
    pt: 'Nenhuma indicação ainda'
  },
  shareYourCode: {
    en: 'Share your code to get started',
    es: 'Comparte tu código para empezar',
    pt: 'Compartilhe seu código para começar'
  },
  referralCodeCopied: {
    en: 'Referral code copied!',
    es: '¡Código de referencia copiado!',
    pt: 'Código de indicação copiado!'
  },
  loggedOut: {
    en: 'Successfully logged out',
    es: 'Sesión cerrada exitosamente',
    pt: 'Logout realizado com sucesso'
  },
  fillAllFields: {
    en: 'Please fill all fields',
    es: 'Por favor completa todos los campos',
    pt: 'Preencha todos os campos'
  },
  loginSuccess: {
    en: 'Login successful!',
    es: '¡Inicio de sesión exitoso!',
    pt: 'Login realizado com sucesso!'
  },
  loginError: {
    en: 'Login error',
    es: 'Error de inicio de sesión',
    pt: 'Erro ao fazer login'
  },
  signingIn: {
    en: 'Signing in...',
    es: 'Iniciando sesión...',
    pt: 'Entrando...'
  },
  adminAccess: {
    en: 'Administrative Access',
    es: 'Acceso Administrativo',
    pt: 'Acesso Administrativo'
  },
  adminLoginSubtitle: {
    en: 'Log in to access the administrative panel',
    es: 'Inicie sesión para acceder al panel administrativo',
    pt: 'Faça login para acessar o painel administrativo'
  },
  adminLogin: {
    en: 'Access Panel',
    es: 'Acceder al Panel',
    pt: 'Entrar no Painel'
  },
  securityNotice: {
    en: 'Security Notice',
    es: 'Aviso de Seguridad',
    pt: 'Aviso de Segurança'
  },
  adminSecurityMessage: {
    en: 'This is a restricted area. All access is monitored and logged.',
    es: 'Esta es un área restringida. Todos los accesos son monitoreados y registrados.',
    pt: 'Esta é uma área restrita. Todos os acessos são monitorados e registrados.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};