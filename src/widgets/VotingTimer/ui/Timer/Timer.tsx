import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC } from 'react';
import styles from './Timer.module.scss';

export enum TimerTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface TimerProps {
    time: number;
    label: string;
    theme?: TimerTheme;
    className?: string;
    isLoading?: boolean;
}

const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}h ${minutes}m ${secs}s`;
};

export const Timer: FC<TimerProps> = (props) => {
    const { time, label, theme = TimerTheme.PRIMARY, className, isLoading } = props;

    return (
        <div className={cn(styles.Timer, className, styles[theme])}>
            {isLoading ? (
                <div className={styles.loading}>
                    <Loader size={LoaderSize.SMALL} />
                </div>
            ) : (
                <>
                    <Text text={label} size={TextSize.MINI} />
                    <Text text={formatTime(time)} size={TextSize.BIG} />
                </>
            )}
        </div>
    );
};
