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
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const responseData = await response.json();

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
      dispatch(notificationActions.setNotifData(error));
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
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const responseData = await response.json();
      return responseData?.data;
    };

    try {
      dispatch(notificationActions.setStartLoading());
      const data = await sendRequest();
      dispatch(noteActions.setNoteData(data));
      dispatch(notificationActions.setFinishLoading());
      return data;
    } catch (error) {
      dispatch(notificationActions.setNotifData(error));
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
        body: JSON.stringify({
          title: noteObj?.title,
          label: noteObj?.label,
          description: noteObj?.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to Update Notes");
      }

      await response.json();
    };

    try {
      dispatch(notificationActions.setStartLoading());
      await sendRequest();
      dispatch(noteActions.updateNeedRefresh(true));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setNotifData(error));
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
        body: JSON.stringify(noteObj),
      });

      if (!response.ok) {
        throw new Error("Failed to Add New Notes");
      }

      await response.json();
    };

    try {
      dispatch(notificationActions.setStartLoading());
      await sendRequest();
      dispatch(noteActions.updateNeedRefresh(true));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setNotifData(error));
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
      });

      if (!response.ok) {
        throw new Error("Failed to Delete Notes");
      }

      await response.json();
    };

    try {
      dispatch(notificationActions.setStartLoading());
      await sendRequest();
      dispatch(noteActions.updateNeedRefresh(true));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setNotifData(error));
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
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      const responseData = await response.json();

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
      dispatch(notificationActions.setNotifData(error));
      dispatch(notificationActions.setFinishLoading());
    }
  };
};
