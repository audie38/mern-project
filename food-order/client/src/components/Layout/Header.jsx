import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import Meals from "../../assets/meals.jpg";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={Meals} alt="Meals" />
      </div>
    </Fragment>
  );
}
