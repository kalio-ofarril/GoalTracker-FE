import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const auth = useAuth();
  const input = useRef({
    email: "",
    password: "",
  });
  const [error, setError] = useState(" ");

  useEffect(() => {
    setError(auth.error);
  }, [auth]);

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.current.email !== "" && input.current.password !== "") {
      auth.signUpAction(input.current);
      return;
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    input.current[name] = value;
  };

  const onSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    if (decoded.email_verified) {
      auth.signUpGoogleAction(decoded.email);
    }
    return;
  };

  const onFailure = (res) => {
    console.log("Fail");
    console.log(res);
    console.log(res.credential);
    const decoded = jwtDecode(res.credential);
    console.log(decoded);
  };

  return (
    <div className="appPage signup-page">
      <div className="container signup-container">
        <div className="row">
          <div className="col signup-header">
            <h1>Sign Up</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form>
              <div className="form-control signup-form">
                <div className="row justify-content-center signup-form-row">
                  <div className="col-2">
                    <label htmlFor="user-email">Email:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="email"
                      id="user-email"
                      name="email"
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="row justify-content-center signup-form-row">
                  <div className="col-2">
                    <label htmlFor="password">Password:</label>
                  </div>
                  <div className="col-8">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="row justify-content-center signup-form-row">
                  <div className="col-2">
                    <label htmlFor="password">Repeat Password:</label>
                  </div>
                  <div className="col-8 signup-repeat-pwd">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
              <div className="row justify-content-center login-form-row">
                <div className="login-error-msg">{error}</div>
              </div>
              <div className="login-buttons-container">
                <button
                  className="btn btn-success day-details-btn login-btn"
                  onClick={handleSubmitEvent}
                >
                  Sign Up
                </button>
                <GoogleLogin
                  className="login-btn"
                  onSuccess={onSuccess}
                  onError={onFailure}
                  // cookiePolicy={"single_host_origin"}
                  // isSignedIn={true}
                />
              </div>
            </form>
            <div className="row">
              <div className="col login-signup-link">
                <p>
                  Already have an account? Login <Link to="/login">here</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
