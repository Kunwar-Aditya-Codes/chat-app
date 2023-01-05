import { apiSlice } from '../apiSlice';

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.mutation({
      query: (userId) => ({
        url: `/chat/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetChatsMutation } = chatApiSlice;
