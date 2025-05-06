import SelectIcon from '@/shared/assets/icons/checked.svg?react';
import cn from 'classnames';
import { FC } from 'react';
import styles from './RadioButton.module.scss';

interface RadioButtonProps {
    className?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

export const RadioButton: FC<RadioButtonProps> = (props) => {
    const { className, checked = false, onChange } = props;

    const handleClick = () => {
        onChange?.(checked);
    };

    return (
        <div className={cn(styles.RadioButton, { [styles.checked]: checked }, className)} onClick={handleClick}>
            {checked && <SelectIcon />}
        </div>
    );
};
