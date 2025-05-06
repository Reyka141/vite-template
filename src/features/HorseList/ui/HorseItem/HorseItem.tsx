import { HorseData } from '@/entities/Event';

import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { HorseColor, HorseIcon } from '@/shared/ui/HorseIcon/HorseIcon';
import { RadioButton } from '@/shared/ui/RadioButton/RadioButton';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, useCallback } from 'react';
import styles from './HorseItem.module.scss';
interface HorseItemProps {
    className?: string;
    horse: HorseData;
    onSelect: (id: number) => void;
    selected: boolean;
}

export const HorseItem: FC<HorseItemProps> = (props) => {
    const { className, horse, onSelect, selected } = props;

    const handleSelect = useCallback(() => {
        onSelect(horse.id);
    }, [onSelect, horse.id]);

    return (
        <button
            type="button"
            onClick={handleSelect}
            className={cn(styles.HorseItem, className, { [styles.selected]: selected })}
        >
            <div className={styles.horse}>
                <HorseIcon color={horse.color as HorseColor} />
                <div>
                    <Text text={`${horse.id}. ${horse.name}`} size={TextSize.BODY} />
                    <Breadcrumbs items={[`Age: ${horse.age}`, `Weight: ${horse.weight}`]} />
                </div>
            </div>
            <div className={styles.stats}>
                <Text className={styles.stats} text={horse.stats} size={TextSize.BIG_CAPS} theme={TextTheme.CONTRAST} />
                <div>
                    <RadioButton checked={selected} />
                </div>
            </div>
        </button>
    );
};
