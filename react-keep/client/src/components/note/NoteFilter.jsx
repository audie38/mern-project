import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchNotes } from "../../store/note/noteActions";

const NoteFilter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBlur, setSearchBlur] = useState(false);

  const setSearchQueryHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    dispatch(searchNotes(searchQuery));
  };

  const onBlurHandler = () => {
    setSearchBlur(true);
  };

  useEffect(() => {
    if (searchBlur) {
      dispatch(searchNotes(searchQuery));
    }
  }, [dispatch, searchQuery, searchBlur]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={onSearchHandler} className="w-100 mx-auto" role="search">
        <input className="form-control me-2" value={searchQuery} onChange={setSearchQueryHandler} onBlur={onBlurHandler} type="search" placeholder="Search" aria-label="Search" />
      </form>
    </div>
  );
};

export default NoteFilter;
