import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          React Keep
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <NavLink to="/note" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Note
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
