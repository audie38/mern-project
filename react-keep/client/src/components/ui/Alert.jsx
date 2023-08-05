import PropTypes from "prop-types";

const Alert = (props) => {
  const classes = `alert alert-${props.type} ${props.className}`;
  return (
    <div className={classes} role="alert">
      {props.message}
    </div>
  );
};

Alert.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

Alert.defaultProps = {
  type: "danger",
  message: "",
};

export default Alert;
