import { apiSlice } from '../apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.mutation({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
    }),

    searchUser: builder.mutation({
      query: (query) => ({
        url: `user/search?query=${query}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetLoggedInUserMutation, useSearchUserMutation } =
  userApiSlice;
