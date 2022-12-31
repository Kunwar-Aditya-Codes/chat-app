import { apiSlice } from '../apiSlice';

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (userId) => ({
        url: '/chat',
        method: 'POST',
        body: { userId },
      }),
    }),

    getChat: builder.query({
      query: () => ({
        url: '/chat',
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateChatMutation, useGetChatQuery } = chatApiSlice;
