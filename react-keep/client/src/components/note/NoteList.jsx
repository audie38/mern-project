import NoteItem from "./NoteItem";

const NoteList = () => {
  return (
    <div className="row d-flex justify-content-center align-items-center my-5">
      <NoteItem />
      <NoteItem />
      <NoteItem />
    </div>
  );
};

export default NoteList;
