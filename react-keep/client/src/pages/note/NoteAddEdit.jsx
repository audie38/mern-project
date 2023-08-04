import { useParams } from "react-router-dom";
import NoteForm from "../../components/note/NoteForm";

const NoteAddEdit = () => {
  const params = useParams();
  const id = params.id;
  const isEditMode = id ? true : false;

  return <NoteForm isEdit={isEditMode} />;
};

export default NoteAddEdit;
