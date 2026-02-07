import { useAuthState } from '@/features/auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function EmailVerificationRequired({ children }: { children: React.ReactNode }) {
    const { user } = useAuthState();

    if (user?.emailVerified) {
        return <>{children}</>;
    }


    return <Navigate to="/verify-email" replace />
}

