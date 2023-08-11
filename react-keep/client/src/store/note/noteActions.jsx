import { noteActions } from "./noteSlice";
import { notificationActions } from "../notification/notificationSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNotesData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${API_BASE_URL}/note`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData?.message || "Failed to Fetch Data";
        dispatch(notificationActions.setNotifData(message));
      }

      return responseData?.data;
    };
    try {
      dispatch(notificationActions.setStartLoading());
      dispatch(noteActions.updateNeedRefresh(false));
      const notesData = await sendRequest();
      dispatch(noteActions.populateNotesData(notesData));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(noteActions.updateNeedRefresh(false));
      dispatch(noteActions.populateNotesData([]));
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const fetchNoteDataById = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${API_BASE_URL}/note/${parseInt(id)}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData?.message || "Failed to Fetch Data";
        dispatch(notificationActions.setNotifData(message));
      }

      return responseData?.data;
    };

    try {
      dispatch(notificationActions.setStartLoading());
      const data = await sendRequest();
      dispatch(noteActions.setNoteData(data));
      dispatch(notificationActions.setFinishLoading());
      return data;
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const updateNoteData = (noteObj) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${API_BASE_URL}/note/${parseInt(noteObj?.notesId)}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: noteObj?.title,
          label: noteObj?.label,
          description: noteObj?.description,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData?.message || "Failed to Update Notes";
        dispatch(notificationActions.setNotifData(message));
      }
    };

    try {
      dispatch(notificationActions.setStartLoading());
      await sendRequest();
      dispatch(noteActions.updateNeedRefresh(true));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const addNewNote = (noteObj) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${API_BASE_URL}/note`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(noteObj),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData?.message || "Failed to Add New Notes";
        dispatch(notificationActions.setNotifData(message));
      }
    };

    try {
      dispatch(notificationActions.setStartLoading());
      await sendRequest();
      dispatch(noteActions.updateNeedRefresh(true));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const deleteNote = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${API_BASE_URL}/note/${parseInt(id)}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData?.message || "Failed to Delete Notes";
        dispatch(notificationActions.setNotifData(message));
      }

      await response.json();
      dispatch(noteActions.updateNeedRefresh(true));
    };

    try {
      dispatch(notificationActions.setStartLoading());
      await sendRequest();

      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const searchNotes = (query) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`${API_BASE_URL}/note?query=${query}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData?.message || "Failed to Fetch Data";
        dispatch(notificationActions.setNotifData(message));
      }

      return responseData?.data;
    };
    try {
      dispatch(notificationActions.setStartLoading());
      dispatch(noteActions.updateNeedRefresh(false));
      const notesData = await sendRequest();
      dispatch(noteActions.populateNotesData(notesData));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(noteActions.updateNeedRefresh(false));
      dispatch(notificationActions.setFinishLoading());
    }
  };
};
