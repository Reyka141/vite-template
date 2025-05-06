import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { NavbarItemStatus } from '../../types/eventSchema';
import { getNavItems } from './getNavItems';

describe('getNavItems', () => {
    test('должен вернуть значение из состояния', () => {
        const state: DeepPartial<StateSchema> = {
            event: {
                navItems: [
                    { id: 1, name: 'Test 1', status: NavbarItemStatus.ACTIVE },
                    { id: 2, name: 'Test 2', status: NavbarItemStatus.INACTIVE },
                ],
            },
        };
        expect(getNavItems(state as StateSchema)).toEqual(state.event!.navItems);
    });

    test('должен вернуть значения по умолчанию', () => {
        const state: DeepPartial<StateSchema> = {
            event: {},
        };
        expect(getNavItems(state as StateSchema)).toEqual([
            { id: 1, name: 'Race 1', status: NavbarItemStatus.ACTIVE },
            { id: 2, name: 'Race 2', status: NavbarItemStatus.INACTIVE },
            { id: 3, name: 'Race 3', status: NavbarItemStatus.INACTIVE },
        ]);
    });
});
