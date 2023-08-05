import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../store/note/noteActions";

const NoteItem = (props) => {
  const dispatch = useDispatch();
  const noteLabels = props.note.label.split(",");
  const noteCreated = new Date(props.note.createdAt).toLocaleString("id-id");
  const isLoading = useSelector((state) => state.notif.isLoading);

  const deleteNoteHandler = () => {
    if (confirm("Delete Note ?")) {
      dispatch(deleteNote(props.note.notesId));
    }
  };

  const content = isLoading ? (
    <Spinner />
  ) : (
    <>
      <div className="d-flex">
        <button className="btn btn-light ms-auto" onClick={deleteNoteHandler}>
          X
        </button>
      </div>
      <Link to={`/note/${props.note.notesId}`} className="card-body">
        <h1>{props.note.title}</h1>
        {noteLabels.map((label, index) => (
          <Badge className="me-2 mb-2" key={index} message={label} />
        ))}
        <p>Created at: {noteCreated}</p>
      </Link>
    </>
  );

  return <Card className="text-center p-3">{content}</Card>;
};

NoteItem.propTypes = {
  note: PropTypes.object,
};

export default NoteItem;
