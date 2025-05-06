import type { Decorator } from '@storybook/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const RouteDecorator = (initialEntries: string[], path: string): Decorator => {
    const StoryWrapper: Decorator = (Story) => {
        return (
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path={path} element={<Story />} />
                </Routes>
            </MemoryRouter>
        );
    };

    return StoryWrapper;
};
