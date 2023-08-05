import { createSlice } from "@reduxjs/toolkit";

const noteInitialState = {
  notes: [],
  note: {},
  isNeedRefresh: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState: noteInitialState,
  reducers: {
    populateNotesData(state, action) {
      state.notes = action.payload;
    },
    setNoteData(state, action) {
      state.note = action.payload;
    },
    updateNeedRefresh(state, action) {
      state.isNeedRefresh = action.payload;
    },
  },
});

export const noteActions = noteSlice.actions;

export default noteSlice.reducer;
