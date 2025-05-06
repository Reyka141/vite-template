import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { RaceResultPin, RaceResultPinStatus, RaceResultPosition } from '@/shared/ui/RaceResultPin/RaceResultPin';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC } from 'react';
import { Race } from '../../model/types/historySchema';
import styles from './HistoryListItem.module.scss';
interface HistoryListItemProps {
    className?: string;
    raceData: Race;
}
export const HistoryListItem: FC<HistoryListItemProps> = (props) => {
    const { className, raceData } = props;
    const { title, description, result, timestamp } = raceData;
    let status = '';
    let statusStyle = '';
    if (result) {
        status = result.isWinner ? RaceResultPinStatus.WINNER : RaceResultPinStatus.LOSER;
        statusStyle = result.isWinner ? styles.winner : styles.loser;
    }
    return (
        <div className={cn(styles.HistoryListItem, className, statusStyle)}>
            <Text size={TextSize.BIG} text={title} />
            <Breadcrumbs items={[description]} />
            <RaceResultPin
                time={timestamp}
                status={status as RaceResultPinStatus}
                position={RaceResultPosition.CENTER_RIGHT}
            />
        </div>
    );
};
