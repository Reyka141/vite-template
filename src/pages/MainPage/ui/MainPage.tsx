import { getEventStatus, getEventTimes, getIsLoading } from '@/entities/Event';
import { GameTutorial } from '@/features/GameTutorial';
import HorseImage from '@/shared/assets/images/main_horse.png';
import { AppRoutes } from '@/shared/config/routerConfig/routerConfig';
import { formatTime } from '@/shared/lib/components/formatTime/formatTime';
import { GameStatus } from '@/shared/lib/components/getGameStatus/getGameStatus';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/types';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import { AuthStateWidget } from '@/widgets/AuthStateWidget';
import { PrizePools } from '@/widgets/PrizePools';
import { VotingTimer } from '@/widgets/VotingTimer';
import { TimerTheme } from '@/widgets/VotingTimer/ui/Timer/Timer';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';
import cn from 'classnames';

const buttonMap = {
    [GameStatus.NOT_STARTED]: 'Starts at ',
    [GameStatus.IN_PROGRESS]: 'Play for free',
    [GameStatus.FINISHED]: 'Play for free',
};

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;
    const navigate = useNavigate();
    // const isActive = useAppSelector(getIsActive);
    const isLoading = useAppSelector(getIsLoading);
    const [buttonText, setButtonText] = useState('Play for free');
    const { startTime } = useAppSelector(getEventTimes);
    const eventStatus = useAppSelector(getEventStatus);
    const onPlay = () => {
        if (__IS_STORYBOOK__) {
            return;
        }
        navigate(AppRoutes.RACE);
    };

    useEffect(() => {
        if (eventStatus === GameStatus.NOT_STARTED) {
            setButtonText(buttonMap[eventStatus] + formatTime(startTime));
        } else {
            setButtonText(buttonMap[eventStatus]);
        }
    }, [eventStatus, startTime]);
    return (
        <div className={cn(styles.MainPage, className)}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <section>
                        <Text text="Win up to" theme={TextTheme.CAPS} size={TextSize.BIG_CAPS} />
                        <Text text="5000$" theme={TextTheme.CAPS} size={TextSize.LARGE} />
                    </section>
                    <section className={styles.header_text_medium}>
                        <Text text="Predict the winners of the 3 races" size={TextSize.BODY} />
                    </section>
                    <VotingTimer theme={TimerTheme.PRIMARY} />
                    <AuthStateWidget />
                    <div className={styles.header_image}>
                        <img src={HorseImage} alt="horse" height={279} />
                    </div>
                </div>

                <div className={styles.main}>
                    <section>
                        <GameTutorial />
                    </section>
                    <section>
                        <PrizePools />
                    </section>
                    {/* // disabled={!isActive} */}
                    <Button theme={ButtonTheme.PRIMARY} onClick={onPlay} isLoading={isLoading}>
                        {buttonText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
