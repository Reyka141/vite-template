import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import cn from 'classnames';
import { FC } from 'react';
import { Horse, UserChoice } from '../../model/types/raceResultSchema';
import { BetCell } from '../BetCell/BetCell';
import { HorseNameCell } from '../HorseNameCell/HorseNameCell';
import { HorsePositionCell } from '../HorsePositionCell/HorsePositionCell';
import styles from './RaceTable.module.scss';
interface RaceTableProps {
    className?: string;
    horses: Horse[];
    userChoice?: UserChoice;
    isLoading?: boolean;
}
export const RaceTable: FC<RaceTableProps> = (props) => {
    const { className, horses, userChoice, isLoading = false } = props;
    console.log(isLoading);
    if (isLoading) {
        return (
            <div className={styles.loader}>
                <Loader size={LoaderSize.LARGE} />
            </div>
        );
    }
    return (
        <div className={cn(styles.RaceTable, className)}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_tr}>
                        <th className={cn(styles.table_header_item, styles.center)}>#</th>
                        <th className={styles.table_header_item}>Horse:</th>
                        <th className={cn(styles.table_header_item, styles.center)}>Age:</th>
                        <th className={cn(styles.table_header_item, styles.center)}>Weight</th>
                        <th className={cn(styles.table_header_item, styles.center)}>Bet:</th>
                    </tr>
                </thead>
                <tbody>
                    {horses.map((horse) => (
                        <tr key={horse.id} className={styles.table_tr}>
                            <td className={cn(styles.table_item, styles.center)}>
                                <HorsePositionCell position={horse.position ?? undefined} />
                            </td>
                            <td className={styles.table_item}>
                                <HorseNameCell horseName={horse.name} horseColor={horse.color} />
                            </td>
                            <td className={cn(styles.table_item, styles.center)}>{horse.age}</td>
                            <td className={cn(styles.table_item, styles.center)}>{horse.weight}</td>
                            <td className={cn(styles.table_item, styles.center)}>
                                <BetCell isUserBet={horse.id === userChoice?.horseId} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
