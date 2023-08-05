import PropTypes from "prop-types";

const Badge = (props) => {
  const classes = `badge text-bg-secondary ${props.className}`;
  return <span className={classes}>{props.message}</span>;
};

Badge.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default Badge;
