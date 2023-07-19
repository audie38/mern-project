import PropTypes from "prop-types";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const inputElAttribute = { id: `amount_${props.id}`, type: "number", min: "1", max: "5", step: "1", defaultValue: "1" };
  return (
    <form className={classes.form}>
      <Input label="Amount" input={inputElAttribute} />
      <button>+ Add</button>
    </form>
  );
};

MealItemForm.propTypes = {
  id: PropTypes.string,
};

export default MealItemForm;
