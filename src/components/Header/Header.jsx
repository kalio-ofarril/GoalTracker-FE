import React from "react";

import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container text-center header">
        <div className="row">
          <div className="col nameHeaderContainer">
            <Link to="/">
              <p className="nameHeader">GoalTracker</p>
            </Link>
          </div>
          <div className="col bi-profile-container">
            <Link to="/profile">
              <i className="bi bi-person-square bi-profile"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
