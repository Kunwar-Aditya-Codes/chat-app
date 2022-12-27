import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },

    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state) => state.auth.token;
