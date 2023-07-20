import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input?.id}>{props.label}</label>
      <input ref={ref} {...props.input} /> {/* use object destructure as attribute to element */}
    </div>
  );
});

Input.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

Input.displayName = "Input";

export default Input;
