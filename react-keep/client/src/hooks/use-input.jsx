import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { value: state.value, isTouched: true };
    case "RESET":
      return initialState;
    default:
      return initialState;
  }
};

const useInput = (validate) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);
  const valueIsValid = validate(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const enteredValueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const enteredValueBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };
  const clearValueHandler = () => {
    dispatch({ type: "RESET" });
  };
  return {
    value: inputState.value,
    error: hasError,
    valid: valueIsValid,
    inputChangeHandler: enteredValueChangeHandler,
    inputBlurHandler: enteredValueBlurHandler,
    reset: clearValueHandler,
  };
};

export default useInput;
