import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AuthStateWidget } from '@/widgets/AuthStateWidget';
import { PrizePools } from '@/widgets/PrizePools';
import cn from 'classnames';
import { FC, Suspense, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import fetchActiveUserChoices from '../../model/services/fetchActiveUserChoices/fetchActiveUserChoices';
import { resultReducer } from '../../model/slice/resultSlice';
import { RaceListAsync } from '../RaceList/RaceList.async';
import styles from './ResultsPage.module.scss';
interface ResultsPageProps {
    className?: string;
}

const initialReducers: ReducerList = {
    result: resultReducer,
};
const ResultsPage: FC<ResultsPageProps> = (props) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const eventId = searchParams.get('eventId');
    const onInitReducer = useCallback(() => {
        // Запрос данных выполнится только после инициализации редьюсера
        dispatch(fetchActiveUserChoices({ eventId: eventId ? Number(eventId) : undefined }));
    }, [dispatch, eventId]);

    return (
        <div className={cn(styles.ResultsPage, className)}>
            <header className={styles.header}>
                <Text text="Good Luck!" size={TextSize.LARGE_CAPS} />
                <Text text="you can edit selections until the first race starts" size={TextSize.BODY} />
                <AuthStateWidget />
            </header>
            <main className={styles.main}>
                <div className={styles.main__content}>
                    <DynamicModuleLoader reducers={initialReducers} onInit={onInitReducer} removeAfterUnmount>
                        <Suspense fallback={<Loader size={LoaderSize.LARGE} />}>
                            <RaceListAsync />
                        </Suspense>
                    </DynamicModuleLoader>
                </div>
            </main>
            <footer className={styles.footer}>
                <PrizePools />
            </footer>
        </div>
    );
};

export default ResultsPage;
