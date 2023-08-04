import { Fragment } from "react";
import PropTypes from "prop-types";

import HeaderCartButton from "./HeaderCartButton";
import Meals from "../../assets/meals.jpg";
import classes from "./Header.module.css";

export default function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={Meals} alt="Meals" />
      </div>
    </Fragment>
  );
}

Header.propTypes = {
  onShowCart: PropTypes.func.isRequired,
};
