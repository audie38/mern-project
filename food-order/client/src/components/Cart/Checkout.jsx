import classes from "./Checkout.module.css";
import PropTypes from "prop-types";
import { useRef, useState, useContext } from "react";
import CartContext from "../../store/CartContext";

const isEmpty = (value) => value.trim() === "";
const isInvalidPostal = (value) => value.trim().length !== 5;

export default function Checkout(props) {
  const ctx = useContext(CartContext);

  const [formInput, setFormInput] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = !isInvalidPostal(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInput({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal,
    });

    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalInputRef.current.value = "";
    cityInputRef.current.value = "";
    ctx.clearCart();
    props.onCloseCart();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInput.name ? "" : classes.invalid}`}>
        <label htmlFor="name">Your name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInput.name && <p>Please enter a valid Name</p>}
      </div>
      <div className={`${classes.control} ${formInput.street ? "" : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInput.street && <p>Please enter a valid Street</p>}
      </div>
      <div className={`${classes.control} ${formInput.postalCode ? "" : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInput.postalCode && <p>Please enter a valid Postal Code</p>}
      </div>
      <div className={`${classes.control} ${formInput.city ? "" : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInput.city && <p>Please enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCloseCart}>
          Cancel
        </button>
        <button type="submit">Confirm</button>
      </div>
    </form>
  );
}

Checkout.propTypes = {
  onCloseCart: PropTypes.func,
  onConfirm: PropTypes.func,
};
