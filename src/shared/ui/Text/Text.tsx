import cn from 'classnames';
import { FC } from 'react';
import styles from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    CAPS = 'caps',
    ERROR = 'error',
    CONTRAST = 'contrast',
    RED = 'red',
    BLACK = 'black',
}

export enum TextSize {
    LARGE = 'large',
    LARGE_CAPS = 'large-caps',
    MINI_LARGE = 'mini-large',
    BIG_CAPS = 'big-caps',
    BIG = 'big',
    BODY = 'body',
    MINI = 'mini',
}

interface TextProps {
    className?: string;
    text?: string;
    theme?: TextTheme;
    size?: TextSize;
}
export const Text: FC<TextProps> = (props) => {
    const { className, text, theme = TextTheme.PRIMARY, size = TextSize.BODY } = props;
    return (
        <div className={cn(className, styles[theme])}>
            {text && <p className={cn(styles.text, styles[size])}>{text}</p>}
        </div>
    );
};
