import { HistoryPage } from '@/pages/HistoryPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PrizePage } from '@/pages/PrizePage';
import { RacePage } from '@/pages/RacePage';
import { RaceResultPage } from '@/pages/RaceResultPage';
import { ResultsPage } from '@/pages/ResultsPage';
import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    NOT_FOUND = 'not_found',
    RACE = 'race',
    HISTORY = 'history',
    PRIZE = 'prize',
    RESULTS = 'results',
    RACE_RESULT = 'race_result',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.RACE]: '/race',
    [AppRoutes.HISTORY]: '/history',
    [AppRoutes.PRIZE]: '/prize/', // + :id
    [AppRoutes.RESULTS]: '/results',
    [AppRoutes.RACE_RESULT]: '/race-result/', // + :id

    // Последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },

    [AppRoutes.RACE]: {
        path: RoutePath.race,
        element: <RacePage />,
    },
    [AppRoutes.HISTORY]: {
        path: RoutePath.history,
        element: <HistoryPage />,
        authOnly: true,
    },
    [AppRoutes.PRIZE]: {
        path: `${RoutePath.prize}:id`,
        element: <PrizePage />,
        authOnly: true,
    },
    [AppRoutes.RESULTS]: {
        path: RoutePath.results,
        element: <ResultsPage />,
        authOnly: true,
    },
    [AppRoutes.RACE_RESULT]: {
        path: `${RoutePath.race_result}:id`,
        element: <RaceResultPage />,
        authOnly: true,
    },

    // Последний
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
