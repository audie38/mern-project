import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notificationActions } from "../../store/notification/notificationSlice";

import NoteFilter from "../../components/note/NoteFilter";
import NoteList from "../../components/note/NoteList";
import Alert from "../../components/ui/Alert";

const Note = () => {
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.notif.message);
  const dismissAlertHandler = () => {
    dispatch(notificationActions.clearNotifData());
  };

  return (
    <Fragment>
      <div onClick={dismissAlertHandler}>{isError && <Alert message={isError || isError.message} />}</div>
      <NoteFilter />
      <NoteList />
    </Fragment>
  );
};

export default Note;
