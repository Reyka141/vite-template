import cn from 'classnames';
import { FC } from 'react';
import styles from './PrizePools.module.scss';

interface PrizePoolsProps {
    className?: string;
}

interface PrizePool {
    id: number;
    title: string;
    amount: string;
}

const prizePools: PrizePool[] = [
    {
        id: 1,
        title: '3 correct',
        amount: '5 000$',
    },
    {
        id: 2,
        title: '2 correct',
        amount: '2 500$',
    },
    {
        id: 3,
        title: '1 correct',
        amount: 'Bonus',
    },
];

export const PrizePools: FC<PrizePoolsProps> = (props) => {
    const { className } = props;

    return (
        <div className={cn(styles.PrizePools, className)}>
            <h2 className={styles.title}>Prize Pools</h2>
            <div className={styles.pools}>
                {prizePools.map(({ id, title, amount }) => (
                    <div key={id} className={styles.pool}>
                        <p className={styles.pool_title}>{title}</p>
                        <p className={styles.pool_amount}>{amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
