import Card from "../ui/Card";
import useInput from "../../hooks/use-input";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateNoteData } from "../../store/note/noteActions";

import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";

const NoteForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const notesId = params?.id;
  const notesData = useSelector((state) => state.note.notes);
  const isLoading = useSelector((state) => state.notif.isLoading);
  const isError = useSelector((state) => state.notif.message);

  let existingTitleData = {
    value: "",
    isTouched: false,
  };
  let existingLabelData = {
    value: "",
    isTouched: false,
  };
  let existingDescData = {
    value: "",
    isTouched: false,
  };

  if (notesId) {
    const existingNotes = notesData.find((note) => parseInt(note.notesId) === parseInt(notesId));

    if (existingNotes) {
      existingTitleData.value = existingNotes.title;
      existingTitleData.isTouched = true;
      existingLabelData.value = existingNotes.label;
      existingLabelData.isTouched = true;
      existingDescData.value = existingNotes.description;
      existingDescData.isTouched = true;
    }
  }

  const textValidation = (text) => {
    return text.trim() !== "";
  };

  const { value: title, error: titleInvalid, valid: titleIsValid, inputChangeHandler: onTitleChangeHandler, inputBlurHandler: onTitleBlurHandler, reset: resetTitle } = useInput(textValidation, existingTitleData);
  const { value: label, error: labelInvalid, valid: labelIsValid, inputChangeHandler: onLabelChangeHandler, inputBlurHandler: onLabelBlurHandler, reset: resetLabel } = useInput(textValidation, existingLabelData);
  const { value: desc, error: descInvalid, valid: descIsValid, inputChangeHandler: onDescChangeHandler, inputBlurHandler: onDescBlurHandler, reset: resetDesc } = useInput(textValidation, existingDescData);

  const formSubmitButton = isLoading ? (
    <button className="btn btn-secondary" type="button" disabled>
      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Save</span>
    </button>
  ) : (
    <button type="submit" className="btn btn-primary w-25 ms-auto">
      Save
    </button>
  );

  const resetFields = () => {
    resetTitle();
    resetLabel();
    resetDesc();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (titleIsValid && labelIsValid && descIsValid) {
      if (confirm("Save Changes ?")) {
        if (notesId) {
          const notesObj = {
            notesId: notesId,
            title: title,
            label: label,
            description: desc,
          };
          dispatch(updateNoteData(notesObj));
        }
        resetFields();
        navigate("/");
      }
    }
  };

  return (
    <Card className="p-5">
      {isLoading && <Spinner />}
      {isError && <Alert message={isError.message} />}
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label">
            Title
          </label>
          <input type="text" value={title} disabled={isLoading} onChange={onTitleChangeHandler} onBlur={onTitleBlurHandler} name="noteTitle" id="noteTitle" className="form-control" />
          {titleInvalid && <div className="form-text text-danger">Title Cannot be Empty</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="noteLabel" className="form-label">
            Label
          </label>
          <input type="text" value={label} disabled={isLoading} onChange={onLabelChangeHandler} onBlur={onLabelBlurHandler} name="noteLabel" id="noteLabel" className="form-control" />
          {labelInvalid && <div className="form-text text-danger">Label Cannot be Empty</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="noteDesc" className="form-label">
            Description
          </label>
          <textarea value={desc} disabled={isLoading} onChange={onDescChangeHandler} onBlur={onDescBlurHandler} className="form-control" id="noteDesc" rows={5}></textarea>
          {descInvalid && <div className="form-text text-danger">Description Cannot be Empty</div>}
        </div>
        <div className="d-flex">{formSubmitButton}</div>
      </form>
    </Card>
  );
};

export default NoteForm;
