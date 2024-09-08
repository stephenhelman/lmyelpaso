import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, id: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, id } = action.payload;
      state.token = accessToken;
      state.id = id;
    },
    logOut: (state, action) => {
      state.token = null;
      state.id = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUserId = (state) => state.auth.id;
