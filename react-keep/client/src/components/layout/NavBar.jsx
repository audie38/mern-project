import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const isLoggedIn = useSelector((state) => state.auth.userInfo);
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
            {!isLoggedIn && (
              <>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                  Login
                  <i className="fa-solid fa-user ms-2"></i>
                </NavLink>
              </>
            )}
            {isLoggedIn && (
              <>
                <NavLink to="/note" className={({ isActive }) => (isActive ? "nav-link align-self-lg-center active" : "nav-link align-self-lg-center")}>
                  Note
                </NavLink>
                <NavLink to="/" className={({ isActive }) => (isActive ? "btn btn-danger active" : "btn btn-danger")}>
                  Logout
                  <i className="fa-solid fa-right-from-bracket ms-2"></i>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
