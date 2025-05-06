import { getUserAuthData, userActions } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { RoutePath } from '@/shared/config/routerConfig/routerConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/types';
import cn from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthStateWidget.module.scss';

interface AuthStateWidgetProps {
    className?: string;
}
export const AuthStateWidget: FC<AuthStateWidgetProps> = (props) => {
    const { className } = props;
    const authData = useAppSelector(getUserAuthData);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onLogout = () => {
        if (__IS_STORYBOOK__) return;
        dispatch(userActions.logout());
    };

    const onHistoryClick = () => {
        if (__IS_STORYBOOK__) return;
        navigate(RoutePath.history);
    };

    return (
        <div className={cn(styles.AuthStateWidget, className)}>
            {authData ? (
                <div className={styles.buttons}>
                    <Button theme={ButtonTheme.TERTIARY} onClick={onHistoryClick}>
                        History
                    </Button>
                    <Button theme={ButtonTheme.TERTIARY} onClick={onLogout}>
                        Logout
                    </Button>
                </div>
            ) : (
                <LoginModal />
            )}
        </div>
    );
};
