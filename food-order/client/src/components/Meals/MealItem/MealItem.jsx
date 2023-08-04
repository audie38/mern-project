import PropTypes from "prop-types";
import classes from "./MealItem.module.css";

import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../store/CartContext";

const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const price = `$ ${props.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    ctx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

MealItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

export default MealItem;
