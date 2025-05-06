import { StateSchema } from '@/app/providers/StoreProvider';
import { NavbarItemStatus } from '../../types/eventSchema';

const defaultNavItems = [
    { id: 1, name: 'Race 1', status: NavbarItemStatus.ACTIVE },
    { id: 2, name: 'Race 2', status: NavbarItemStatus.INACTIVE },
    { id: 3, name: 'Race 3', status: NavbarItemStatus.INACTIVE },
];

export const getNavItems = (state: StateSchema) => state.event.navItems || defaultNavItems;
