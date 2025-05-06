import { StateSchema } from '@/app/providers/StoreProvider';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

// Типизированный хук для selector
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
