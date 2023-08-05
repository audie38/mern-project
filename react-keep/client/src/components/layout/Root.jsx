import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./NavBar";

export default function Root() {
  return (
    <Fragment>
      <NavBar />
      <div className="container my-5">
        <Outlet />
      </div>
    </Fragment>
  );
}
