import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const auth = useAuth();
  const input = useRef({
    email: "",
    password: "",
  });

  const clientId =
    "804166899931-r8b6q1k4h1c9mhtdg3jau1pdpf7sqm83.apps.googleusercontent.com";

  const handleInput = (e) => {
    const { name, value } = e.target;
    input.current[name] = value;
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.current.email !== "" && input.current.password !== "") {
      let response = auth.loginAction(input.current);
      return;
    }
    alert("pleae provide a valid input");
  };

  const onSuccess = (res) => {
    const decoded = jwtDecode(res.credential);
    if (decoded.email_verified) {
      auth.loginGoogleAction(decoded.email);
    }
    return;
  };

  const onFailure = (res) => {
    console.log("Fail");
    const decoded = jwtDecode(res.credential);
  };

  return (
    <div className="appPage login-page">
      <div className="container login-container">
        <div className="row">
          <div className="col login-header">
            <h1>Login</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <form>
              <div className="form-control login-form">
                <div className="row justify-content-center login-form-row">
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
                <div className="row justify-content-center login-form-row">
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
                <div className="row justify-content-center login-form-row">
                  <div className="login-error-msg">{auth.error}</div>
                </div>
              </div>
              <div className="login-buttons-container">
                <button
                  className="btn btn-success day-details-btn login-btn"
                  onClick={handleSubmitEvent}
                >
                  Login
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
                  Don't have an account yet? Sign up{" "}
                  <Link to="/signup">here</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
