import { useAuthState } from '@/features/auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function OnboardingRequired({ children }: { children: React.ReactNode }) {
    const { user } = useAuthState();

    if (user?.onboardingCompleted) {
        return <>{children}</>;
    }


    return <Navigate to="/onboarding" replace />
}

