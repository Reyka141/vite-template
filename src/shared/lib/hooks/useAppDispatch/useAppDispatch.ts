import { AppDispatch } from '@/app/providers/StoreProvider/config/store';
import { useDispatch } from 'react-redux';

// Типизированный хук для dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
