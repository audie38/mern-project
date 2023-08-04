import Card from "../ui/Card";
import PropTypes from "prop-types";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";

const NoteForm = (props) => {
  const navigate = useNavigate();
  const textValidation = (text) => {
    return text.trim() !== "";
  };

  if (props.isEdit) {
    console.log("Edit Mode");
  }

  const { value: title, error: titleInvalid, valid: titleIsValid, inputChangeHandler: onTitleChangeHandler, inputBlurHandler: onTitleBlurHandler, reset: resetTitle } = useInput(textValidation);
  const { value: label, error: labelInvalid, valid: labelIsValid, inputChangeHandler: onLabelChangeHandler, inputBlurHandler: onLabelBlurHandler, reset: resetLabel } = useInput(textValidation);
  const { value: desc, error: descInvalid, valid: descIsValid, inputChangeHandler: onDescChangeHandler, inputBlurHandler: onDescBlurHandler, reset: resetDesc } = useInput(textValidation);

  const submitHandler = (event) => {
    event.preventDefault();
    if (titleIsValid && labelIsValid && descIsValid) {
      if (confirm("Save Changes ?")) {
        resetTitle();
        resetLabel();
        resetDesc();
        navigate("/");
      }
    }
  };

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label">
            Title
          </label>
          <input type="text" value={title} onChange={onTitleChangeHandler} onBlur={onTitleBlurHandler} name="noteTitle" id="noteTitle" className="form-control" />
          {titleInvalid && <div className="form-text text-danger">Title Cannot be Empty</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="noteLabel" className="form-label">
            Label
          </label>
          <input type="text" value={label} onChange={onLabelChangeHandler} onBlur={onLabelBlurHandler} name="noteLabel" id="noteLabel" className="form-control" />
          {labelInvalid && <div className="form-text text-danger">Label Cannot be Empty</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="noteDesc" className="form-label">
            Description
          </label>
          <textarea value={desc} onChange={onDescChangeHandler} onBlur={onDescBlurHandler} className="form-control" id="noteDesc" rows={5}></textarea>
          {descInvalid && <div className="form-text text-danger">Description Cannot be Empty</div>}
        </div>
        <div className="d-flex">
          <button className="btn btn-primary w-25 ms-auto">Save</button>
        </div>
      </form>
    </Card>
  );
};

NoteForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default NoteForm;
