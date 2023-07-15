import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <header>
      <div className="">
        <Link to="/dash/notes">TechNotes</Link>
        <nav></nav>
      </div>
    </header>
  );
};

export default DashHeader;
