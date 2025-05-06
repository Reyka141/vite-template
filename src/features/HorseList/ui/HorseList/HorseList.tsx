import {
    eventActions,
    getActiveRace,
    getEventData,
    getIsLoading,
    getUserChoiceById,
    getUserChoices,
    UserChoices,
} from '@/entities/Event';
import { getUserAuthData, userActions } from '@/entities/User';
import { formatTime } from '@/shared/lib/components/formatTime/formatTime';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { Button } from '@/shared/ui/Button/Button';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import saveUserChoice from '../../model/services/saveUserChoice';
import { HorseItem } from '../HorseItem/HorseItem';
import styles from './HorseList.module.scss';
interface HorseListProps {
    className?: string;
}

const isRaceNotSelected = (userChoices: UserChoices[], raceId: number) => {
    const race = userChoices.find((choice) => choice.raceId === raceId);
    return !race?.horseId;
};
export const HorseList: FC<HorseListProps> = (props) => {
    const { className } = props;
    const [isAllRacesSelected, setIsAllRacesSelected] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getIsLoading);
    const activeRace = useAppSelector(getActiveRace);
    const userChoices = useAppSelector(getUserChoices);
    const { id: eventId } = useAppSelector(getEventData);
    const authData = useAppSelector(getUserAuthData);
    const userChoiceById = useAppSelector((state) => getUserChoiceById(state, activeRace?.id ?? 1));
    const breadcrumbsItems = [activeRace?.description ?? '', formatTime(activeRace?.startTime ?? '')];
    const onSelect = useCallback(
        (id: number) => {
            if (__IS_STORYBOOK__) {
                return;
            }
            const activeRaceId = activeRace?.id ?? 1;
            dispatch(eventActions.setUserChoice({ raceId: activeRaceId, horseId: id, reOpen: false }));
            if (activeRaceId < 3 && isRaceNotSelected(userChoices ?? [], activeRaceId)) {
                setTimeout(() => {
                    dispatch(eventActions.setActiveNavItemById(activeRaceId + 1));
                }, 200); // Задержка в 200 миллисекунд
            }
        },

        [dispatch, activeRace?.id, userChoices],
    );

    useEffect(() => {
        if (__IS_STORYBOOK__) {
            return;
        }
        if (userChoices?.length === 3 && userChoices) {
            const isAllRacesSelected = userChoices?.every(
                (choice) => choice.horseId !== null && choice.reOpen === false,
            );
            setIsAllRacesSelected(isAllRacesSelected);
        }
    }, [userChoices]);

    const onContinue = useCallback(async () => {
        if (__IS_STORYBOOK__) {
            return;
        }
        if (authData) {
            const response = await dispatch(
                saveUserChoice({ userId: Number(authData.id), eventId, choices: userChoices ?? [] }),
            ).unwrap();
            if (response.success) {
                navigate('/results');
            }
        } else {
            dispatch(userActions.setIsLoginModalOpen(true));
        }
    }, [authData, dispatch, eventId, userChoices, navigate]);

    if (isLoading) {
        return (
            <div className={styles.loader}>
                <Loader size={LoaderSize.LARGE} />
            </div>
        );
    }

    return (
        <div className={cn(styles.HorseList, className)}>
            <div className={styles.header}>
                <Text text={activeRace?.title} size={TextSize.BIG} />
                <Breadcrumbs items={breadcrumbsItems} />
            </div>
            <div className={styles.horses}>
                {activeRace?.horseData.map((horse) => (
                    <HorseItem
                        key={horse.id}
                        horse={horse}
                        onSelect={onSelect}
                        selected={horse.id === userChoiceById?.horseId}
                    />
                ))}
            </div>
            <div className={cn(styles.button_container, { [styles.active]: isAllRacesSelected })}>
                <Button onClick={onContinue}>
                    <Text text="Continue" size={TextSize.BIG_CAPS} />
                </Button>
            </div>
        </div>
    );
};
