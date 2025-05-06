import CloseIcon from '@/shared/assets/icons/close-circle.svg?react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, Suspense, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistoryData, getHistoryIsLoading } from '../../model/selectors/historySelectors';
import fetchUserHistory from '../../model/services/fetchUserHistory';
import { historyReducer } from '../../model/slice/historySlice';
import { HistoryListAsync } from '../HistoryList/HistoryList.async';
import styles from './HistoryPage.module.scss';
interface HistoryPageProps {
    className?: string;
}

const initialReducers: ReducerList = {
    history: historyReducer,
};

const HistoryPage: FC<HistoryPageProps> = (props) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const historyData = useAppSelector(getHistoryData);
    const isLoading = useAppSelector(getHistoryIsLoading);
    const onInitReducer = useCallback(() => {
        // Запрос данных выполнится только после инициализации редьюсера
        if (__IS_STORYBOOK__) return;

        dispatch(fetchUserHistory());
    }, [dispatch]);

    const onMoreDetailsClick = useCallback(
        (eventId: number) => {
            navigate(`/results?eventId=${eventId}`);
        },
        [navigate],
    );
    return (
        <div className={cn(styles.HistoryPage, className)}>
            <header className={styles.header}>
                <Text text="History" size={TextSize.BIG_CAPS} />
                <Breadcrumbs
                    items={[
                        `Win: ${historyData?.totalWins ?? 0}`,
                        `Successful: ${historyData?.totalSuccessful ?? 0}`,
                        `Fail: ${historyData?.totalFail ?? 0}`,
                    ]}
                />
                <CloseIcon width={40} height={40} className={styles.close_icon} onClick={() => navigate(-1)} />
            </header>
            <main className={styles.main}>
                {historyData?.history.length === 0 && (
                    <Text className={styles.empty} text="History is empty" size={TextSize.BODY} />
                )}
                {isLoading && <Loader size={LoaderSize.LARGE} className={styles.loader} />}
                <DynamicModuleLoader reducers={initialReducers} onInit={onInitReducer} removeAfterUnmount>
                    <Suspense fallback={<Loader className={styles.loader} />}>
                        {historyData?.history.map((event) => (
                            <HistoryListAsync
                                key={event.eventId}
                                event={event}
                                onMoreDetailsClick={onMoreDetailsClick}
                            />
                        ))}
                    </Suspense>
                </DynamicModuleLoader>
            </main>
        </div>
    );
};

export default HistoryPage;
