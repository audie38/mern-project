import NoteItem from "./NoteItem";
import { useSelector } from "react-redux";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";

const NoteList = () => {
  const isLoading = useSelector((state) => state.notif.isLoading);
  const isError = useSelector((state) => state.notif.message);
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

  if (isError) {
    content = <Alert className="text-center" message={isError.message} />;
  }

  return <div className="row d-flex justify-content-start align-items-center my-5">{content}</div>;
};

export default NoteList;
