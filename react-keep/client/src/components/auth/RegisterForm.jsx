import { useSelector } from "react-redux";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";

const RegisterForm = () => {
  const isLoading = useSelector((state) => state.notif.isLoading);
  const error = useSelector((state) => state.notif.submitError);

  const formSubmitButton = isLoading ? (
    <button className="btn btn-secondary" type="button" disabled>
      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Register</span>
    </button>
  ) : (
    <button type="submit" className="btn btn-warning w-100">
      Register
    </button>
  );

  return (
    <>
      {error && <Alert message={error} />}
      {isLoading && <Spinner />}
      <form>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input type="text" id="firstName" className="form-control" />
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input type="text" id="lastName" className="form-control" />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" id="username" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input type="email" name="email" id="email" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" name="password" id="password" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirmation" className="form-label">
            Password Confirmation
          </label>
          <input type="password" name="passwordConfirmation" id="passwordConfirmation" className="form-control" />
        </div>
        <div className="mb-3">{formSubmitButton}</div>
      </form>
    </>
  );
};

export default RegisterForm;
