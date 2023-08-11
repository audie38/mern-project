import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = {
        userId: parseInt(action?.payload?.userId),
        name: action?.payload?.name,
        username: action?.payload?.username,
        email: action?.payload?.email,
      };
    },
    logoutUser(state) {
      state.userInfo = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
