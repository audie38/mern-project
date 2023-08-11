import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./note/noteSlice";
import notifReducer from "./notification/notificationSlice";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: { note: noteReducer, notif: notifReducer, auth: authReducer },
});

export default store;
