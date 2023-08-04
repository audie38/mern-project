import Card from "../ui/Card";
import PropTypes from "prop-types";

const NoteForm = (props) => {
  let content = <p>Add Note Page</p>;
  if (props.isEdit) {
    content = <p>Edit Note Page</p>;
  }
  return <Card className="d-flex justify-content-center align-items-center">{content}</Card>;
};

NoteForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default NoteForm;
