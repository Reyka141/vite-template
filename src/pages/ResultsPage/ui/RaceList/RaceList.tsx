import { getEventStatus } from '@/entities/Event';
import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import cn from 'classnames';
import { FC, memo, useEffect, useState } from 'react';
import { getIsLoading } from '../../model/selectors/getIsLoading/getIsLoading';
import { getUserChoices } from '../../model/selectors/getUserChoices/getUserChoices';
import { RaceItem } from '../RaceItem/RaceItem';
import styles from './RaceList.module.scss';
interface RaceListProps {
    className?: string;
}

const RaceList: FC<RaceListProps> = (props) => {
    const { className } = props;
    const [isEditable, setIsEditable] = useState(false);
    const isLoading = useAppSelector(getIsLoading);
    const userChoices = useAppSelector(getUserChoices);
    const eventStatus = useAppSelector(getEventStatus);
    useEffect(() => {
        if (eventStatus === GameStatus.IN_PROGRESS) {
            setIsEditable(true);
        } else {
            setIsEditable(false);
        }
    }, [eventStatus]);

    if (isLoading) {
        return (
            <div className={styles.loader}>
                <Loader size={LoaderSize.LARGE} />
            </div>
        );
    }

    return (
        <div className={cn(styles.RaceList, className)}>
            {userChoices.map((race) => (
                <RaceItem
                    key={race.id}
                    raceDescription={{
                        raceTitle: race.raceTitle,
                        raceDescription: race.raceDescription,
                        raceStartTime: race.raceStartTime,
                    }}
                    userChoice={{
                        raceId: race.raceId,
                        horseName: race.horseName,
                        horseColor: race.horseColor,
                        isWinner: race.raceResult?.isUserWinner ?? null,
                        eventId: race.eventId,
                    }}
                    winnerHorse={
                        race.raceResult
                            ? {
                                  id: race.raceResult.winnerHorseId,
                                  name: race.raceResult.winnerHorseName,
                                  color: race.raceResult.winnerHorseColor,
                              }
                            : null
                    }
                    isEditable={isEditable}
                />
            ))}
        </div>
    );
};

export default memo(RaceList);
