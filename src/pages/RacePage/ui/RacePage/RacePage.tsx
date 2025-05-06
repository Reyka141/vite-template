import { HorseList } from '@/features/HorseList';
import HorseGreen from '@/shared/assets/icons/horse_green.svg?react';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { AuthStateWidget } from '@/widgets/AuthStateWidget';
import { PrizePools } from '@/widgets/PrizePools';
import { VotingTimer, VotingTimerPosition } from '@/widgets/VotingTimer';
import { TimerTheme } from '@/widgets/VotingTimer/ui/Timer/Timer';
import cn from 'classnames';
import { FC } from 'react';
import { Navbar } from '../Navbar/Navbar';
import styles from './RacePage.module.scss';

interface RacePageProps {
    className?: string;
}

const RacePage: FC<RacePageProps> = (props) => {
    const { className } = props;

    return (
        <div className={cn(styles.RacePage, className)}>
            <header className={styles.header}>
                <Text text="Fantasy Horse Racing" size={TextSize.BIG} />
                <VotingTimer theme={TimerTheme.SECONDARY} position={VotingTimerPosition.CENTER} />
                <Navbar />
                <div className={styles.header_image_left}>
                    <HorseGreen />
                </div>
                <div className={styles.header_image_right}>
                    <HorseGreen />
                </div>
                <AuthStateWidget />
            </header>
            <main className={styles.main}>
                <HorseList />
                <PrizePools />
            </main>
        </div>
    );
};

export default RacePage;
