import { Text, TextSize, TextTheme } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { ChangeEvent, FC, InputHTMLAttributes, useCallback, useEffect, useRef } from 'react';
import styles from './LoginItem.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface LoginItemProps extends HTMLInputProps {
    className?: string;
    label: string;
    id: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    autoFocus?: boolean;
}
export const LoginItem: FC<LoginItemProps> = (props) => {
    const { className, label, id, type, value, error, autoFocus, onChange, ...otherProps } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const onChangeHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange],
    );

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus, inputRef]);

    return (
        <div className={cn(styles.LoginItem, className)}>
            <Text text={label} />
            <input
                ref={inputRef}
                placeholder={`Enter ${label.toLowerCase()}`}
                id={id}
                type={type}
                maxLength={50}
                className={styles.input}
                value={value}
                onChange={onChangeHandler}
                {...otherProps}
            />
            {error && <Text theme={TextTheme.ERROR} text={error} size={TextSize.MINI} />}
        </div>
    );
};
