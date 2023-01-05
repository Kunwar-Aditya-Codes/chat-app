import { apiSlice } from '../apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoggedInUser: builder.mutation({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetLoggedInUserMutation } = userApiSlice;
