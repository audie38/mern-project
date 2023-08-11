import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth/authActions";
import { useEffect } from "react";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = !isNaN(loggedInUser?.userId);

  const logoutHandler = () => {
    if (confirm("Logout ?")) {
      dispatch(logoutUser());
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

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
                <button onClick={logoutHandler} className="btn btn-danger active" type="button">
                  Logout
                  <i className="fa-solid fa-right-from-bracket ms-2"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
