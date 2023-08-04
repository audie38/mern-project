import { createSlice } from "@reduxjs/toolkit";

const notificationInitialState = {
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    setNotifData(state, action) {
      state.message = action.payload;
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice.reducer;
