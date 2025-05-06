import { HorseColor, HorseIcon, HorseSize } from '@/shared/ui/HorseIcon/HorseIcon';
import { Text } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC } from 'react';
import styles from './HorseNameCell.module.scss';
interface HorseNameCellProps {
    className?: string;
    horseName: string;
    horseColor: string;
}
export const HorseNameCell: FC<HorseNameCellProps> = (props) => {
    const { className, horseName, horseColor } = props;
    return (
        <div className={cn(styles.HorseNameCell, className)}>
            <HorseIcon color={horseColor as HorseColor} size={HorseSize.SMALL} />
            <Text text={horseName} />
        </div>
    );
};
