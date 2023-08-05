import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NoteItem = (props) => {
  const noteLabels = props.note.label.split(",");
  const noteCreated = new Date(props.note.createdAt).toLocaleString("id-id");
  return (
    <Card className="text-center p-3">
      <div className="d-flex">
        <button className="btn btn-light ms-auto">X</button>
      </div>
      <Link to={`/note/${props.note.notesId}`} className="card-body">
        <h1>{props.note.title}</h1>
        {noteLabels.map((label, index) => (
          <Badge className="me-2 mb-2" key={index} message={label} />
        ))}
        <p>Created at: {noteCreated}</p>
      </Link>
    </Card>
  );
};

NoteItem.propTypes = {
  note: PropTypes.object,
};

export default NoteItem;
