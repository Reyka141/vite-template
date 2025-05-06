import { userActions } from '@/entities/User';
import { getIsLoginModalOpen } from '@/entities/User/model/selectors/getIsLoginModalOpen/getIsLoginModalOpen';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/types';
import { Loader } from '@/shared/ui/Loader/Loader';
import { Modal } from '@/shared/ui/Modal/Modal';
import { FC, Suspense, useCallback } from 'react';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
}
export const LoginModal: FC<LoginModalProps> = (props) => {
    const { className } = props;
    const isModalOpen = useAppSelector(getIsLoginModalOpen);
    const dispatch = useAppDispatch();

    const onClose = useCallback(() => {
        dispatch(userActions.setIsLoginModalOpen(false));
    }, [dispatch]);

    const onOpen = useCallback(() => {
        dispatch(userActions.setIsLoginModalOpen(true));
    }, [dispatch]);

    return (
        <div className={className}>
            <Button theme={ButtonTheme.TERTIARY} onClick={onOpen}>
                Log in
            </Button>
            <Modal isOpen={isModalOpen} onClose={onClose} lazy>
                <Suspense fallback={<Loader />}>
                    <LoginFormAsync />
                </Suspense>
            </Modal>
        </div>
    );
};
