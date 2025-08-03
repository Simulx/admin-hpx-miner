import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading, requiresTwoFactor } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2d2d2d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#7f8c8d]">Carregando...</p>
        </div>
      </div>
    );
  }

  // If not authenticated or still needs 2FA, redirect to login
  if (!user || requiresTwoFactor) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}