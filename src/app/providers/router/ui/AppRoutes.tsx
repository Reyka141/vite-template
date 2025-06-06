import { RequireAuth } from '@/app/providers/router/ui/RequireAuth';
import { AppRoutesProps, routerConfig } from '@/shared/config/routerConfig/routerConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">{route.element}</div>
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return <Routes>{Object.values(routerConfig).map(renderWithWrapper)}</Routes>;
};

export default memo(AppRouter);
