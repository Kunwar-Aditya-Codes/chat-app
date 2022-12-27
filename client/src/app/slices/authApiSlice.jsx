import { apiSlice } from '../apiSlice';
import { logout, setToken } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
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

    login: builder.mutation({}),

    logout: builder.mutation({}),

    refresh: builder.mutation({}),
  }),
});

export const { useRegisterMutation } = authApiSlice;
