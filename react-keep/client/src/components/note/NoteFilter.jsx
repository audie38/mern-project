import { useState } from "react";

const NoteFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const setSearchQueryHandler = (event) => {
    setSearchQuery(event.target.value);
    console.log("Search Queries: ", event.target.value);
  };

  const onSearchHandler = (event) => {
    event.preventDefault();
    console.log("Search Queries: ", searchQuery);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={onSearchHandler} className="w-100 mx-auto" role="search">
        <input className="form-control me-2" value={searchQuery} onChange={setSearchQueryHandler} type="search" placeholder="Search" aria-label="Search" />
      </form>
    </div>
  );
};

export default NoteFilter;
