import { useContext } from "react";
import PropTypes from "prop-types";
import CartContext from "../../store/CartContext";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const numOfCartItems = ctx.items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  return (
    <button onClick={props.onClick} className={classes.button}>
      <i className={`fa-solid fa-cart-shopping ${classes.icon}`}></i>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

HeaderCartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HeaderCartButton;
