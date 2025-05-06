import { getUserAuthData, getUserInitialized } from '@/entities/User';
import { RoutePath } from '@/shared/config/routerConfig/routerConfig';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { PageLoader } from '@/widgets/PageLoader';
import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }: Readonly<{ children: JSX.Element }>) {
    const auth = useAppSelector(getUserAuthData);
    const isInitialized = useAppSelector(getUserInitialized);
    const location = useLocation();

    if (!isInitialized) {
        return <PageLoader />;
    }

    if (!auth) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children;
}
