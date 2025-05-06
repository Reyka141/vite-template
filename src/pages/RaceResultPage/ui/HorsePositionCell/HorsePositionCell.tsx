import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC } from 'react';
import styles from './HorsePositionCell.module.scss';

interface HorsePositionCellProps {
    className?: string;
    position?: number;
}
export const HorsePositionCell: FC<HorsePositionCellProps> = (props) => {
    const { className, position = '-' } = props;
    let stepColor = '';
    switch (position) {
        case 1:
            stepColor = styles.first;
            break;
        case 2:
            stepColor = styles.second;
            break;
        case 3:
            stepColor = styles.third;
            break;
        default:
            break;
    }
    return (
        <div className={cn(styles.HorsePosition, className)}>
            <Text className={cn(styles.step_number, stepColor)} text={position.toString()} size={TextSize.BODY} />
        </div>
    );
};
