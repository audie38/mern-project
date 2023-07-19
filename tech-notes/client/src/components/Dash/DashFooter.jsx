import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathName } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");
  let goHomeButton = null;

  if (pathName !== "/dash") {
    goHomeButton = (
      <button className="btn btn-dark mb-3" onClick={onGoHomeClicked}>
        Home
        <i className="fa-solid fa-house ms-2"></i>
      </button>
    );
  }

  const content = (
    <footer className="container my-5">
      {goHomeButton}
      <p>Current User: </p>
      <p>Status: </p>
    </footer>
  );
  return content;
};

export default DashFooter;
