import { createSlice } from "@reduxjs/toolkit";

const notificationInitialState = {
  message: null,
  isLoading: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    setNotifData(state, action) {
      state.message = action.payload;
    },
    setStartLoading(state) {
      state.isLoading = true;
    },
    setFinishLoading(state) {
      state.isLoading = false;
    },
    clearNotifData(state) {
      state.message = null;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
