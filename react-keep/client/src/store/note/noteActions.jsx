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
      const notesData = await sendRequest();
      dispatch(noteActions.populateNotesData(notesData));
    } catch (error) {
      dispatch(notificationActions.setNotifData(error));
    }
  };
};
