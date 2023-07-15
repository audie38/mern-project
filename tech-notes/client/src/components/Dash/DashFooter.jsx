import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathName } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");
  let goHomeButton = null;

  if (pathName !== "/dash") {
    goHomeButton = (
      <button onClick={onGoHomeClicked}>
        Home
        <i className="fa-solid fa-house"></i>
      </button>
    );
  }

  const content = (
    <footer>
      {goHomeButton}
      <p>Current User: </p>
      <p>Status: </p>
    </footer>
  );
  return content;
};

export default DashFooter;
