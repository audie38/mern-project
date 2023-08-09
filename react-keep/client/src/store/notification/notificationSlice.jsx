import { createSlice } from "@reduxjs/toolkit";

const notificationInitialState = {
  fetchError: null,
  isLoading: false,
  submitError: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    setNotifData(state, action) {
      state.fetchError = action.payload;
    },
    setErrorNotif(state, action) {
      state.submitError = action.payload;
    },
    setStartLoading(state) {
      state.isLoading = true;
    },
    setFinishLoading(state) {
      state.isLoading = false;
    },
    clearNotifData(state) {
      state.fetchError = null;
      state.submitError = null;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
