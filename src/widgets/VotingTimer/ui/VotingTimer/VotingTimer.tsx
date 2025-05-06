import { eventActions, fetchLastEvent, getEventStatus, getIsLoading, getTimeLeftEvent } from '@/entities/Event';
import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Timer, TimerTheme } from '../Timer/Timer';
import styles from './VotingTimer.module.scss';

interface VotingTimerProps {
    className?: string;
    theme?: TimerTheme;
    position?: VotingTimerPosition;
}

export enum VotingTimerPosition {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
}

enum VotingTimerLabel {
    BEFORE_START = 'before start',
    VOTING_ENDS_IN = 'closing voting',
    VOTING_END = 'voting end',
}

export const VotingTimer: FC<VotingTimerProps> = (props) => {
    const { className, theme = TimerTheme.PRIMARY, position = VotingTimerPosition.LEFT } = props;
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(getIsLoading);
    const eventStatus = useAppSelector(getEventStatus);
    const timeLeft = useAppSelector(getTimeLeftEvent);

    const [label, setLabel] = useState(VotingTimerLabel.BEFORE_START);

    useEffect(() => {
        if (__IS_STORYBOOK__) return;
        dispatch(fetchLastEvent());
    }, [dispatch]);

    useEffect(() => {
        switch (eventStatus) {
            case GameStatus.FINISHED:
                setLabel(VotingTimerLabel.VOTING_END);
                break;
            case GameStatus.IN_PROGRESS:
                setLabel(VotingTimerLabel.VOTING_ENDS_IN);
                break;
            default:
                setLabel(VotingTimerLabel.BEFORE_START);
        }
    }, [eventStatus]);

    useEffect(() => {
        if (__IS_STORYBOOK__) return;
        const interval = setInterval(() => {
            dispatch(eventActions.updateEventTimeLeft());
            if (timeLeft === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, dispatch]);

    return (
        <div className={cn(styles.VotingTimer, className, styles[position])}>
            <Timer label={label} className={styles[position]} theme={theme} isLoading={isLoading} time={timeLeft} />
        </div>
    );
};
