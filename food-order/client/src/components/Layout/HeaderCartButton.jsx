import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CartContext from "../../store/CartContext";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [highlight, setHighlight] = useState(false);
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const numOfCartItems = items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${highlight ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setHighlight(true);
    const timer = setTimeout(() => {
      setHighlight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
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
