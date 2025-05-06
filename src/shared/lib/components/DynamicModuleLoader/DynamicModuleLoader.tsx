import { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Reducer } from '@reduxjs/toolkit';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useStore } from 'react-redux';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps extends PropsWithChildren {
    reducers: ReducerList;
    removeAfterUnmount?: boolean;
    onInit?: () => void;
}
export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterUnmount, onInit } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useAppDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            const nameKey = name as StateSchemaKey;
            // Проверяем, есть ли уже редьюсер с таким именем
            const hasReducer = store.reducerManager.getReducerMap()[nameKey];

            // Добавляем редьюсер только если его еще нет
            if (!hasReducer) {
                store.reducerManager.add(nameKey, reducer as Reducer);
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        if (onInit) {
            if (__IS_STORYBOOK__) return;
            onInit();
        }

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);
    return <>{children}</>;
};
