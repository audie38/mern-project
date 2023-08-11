import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Public(props) {
  const loggedInUser = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = !isNaN(loggedInUser?.userId);
  return isLoggedIn ? <Navigate to="/" replace /> : <>{props.children}</>;
}

Public.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
