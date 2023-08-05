import PropTypes from "prop-types";

const Card = (props) => {
  const classes = `card shadow-lg my-3 rounded-3 ${props.className}`;
  return <div className={classes}>{props.children}</div>;
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default Card;
