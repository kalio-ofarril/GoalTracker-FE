import "./Header.css";

import React from "react";
import { useNavigate } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import { useAuth } from "../../hooks/AuthProvider";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate("/");
  };

  return (
    <>
      <div className="container text-center header">
        <div className="row">
          <div className="col nameHeaderContainer" onClick={homeHandler}>
            <i className="bi bi-calendar2-range-fill header-logo"></i>
            {/* <Link to="/"> */}
            <p className="nameHeader">GoalTracker</p>
            {/* </Link> */}
          </div>
          <div className="col bi-profile-container">
            {/* <Link to="/profile"> */}
            <Dropdown>
              <Dropdown.Toggle className="header-dropdown-btn">
                <i className="bi bi-person-square bi-profile"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => auth.logOut()}>
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
