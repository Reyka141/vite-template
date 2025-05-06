import { formatTime } from '@/shared/lib/components/formatTime/formatTime';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC } from 'react';
import styles from './RaceResultPin.module.scss';

export enum RaceResultPinStatus {
    WINNER = 'Successful',
    LOSER = 'Fail',
    DEFAULT = 'default',
}

export enum RaceResultPosition {
    TOP_RIGHT = 'top_right',
    CENTER_RIGHT = 'center_right',
}

interface RaceResultPinProps {
    className?: string;
    time?: string;
    status: RaceResultPinStatus;
    position?: RaceResultPosition;
}
export const RaceResultPin: FC<RaceResultPinProps> = (props) => {
    const { className, time, status, position = RaceResultPosition.TOP_RIGHT } = props;
    let text = '';
    let style = styles.default;
    switch (status) {
        case RaceResultPinStatus.WINNER:
            text = 'Successful';
            style = styles.winner;
            break;
        case RaceResultPinStatus.LOSER:
            text = 'Fail';
            style = styles.loser;
            break;
        default:
            text = formatTime(time ?? '-/-');
    }

    return (
        <div className={cn(styles.RaceResultPin, className, style, styles[position])}>
            <Text text={text} theme={status === RaceResultPinStatus.WINNER ? TextTheme.CONTRAST : TextTheme.PRIMARY} />
        </div>
    );
};
