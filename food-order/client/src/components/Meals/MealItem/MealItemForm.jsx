import PropTypes from "prop-types";
import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNum);
  };
  const inputElAttribute = { id: `amount_${props.id}`, type: "number", min: "1", max: "5", step: "1", defaultValue: "1" };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input label="Amount" input={inputElAttribute} ref={amountInputRef} />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

MealItemForm.propTypes = {
  id: PropTypes.string,
  onAddToCart: PropTypes.func,
};

export default MealItemForm;
