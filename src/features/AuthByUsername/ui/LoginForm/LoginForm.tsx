import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/types';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { memo, useCallback } from 'react';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import loginByUsername from '../../model/services/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { LoginItem } from '../LoginItem/LoginItem';
import styles from './LoginForm.module.scss';
export interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const username = useAppSelector(getLoginUsername);
    const password = useAppSelector(getLoginPassword);
    const isLoading = useAppSelector(getLoginLoading);
    const error = useAppSelector(getLoginError);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (isLoading) return;
            dispatch(loginByUsername({ username, password }));
        },
        [dispatch, username, password, isLoading],
    );

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <div className={cn(styles.LoginForm, className)}>
                <Text text="Authorization" className={styles.title} size={TextSize.BIG} />
                <form autoComplete="off" className={styles.form} onSubmit={onSubmit}>
                    <LoginItem
                        label="Username"
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        error={error}
                        onChange={onChangeUsername}
                        autoComplete="false"
                        autoFocus
                    />
                    <LoginItem
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        error={error}
                        onChange={onChangePassword}
                        autoComplete="false"
                    />
                    <Button theme={ButtonTheme.SECONDARY_GREEN} disabled={isLoading} type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </DynamicModuleLoader>
    );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
