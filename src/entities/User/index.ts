export { getPrizeById } from './model/selectors/getPrizeById/getPrizeById';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInitialized } from './model/selectors/getUserInitialized/getUserInitialized';
export { fetchUser } from './model/services/fetchUser/fetchUser';
export { userActions, userReducer } from './model/slice/userSlice';
export { PrizeStatus } from './model/types/userSchema';
export type { Prize, User, UserSchema } from './model/types/userSchema';
