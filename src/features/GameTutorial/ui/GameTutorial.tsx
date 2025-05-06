import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { getEventTimes, getIsLoading } from '@/entities/Event';
import { formatTime } from '@/shared/lib/components/formatTime/formatTime';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { Step, StepItem } from '@/shared/ui/Step/Step';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './GameTutorial.module.scss';

interface GameTutorialProps {
    className?: string;
}

const stepsDefault: StepItem[] = [
    {
        numberOfStep: 1,
        description: 'Be online from 12:00 to 14:00',
    },
    {
        numberOfStep: 2,
        description: 'Select a winner for each of the 3 races',
    },
    {
        numberOfStep: 3,
        description: 'Come back to track your progress',
    },
];

export const GameTutorial: FC<GameTutorialProps> = (props) => {
    const { className } = props;
    const [steps, setSteps] = useState<StepItem[]>(stepsDefault);
    const isLoading = useAppSelector(getIsLoading);
    const { startTime, endTime } = useAppSelector(getEventTimes);

    useEffect(() => {
        if (startTime && endTime) {
            setSteps((prev) => [
                { ...prev[0], description: `Be online from ${formatTime(startTime)} to ${formatTime(endTime)}` },
                ...prev.slice(1),
            ]);
        }
    }, [startTime, endTime]);

    return (
        <div className={cn(styles.GameTutorial, className)}>
            <Text className={styles.steps_title} text="How to play" theme={TextTheme.CAPS} size={TextSize.BIG} />
            {isLoading ? (
                <div className={styles.steps_loader}>
                    <Loader size={LoaderSize.SMALL} />
                </div>
            ) : (
                steps.map((step) => <Step key={step.numberOfStep} step={step} className={styles.steps_step} />)
            )}
        </div>
    );
};
