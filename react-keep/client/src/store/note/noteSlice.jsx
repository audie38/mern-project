import { createSlice } from "@reduxjs/toolkit";

const noteInitialState = {
  notes: [],
};

const noteSlice = createSlice({
  name: "",
  initialState: noteInitialState,
  reducers: {
    populateNotesData(state, action) {
      state.notes = action.payload;
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
