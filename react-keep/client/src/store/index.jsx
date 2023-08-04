import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./note/noteSlice";
import notifReducer from "./notification/notificationSlice";

const store = configureStore({
  reducer: { note: noteReducer, notif: notifReducer },
});

export default store;
