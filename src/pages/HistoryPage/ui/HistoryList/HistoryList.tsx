import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/types';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, memo } from 'react';
import { Event } from '../../model/types/historySchema';
import { HistoryListItem } from '../HistoryListItem/HistoryListItem';
import styles from './HistoryList.module.scss';
import { formatDate } from '@/shared/lib/components/formatDate/formatDate';
interface HistoryListProps {
    className?: string;
    event: Event;
    onMoreDetailsClick: (eventId: number) => void;
}
const HistoryList: FC<HistoryListProps> = (props) => {
    const { className, event, onMoreDetailsClick } = props;

    return (
        <div className={cn(styles.HistoryList, className)}>
            <div className={styles.header}>
                <Text text={formatDate(event.endTime)} size={TextSize.BIG} />
                <Text text={`${event.winRaces}/${event.totalRaces}`} size={TextSize.BIG} theme={TextTheme.CONTRAST} />
            </div>
            <div className={styles.list}>
                {event.races.map((race) => (
                    <HistoryListItem key={race.raceId} raceData={race} />
                ))}
            </div>
            <Button theme={ButtonTheme.SECONDARY_CLEAR} onClick={() => onMoreDetailsClick(event.eventId)}>
                <Text text="more details" size={TextSize.BODY} />
            </Button>
        </div>
    );
};

export default memo(HistoryList);
