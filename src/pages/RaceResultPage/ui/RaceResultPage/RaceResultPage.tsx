import { RaceItem } from '@/pages/ResultsPage/ui/RaceItem/RaceItem';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { formatTime } from '@/shared/lib/components/formatTime/formatTime';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, useCallback } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    getRaceResultData,
    getRaceResultHorses,
    getRaceResultIsLoading,
    getRaceResultUserChoice,
    getRaceResultWinnerHorse,
} from '../../model/selectors/raceResult';
import fetchRaceResult from '../../model/services/fetchRaceResult/fetchRaceResult';
import { raceResultReducer } from '../../model/slice/raceResultSlice';
import { RaceTable } from '../RaceTable/RaceTable';
import styles from './RaceResultPage.module.scss';

interface RaceResultPageProps {
    className?: string;
}

const initialReducers: ReducerList = {
    raceResult: raceResultReducer,
};
const RaceResultPage: FC<RaceResultPageProps> = (props) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const eventId = searchParams.get('eventId');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const raceData = useAppSelector(getRaceResultData);
    const userChoice = useAppSelector(getRaceResultUserChoice);
    const horses = useAppSelector(getRaceResultHorses);
    const winnerHorse = useAppSelector(getRaceResultWinnerHorse);
    const isLoading = useAppSelector(getRaceResultIsLoading);

    let statusColor = '';
    let statusTextTheme = TextTheme.BLACK;
    if (userChoice?.isWinner !== null && winnerHorse) {
        statusColor = userChoice?.isWinner ? styles.winner : styles.loser;
        statusTextTheme = userChoice?.isWinner ? TextTheme.CONTRAST : TextTheme.RED;
    }

    const onInitReducer = useCallback(() => {
        // Запрос данных выполнится только после инициализации редьюсера
        if (id) {
            dispatch(fetchRaceResult({ raceId: id, eventId: eventId ?? '' }));
        }
    }, [dispatch, id, eventId]);

    return (
        <DynamicModuleLoader reducers={initialReducers} onInit={onInitReducer} removeAfterUnmount>
            <div className={cn(styles.RaceResultPage, className)}>
                <header>
                    <RaceItem
                        className={styles.raceItem}
                        raceDescription={{
                            raceTitle: raceData?.title ?? 'Title',
                            raceDescription: raceData?.description ?? 'Description',
                            raceStartTime: raceData?.startTime ?? 'Start Time',
                        }}
                        userChoice={{
                            raceId: userChoice?.raceId ?? 0,
                            horseName: userChoice?.horseName ?? '',
                            horseColor: userChoice?.horseColor ?? '',
                            isWinner: userChoice?.isWinner ?? null,
                            eventId: Number(eventId ?? ''),
                        }}
                        winnerHorse={winnerHorse}
                        isShowButton={false}
                    />
                </header>
                <main className={styles.main}>
                    <div className={styles.title}>
                        <Text text="Leadboard" size={TextSize.BIG} />
                        <Text text={`Updated: ${formatTime(raceData?.endTime ?? '', true)}`} size={TextSize.MINI} />
                    </div>
                    <div className={cn(styles.your_horse_position_container, statusColor)}>
                        <Text text="your horse position:" />
                        <div className={styles.your_horse_position}>
                            <Text
                                theme={statusTextTheme}
                                text={userChoice?.position ? `${userChoice.position}st` : '-/-'}
                            />
                        </div>
                    </div>
                    <RaceTable horses={horses ?? []} userChoice={userChoice ?? undefined} isLoading={isLoading} />
                    <Button onClick={() => navigate(-1)}>
                        <Text text="go to back" size={TextSize.BIG_CAPS} />
                    </Button>
                </main>
            </div>
        </DynamicModuleLoader>
    );
};

export default RaceResultPage;
