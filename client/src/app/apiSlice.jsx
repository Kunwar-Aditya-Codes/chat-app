import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log('reauthenticating...');

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult?.data) {
      //! Set the new token in the store
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult.error.status === 403) {
        refreshResult.error.data.message = 'Session expired ';
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Chat', 'User'],
  endpoints: (builder) => ({}),
});