import { apiSlice } from '../apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.mutation({
      query: (searchTerm) => ({
        url: `/user?search=${searchTerm}`,
        method: 'GET',
      }),
    }),

    logginUser: builder.mutation({
      query: () => ({
        url: '/user/loggedin',
        method: 'GET',
      }),
    }),
  }),
});

export const { useSearchUsersMutation, useLogginUserMutation } = userApiSlice;
