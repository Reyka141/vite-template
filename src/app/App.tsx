import { AppRoutes } from '@/app/providers/router';
import { fetchUser, PrizeStatus, userActions } from '@/entities/User';
import { getUserAuthData } from '@/entities/User/model/selectors/getUserAuthData/getUserAuthData';
import { RoutePath } from '@/shared/config/routerConfig/routerConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
    const dispatch = useAppDispatch();
    const authData = useAppSelector(getUserAuthData);
    const navigate = useNavigate();
    const [isFetch, setIsFetch] = useState(false);
    useEffect(() => {
        // Инициализируем данные пользователя при загрузке приложения
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    useEffect(() => {
        if (__IS_STORYBOOK__) return;
        if (authData && !isFetch) {
            dispatch(fetchUser());
            setIsFetch(true);
        }
    }, [dispatch, authData, isFetch]);

    useEffect(() => {
        if (__IS_STORYBOOK__) return;
        if (authData) {
            authData.prizes.forEach((prize) => {
                if (prize.status === PrizeStatus.NEW) {
                    navigate(`${RoutePath.prize}${prize.id}`);
                }
            });
        }
    }, [authData, navigate]);
    return (
        <div>
            <AppRoutes />
        </div>
    );
}

export default App;
