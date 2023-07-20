import PropTypes from "prop-types";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button onClick={props.onClick} className={classes.button}>
      <i className={`fa-solid fa-cart-shopping ${classes.icon}`}></i>
      <span>Your Cart</span>
      <span className={classes.badge}>0</span>
    </button>
  );
};

HeaderCartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HeaderCartButton;
