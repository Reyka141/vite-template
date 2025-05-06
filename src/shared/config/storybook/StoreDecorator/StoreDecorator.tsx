import { createReduxStore, StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { ReducersMapObject } from '@reduxjs/toolkit';
import type { Decorator } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export const StoreDecorator = (
    initialState: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
    useRouter = true,
): Decorator => {
    const StoryWrapper: Decorator = (Story) => {
        const store = createReduxStore(
            initialState as StateSchema,
            { ...asyncReducers } as ReducersMapObject<StateSchema>,
        );

        if (useRouter) {
            return (
                <MemoryRouter>
                    <Provider store={store}>
                        <Story />
                    </Provider>
                </MemoryRouter>
            );
        }

        return (
            <Provider store={store}>
                <Story />
            </Provider>
        );
    };

    return StoryWrapper;
};
