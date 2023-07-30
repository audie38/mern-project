/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import useHttp from "../../hooks/use-http";

const BASE_API_URL = `${import.meta.env.VITE_API_BASE_URL}/order/`;

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const ctx = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const { isLoading, error, sendRequest } = useHttp();

  const submitOrderHandler = (userData) => {
    const sendDataObj = {
      order: { ...userData, totalOrderPrice: ctx.totalAmount },
      details: ctx.items.map((item) => {
        return {
          name: item.name,
          amount: item.amount,
          price: item.price,
        };
      }),
    };
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendDataObj),
    };
    sendRequest(BASE_API_URL, options);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
      ))}
    </ul>
  );

  const totalAmount = `$ ${ctx.totalAmount.toFixed(2)}`;

  const hasItem = ctx.items.length > 0;

  const modalAction = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onHideCart}>
      <React.Fragment>
        {!isCheckout && (
          <>
            {cartItems}
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>
            </div>
          </>
        )}
        {isCheckout && <Checkout onConfirm={submitOrderHandler} onCloseCart={props.onHideCart} />}
        {!isCheckout && modalAction}
      </React.Fragment>
    </Modal>
  );
};

Cart.propTypes = {
  onHideCart: PropTypes.func.isRequired,
};

export default Cart;
