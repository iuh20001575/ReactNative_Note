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
        postNotes: builder.query({
            query: (body) => ({
                url: 'notes',
                method: 'post',
                body,
            }),
        }),
        patchNotes: builder.query({
            query: ({ id, body }) => ({
                url: `notes/${id}`,
                method: 'put',
                body,
            }),
        }),
    }),
});

export const { useGetNotesByUserQuery, usePostNotesQuery, usePatchNotesQuery } =
    jobApi;
