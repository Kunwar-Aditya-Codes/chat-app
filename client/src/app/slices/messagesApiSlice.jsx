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
  }),
});

export const { useCreateMessageMutation } = messagesApiSlice;
