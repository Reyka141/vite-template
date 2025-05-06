import cn from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import { Loader, LoaderSize } from '../Loader/Loader';
import styles from './Button.module.scss';
import { ButtonTheme } from './types';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    disabled?: boolean;
    isLoading?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const { className, children, theme = ButtonTheme.PRIMARY, disabled, isLoading, ...otherProps } = props;

    const mods: Record<string, boolean> = {
        [styles.button]: true,
        [styles[theme]]: true,
        [styles.disabled]: disabled ?? false,
    };

    return (
        <button className={cn(styles.button, mods, className)} disabled={disabled} {...otherProps}>
            {isLoading ? <Loader size={LoaderSize.TINY} /> : children}
        </button>
    );
};
