/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";

import useInput from "../../hooks/use-input";
import { loginUser } from "../../store/auth/authActions";
import { useEffect } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.notif.isLoading);
  const error = useSelector((state) => state.notif.submitError);
  const loggedInUserInfo = useSelector((state) => state.auth.userInfo);

  const textValidation = (text) => {
    return text.trim() !== "";
  };

  const { value: account, error: accountInvalid, valid: accountIsValid, inputChangeHandler: accountChangeHandler, inputBlurHandler: accountBlurHandler, reset: accountInputReset } = useInput(textValidation);
  const { value: password, error: passwordInvalid, valid: passwordIsValid, inputChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler, reset: passwordInputReset } = useInput(textValidation);

  const formIsValid = accountIsValid && passwordIsValid;

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

  const resetFormInput = () => {
    accountInputReset();
    passwordInputReset();
  };

  const loginHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      const data = {
        account: account,
        password: password,
      };
      dispatch(loginUser(data));
    }
  };

  useEffect(() => {
    if (loggedInUserInfo?.userId) {
      navigate("/");
    }
  }, [navigate, loggedInUserInfo]);

  return (
    <>
      {error && <Alert message={error} />}
      {isLoading && <Spinner />}
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="account" className="form-label">
            Username or Email Address
          </label>
          <input type="text" value={account} onChange={accountChangeHandler} onBlur={accountBlurHandler} disabled={isLoading} id="account" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} disabled={isLoading} id="password" className="form-control" />
        </div>
        <div className="mb-3">{formSubmitButton}</div>
      </form>
      <div className="my-3 text-center">
        <span>
          {`Don't have an account yet ?`} <Link to="/register">Sign Up Here!</Link>
        </span>
      </div>
    </>
  );
};

export default LoginForm;
