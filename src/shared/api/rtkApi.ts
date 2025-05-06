import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './api.config';

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: [],
    endpoints: () => ({}),
});
