import { Fragment } from "react";
import NoteFilter from "../../components/note/NoteFilter";
import NoteList from "../../components/note/NoteList";

const Note = () => {
  return (
    <Fragment>
      <NoteFilter />
      <NoteList />
    </Fragment>
  );
};

export default Note;
