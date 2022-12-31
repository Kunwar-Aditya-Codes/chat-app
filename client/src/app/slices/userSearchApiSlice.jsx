import { apiSlice } from '../apiSlice';

const userSearchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.mutation({
      query: (searchTerm) => ({
        url: `/user?search=${searchTerm}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useSearchUsersMutation } = userSearchApiSlice;
