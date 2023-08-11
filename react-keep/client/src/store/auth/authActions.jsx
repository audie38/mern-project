import { authActions } from "./authSlice";
import { notificationActions } from "../notification/notificationSlice";
import { noteActions } from "../note/noteSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const sendRequest = async (url, config, dispatch) => {
  const response = await fetch(url, config);
  const responseData = await response.json();
  if (!response.ok) {
    const message = responseData?.message || "500 Internal Server Error";
    dispatch(notificationActions.setErrorNotif(message));
  }
  return responseData?.data;
};

export const registerNewUser = (newUserObj) => {
  return async (dispatch) => {
    try {
      dispatch(notificationActions.clearErrorNotif());
      const url = `${API_BASE_URL}/user`;
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newUserObj),
      };
      dispatch(notificationActions.setStartLoading());
      const newUserData = await sendRequest(url, config, dispatch);
      dispatch(authActions.setUserInfo(newUserData));
      dispatch(noteActions.updateNeedRefresh(true));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const loginUser = (userObj) => {
  return async (dispatch) => {
    try {
      dispatch(notificationActions.clearErrorNotif());
      const url = `${API_BASE_URL}/user/auth`;
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userObj),
      };
      dispatch(notificationActions.setStartLoading());
      const newUserData = await sendRequest(url, config, dispatch);
      dispatch(authActions.setUserInfo(newUserData));
      dispatch(noteActions.updateNeedRefresh(true));
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      dispatch(notificationActions.clearErrorNotif());
      const url = `${API_BASE_URL}/user/logout`;
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      dispatch(notificationActions.setStartLoading());
      await sendRequest(url, config, dispatch);
      dispatch(authActions.logoutUser());
      dispatch(notificationActions.setFinishLoading());
    } catch (error) {
      dispatch(notificationActions.setFinishLoading());
    }
  };
};
