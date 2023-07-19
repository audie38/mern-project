import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/dash">
          TechNotes
        </Link>
      </div>
    </nav>
  );
};

export default DashHeader;
