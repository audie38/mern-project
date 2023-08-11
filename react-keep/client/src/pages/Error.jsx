import { Fragment } from "react";
import NavBar from "../components/layout/NavBar";

const Error = () => {
  return (
    <Fragment>
      <NavBar />
      <div className="container my-5 text-center">
        <h1>404 | Error Page Not Found</h1>
      </div>
    </Fragment>
  );
};

export default Error;
