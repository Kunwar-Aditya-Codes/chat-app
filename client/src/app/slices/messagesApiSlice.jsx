import { apiSlice } from '../apiSlice';

const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data) => ({
        url: 'message',
        method: 'POST',
        body: {
          ...data,
        },
      }),
    }),

    getMessages: builder.mutation({
      query: (chatId) => ({
        url: `message/${chatId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useGetMessagesMutation } =
  messagesApiSlice;
