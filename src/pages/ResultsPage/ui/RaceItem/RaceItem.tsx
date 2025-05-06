import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/types';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, useCallback } from 'react';

import { eventActions } from '@/entities/Event';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HorseColor, HorseIcon, HorseSize } from '@/shared/ui/HorseIcon/HorseIcon';
import { RaceResultPin, RaceResultPinStatus } from '@/shared/ui/RaceResultPin/RaceResultPin';
import { useNavigate } from 'react-router-dom';
import styles from './RaceItem.module.scss';
import { RoutePath } from '@/shared/config/routerConfig/routerConfig';

interface RaceDescription {
    raceTitle: string;
    raceDescription: string;
    raceStartTime: string;
}

interface UserChoice {
    raceId: number;
    eventId: number;
    horseName: string;
    horseColor: string;
    isWinner: boolean | null;
}

interface WinnerHorse {
    id: number;
    name: string;
    color: string;
}

export interface RaceItemProps {
    className?: string;
    isEditable?: boolean;
    raceDescription: RaceDescription;
    userChoice: UserChoice;
    winnerHorse: WinnerHorse | null | undefined;
    isShowButton?: boolean;
}

export const RaceItem: FC<RaceItemProps> = (props) => {
    const { className, userChoice, winnerHorse, raceDescription, isEditable = false, isShowButton = true } = props;
    const { raceId, horseName, horseColor, isWinner, eventId } = userChoice;
    const { raceTitle, raceDescription: description, raceStartTime } = raceDescription;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let statusColor = styles.notStarted;
    let buttonColor = ButtonTheme.SECONDARY_CLEAR;
    let status = RaceResultPinStatus.DEFAULT;
    if (isWinner !== null) {
        statusColor = isWinner ? styles.winner : styles.loser;
        buttonColor = isWinner ? ButtonTheme.SECONDARY_GREEN : ButtonTheme.SECONDARY_RED;
        status = isWinner ? RaceResultPinStatus.WINNER : RaceResultPinStatus.LOSER;
    }
    const onClick = useCallback(() => {
        if (isEditable) {
            dispatch(eventActions.setActiveNavItemById(raceId));
            navigate(RoutePath.race);
        } else {
            navigate(`${RoutePath.race_result}${raceId}?eventId=${eventId}`);
        }
    }, [isEditable, navigate, dispatch, raceId, eventId]);
    return (
        <div className={cn(styles.RaceItem, className, statusColor)}>
            <div className={styles.header}>
                <Text text={raceTitle} size={TextSize.BIG} />
                <Breadcrumbs items={[description]} />
            </div>

            <div className={styles.content}>
                <div className={styles.content_item}>
                    <Text text="Your choice" size={TextSize.MINI} />
                    <div className={styles.content_item_container}>
                        <HorseIcon color={horseColor as HorseColor} size={HorseSize.SMALL} />
                        <Text text={horseName || '-/-'} />
                    </div>
                </div>
                <div className={styles.content_item}>
                    <Text text="Winner" size={TextSize.MINI} />
                    <div className={styles.content_item_container}>
                        {winnerHorse && <HorseIcon color={winnerHorse.color as HorseColor} size={HorseSize.SMALL} />}

                        <Text text={winnerHorse?.name ?? '-/-'} />
                    </div>
                </div>
                <div className={styles.separator_container}>
                    <span className={styles.separator} />
                    <span className={styles.separator} />
                </div>
            </div>

            {isShowButton && (
                <Button theme={buttonColor} onClick={onClick}>
                    <Text text={isEditable ? 'edit selections' : 'more details'} />
                </Button>
            )}

            <RaceResultPin time={raceStartTime} status={status} />
        </div>
    );
};
