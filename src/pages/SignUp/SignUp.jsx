import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";

import "./SignUp.css";

const SignUp = () => {
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
              <button
                className="btn btn-success day-details-btn signup-btn"
                onClick={handleSubmitEvent}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
