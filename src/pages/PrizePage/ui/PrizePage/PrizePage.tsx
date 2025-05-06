import { createEvent } from '@/entities/Event';
import { fetchUser, PrizeStatus } from '@/entities/User';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonTheme } from '@/shared/ui/Button/types';
import { Loader, LoaderSize } from '@/shared/ui/Loader/Loader';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPrizeIsLoading } from '../../model/selectors/prizeSelectors';
import fetchUserPrizes from '../../model/services/fetchUserPrizes/fetchUserPrizes';
import updatePrizeStatus from '../../model/services/updatePrizeStatus/updatePrizeStatus';
import { prizeReducer, prizeSelectors } from '../../model/slice/prizeSlice';
import { PrizeItem } from '../PrizeItem/PrizeItem';
import styles from './PrizePage.module.scss';
interface PrizePageProps {
    className?: string;
}

const initialReducers: ReducerList = {
    prize: prizeReducer,
};

const PrizePage: FC<PrizePageProps> = (props) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const prize = useAppSelector((state) => prizeSelectors.selectById(state, Number(id)));
    const isLoading = useAppSelector(getPrizeIsLoading);

    const isWinner = prize?.winsCount > 0;

    const onInitReducer = useCallback(() => {
        if (id) {
            dispatch(fetchUserPrizes());
        }
    }, [dispatch, id]);

    const getTextForButton = useCallback(
        (status: PrizeStatus) => {
            if (!isWinner && status === PrizeStatus.NEW) {
                return 'Go to the website';
            }

            switch (status) {
                case PrizeStatus.NOT_TAKEN:
                    return 'Get your prize';
                case PrizeStatus.NEW:
                    return 'Get your prize';
                case PrizeStatus.TAKEN:
                    return 'Prize already taken';
                default:
                    return 'Go to the website';
            }
        },
        [isWinner],
    );

    const onGetPrize = useCallback(async () => {
        if (__IS_STORYBOOK__) return;
        if (prize && prize.status !== PrizeStatus.TAKEN) {
            await dispatch(updatePrizeStatus({ prizeId: prize.id, status: PrizeStatus.TAKEN }));
            await dispatch(fetchUser());
            await dispatch(createEvent());
            navigate('/');
        } else {
            navigate('/');
        }
    }, [dispatch, navigate, prize]);

    let Component = null;
    if (isLoading) {
        Component = (
            <div className={styles.loader}>
                <Loader className={styles.loader} size={LoaderSize.LARGE} />
            </div>
        );
    } else if (prize) {
        Component = (
            <>
                <div className={styles.title}>
                    <Text text={isWinner ? 'You win!' : 'oh, miss'} size={TextSize.LARGE_CAPS} />
                    <Text text={`You guessed ${prize?.winsCount ?? 0}/${prize?.totalRaces ?? 0}`} size={TextSize.BIG} />
                </div>
                <PrizeItem prize={prize} />
                <div className={styles.buttons_container}>
                    <Button theme={ButtonTheme.PRIMARY_CONTRAST} onClick={onGetPrize}>
                        {getTextForButton(prize.status)}
                    </Button>
                    <Button theme={ButtonTheme.CLEAR} onClick={onGetPrize}>
                        Try again
                    </Button>
                </div>
            </>
        );
    } else {
        Component = (
            <div className={styles.no_prize}>
                <Text text="No prize found" size={TextSize.LARGE_CAPS} />
                <Button theme={ButtonTheme.SECONDARY_CLEAR} onClick={() => navigate('/')}>
                    Try again
                </Button>
            </div>
        );
    }
    return (
        <DynamicModuleLoader reducers={initialReducers} onInit={onInitReducer} removeAfterUnmount>
            <div
                className={cn(styles.PrizePage, className, {
                    [styles.loser]: !isWinner,
                    [styles.winner]: isWinner,
                })}
            >
                {Component}
            </div>
        </DynamicModuleLoader>
    );
};

export default PrizePage;
