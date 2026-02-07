import { useAppSelector } from '@/store/hooks';
import { Navigate } from 'react-router-dom';
import FullScreenLoader from './common/FullScreenLoader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, checkedAuth } = useAppSelector((state) => state.auth);

    if (!checkedAuth) {
        return <FullScreenLoader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
