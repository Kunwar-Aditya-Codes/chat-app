import { apiSlice } from '../apiSlice';
import { setCredentials } from './authSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),

    // ! Remains to be implemented
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        console.log(res);
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation , useRefreshMutation } = authApiSlice;
