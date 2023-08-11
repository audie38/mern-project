/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";

import useInput from "../../hooks/use-input";
import { registerNewUser } from "../../store/auth/authActions";
import { useEffect } from "react";

const RegisterForm = () => {
  const isLoading = useSelector((state) => state.notif.isLoading);
  let error = useSelector((state) => state.notif.submitError);
  const loggedInUserInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const textValidation = (text) => {
    return text.trim() !== "";
  };
  const emailValidation = (text) => {
    return text.trim() !== "" && text.trim().includes("@");
  };
  const passwordValidation = (text) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; //min 8 letter password, with at least a symbol, upper and lower case letters and a number
    return regex.test(text);
  };

  const { value: firstName, error: firstNameInvalid, valid: firstNameIsValid, inputChangeHandler: firstNameChangeHandler, inputBlurHandler: firstNameBlurHandler, reset: firstNameReset } = useInput(textValidation);
  const { value: lastName, error: lastNameInvalid, valid: lastNameIsValid, inputChangeHandler: lastNameChangeHandler, inputBlurHandler: lastNameBlurHandler, reset: lastNameReset } = useInput(textValidation);
  const { value: userName, error: userNameInvalid, valid: userNameIsValid, inputChangeHandler: userNameChangeHandler, inputBlurHandler: userNameBlurHandler, reset: userNameReset } = useInput(textValidation);
  const { value: email, error: emailInvalid, valid: emailIsValid, inputChangeHandler: emailChangeHandler, inputBlurHandler: emailBlurHandler, reset: emailReset } = useInput(emailValidation);
  const { value: password, error: passwordInvalid, valid: passwordIsValid, inputChangeHandler: passwordChangeHandler, inputBlurHandler: passwordBlurHandler, reset: passwordReset } = useInput(passwordValidation);
  const {
    value: passwordConfirm,
    error: passwordConfirmInvalid,
    valid: passwordConfirmIsValid,
    inputChangeHandler: passwordConfirmChangeHandler,
    inputBlurHandler: passwordConfirmBlurHandler,
    reset: passwordConfirmReset,
  } = useInput(passwordValidation);

  const passwordConfirmationMatch = password === passwordConfirm && passwordIsValid && passwordConfirmIsValid;
  const formIsValid = firstNameIsValid && lastNameIsValid && userNameIsValid && emailIsValid && passwordConfirmationMatch;

  const formSubmitButton = isLoading ? (
    <button className="btn btn-secondary" type="button" disabled>
      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
      <span role="status">Register</span>
    </button>
  ) : (
    <button type="submit" disabled={!formIsValid} className="btn btn-warning w-100">
      Register
    </button>
  );

  const resetFormInput = () => {
    firstNameReset();
    lastNameReset();
    userNameReset();
    emailReset();
    passwordReset();
    passwordConfirmReset();
  };

  const submitRegistration = (event) => {
    event.preventDefault();
    if (formIsValid) {
      if (confirm("Submit Registration ?")) {
        const newUserData = {
          name: `${firstName} ${lastName}`,
          username: `${userName}`,
          email: `${email}`,
          password: `${password}`,
        };
        dispatch(registerNewUser(newUserData));
      }
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
      <form onSubmit={submitRegistration}>
        <div className="mb-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input type="text" disabled={isLoading} value={firstName} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} id="firstName" className="form-control" />
              {firstNameInvalid && <p className="form-text text-danger text-capitalize">First Name Cannot be Empty</p>}
            </div>
            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input type="text" disabled={isLoading} value={lastName} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} id="lastName" className="form-control" />
              {lastNameInvalid && <p className="form-text text-danger text-capitalize">Last Name Cannot be Empty</p>}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" disabled={isLoading} value={userName} onChange={userNameChangeHandler} onBlur={userNameBlurHandler} id="username" className="form-control" />
          {userNameInvalid && <p className="form-text text-danger text-capitalize">Username cannot be Empty</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input type="email" disabled={isLoading} value={email} onChange={emailChangeHandler} onBlur={emailBlurHandler} name="email" id="email" className="form-control" />
          {emailInvalid && <p className="form-text text-danger text-capitalize">Email Address cannot be empty</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" disabled={isLoading} value={password} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} name="password" id="password" className="form-control" />
          {passwordInvalid && <p className="form-text text-danger text-capitalize">Password must contain at least 8 letter password, with at least a symbol, upper and lower case letters and a number</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirmation" className="form-label">
            Password Confirmation
          </label>
          <input type="password" disabled={isLoading} value={passwordConfirm} onChange={passwordConfirmChangeHandler} onBlur={passwordConfirmBlurHandler} name="passwordConfirmation" id="passwordConfirmation" className="form-control" />
          {passwordConfirmInvalid && <p className="form-text text-danger text-capitalize">Password must contain at least 8 letter password, with at least a symbol, upper and lower case letters and a number</p>}
          {password !== passwordConfirm && <p className="form-text text-danger text-capitalize">Password Confirmation do not match</p>}
        </div>
        <div className="mb-3">{formSubmitButton}</div>
      </form>
      <div className="my-3 text-center">
        <span>
          {`Already have an account ?`} <Link to="/login">Login Now</Link>
        </span>
      </div>
    </>
  );
};

export default RegisterForm;
