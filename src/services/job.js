import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import configs from '../configs';

export const jobApi = createApi({
    reducerPath: 'jobApi',
    baseQuery: fetchBaseQuery({ baseUrl: configs.ENDPOINT_DEV }),
    endpoints: (builder) => ({
        getNotesByUser: builder.query({
            query: (userId) => ({
                url: 'notes',
                params: {
                    user: userId,
                },
            }),
        }),
    }),
});

export const { useGetNotesByUserQuery } = jobApi;
