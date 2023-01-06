import { apiSlice } from '../apiSlice';

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.mutation({
      query: (userId) => ({
        url: `/chat/${userId}`,
        method: 'GET',
      }),
    }),

    createChat: builder.mutation({
      query: (data) => ({
        url: '/chat',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const { useGetChatsMutation, useCreateChatMutation } = chatApiSlice;
