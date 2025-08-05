import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './globals.css';
import { AdminAuthProvider } from './hooks/useAdminAuth.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);