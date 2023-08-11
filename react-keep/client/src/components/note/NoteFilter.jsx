import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchNotes } from "../../store/note/noteActions";

const NoteFilter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState(false);

  const setSearchQueryHandler = (event) => {
    setSearchQuery(event.target.value);
    setSearchInput(true);
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    dispatch(searchNotes(searchQuery));
  };

  useEffect(() => {
    if (searchInput) {
      dispatch(searchNotes(searchQuery));
    }
  }, [dispatch, searchQuery, searchInput]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={onSearchHandler} className="w-100 mx-auto" role="search">
        <input className="form-control me-2" value={searchQuery} onChange={setSearchQueryHandler} type="search" placeholder="Search" aria-label="Search" />
      </form>
    </div>
  );
};

export default NoteFilter;
