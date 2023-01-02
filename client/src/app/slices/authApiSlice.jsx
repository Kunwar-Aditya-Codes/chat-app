import { apiSlice } from '../apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => console.log('body', body),
    }),
  }),
});

export const { useRegisterMutation } = authApiSlice;
