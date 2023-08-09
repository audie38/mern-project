import { useSelector } from "react-redux";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";

const LoginForm = () => {
  const isLoading = useSelector((state) => state.notif.isLoading);
  const error = useSelector((state) => state.notif.submitError);

  const formSubmitButton = isLoading ? (
    <button className="btn btn-secondary" type="button" disabled>
      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Login</span>
    </button>
  ) : (
    <button type="submit" className="btn btn-warning w-100">
      Login
    </button>
  );

  const loginHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {error && <Alert message={error} />}
      {isLoading && <Spinner />}
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="account" className="form-label">
            Username or Email Address
          </label>
          <input type="text" disabled={isLoading} id="account" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" disabled={isLoading} id="password" className="form-control" />
        </div>
        <div className="mb-3">{formSubmitButton}</div>
      </form>
    </>
  );
};

export default LoginForm;
