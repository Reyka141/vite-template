import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC } from 'react';
import styles from './Step.module.scss';

export interface StepItem {
    numberOfStep: number;
    description: string;
}

interface StepProps {
    step: StepItem;
    className?: string;
}

export const Step: FC<StepProps> = (props) => {
    const { step, className } = props;

    return (
        <div className={cn(styles.Step, className)}>
            <Text className={styles.step_number} text={step.numberOfStep.toString()} size={TextSize.BODY} />
            <Text text={step.description} size={TextSize.BODY} />
        </div>
    );
};
