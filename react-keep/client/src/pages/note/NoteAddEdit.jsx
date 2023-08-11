import { useLoaderData } from "react-router-dom";
import NoteForm from "../../components/note/NoteForm";

const NoteAddEdit = () => {
  const data = useLoaderData();
  return <NoteForm existingData={data} />;
};

export default NoteAddEdit;
