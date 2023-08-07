import NoteItem from "./NoteItem";
import { useSelector } from "react-redux";
import Spinner from "../ui/Spinner";

const NoteList = () => {
  const isLoading = useSelector((state) => state.notif.isLoading);
  const notes = useSelector((state) => state.note.notes) || [];

  let content = (
    <>
      {notes.length > 0 &&
        notes.map((note) => (
          <div className="col-md-4" key={note.notesId}>
            <NoteItem note={note} />
          </div>
        ))}
    </>
  );

  if (isLoading) {
    content = <Spinner />;
  }

  return <div className="row d-flex justify-content-start align-items-stretch my-5">{content}</div>;
};

export default NoteList;
