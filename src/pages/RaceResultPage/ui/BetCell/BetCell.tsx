import { RadioButton } from '@/shared/ui/RadioButton/RadioButton';
import cn from 'classnames';
import { FC } from 'react';
import styles from './BetCell.module.scss';

interface BetCellProps {
    className?: string;
    isUserBet?: boolean;
}
export const BetCell: FC<BetCellProps> = (props) => {
    const { className, isUserBet = false } = props;
    return <div className={cn(styles.BetCell, className)}>{isUserBet && <RadioButton checked={true} />}</div>;
};
