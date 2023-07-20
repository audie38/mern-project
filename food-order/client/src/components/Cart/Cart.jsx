import PropTypes from "prop-types";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {
  const cartItems = [
    {
      id: "c1",
      name: "Sushi",
      amount: 2,
      price: 12.99,
    },
  ].map((item) => (
    <li className={classes["cart-items"]} key={item.id}>
      {item.name}
    </li>
  ));

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>25.98</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

Cart.propTypes = {
  onHideCart: PropTypes.func.isRequired,
};

export default Cart;
