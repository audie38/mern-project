import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function Private(props) {
  const loggedInUser = useSelector((state) => state.auth.userInfo);
  const isLoggedIn = !isNaN(loggedInUser?.userId);
  return isLoggedIn ? <>{props.children}</> : <Navigate to="/login" replace />;
}

Private.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
