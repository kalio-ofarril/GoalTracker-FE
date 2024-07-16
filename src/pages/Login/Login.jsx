import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";

import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    console.log(input);
    console.log(e);
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input);
      return;
    }
    alert("pleae provide a valid input");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              </div>
              <button
                className="btn btn-success day-details-btn login-btn"
                onClick={handleSubmitEvent}
              >
                Login
              </button>
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
