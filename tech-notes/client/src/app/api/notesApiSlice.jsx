import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const notesAdapter = createEntityAdapter({});
const initialState = notesAdapter.getInitialState();
const NOTES_URL = "/api/notes";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => `${NOTES_URL}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [{ type: "Note", id: "LIST" }, ...result.ids.map((id) => ({ type: "Note", id }))];
        } else {
          return [{ type: "Note", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetNotesQuery } = notesApiSlice;
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();
const selectNotesData = createSelector(selectNotesResult, (notesResult) => notesResult.data);
export const { selectAll: selectAllNotes, selectById: selectNoteById, selectIds: selectNoteIds } = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState);
