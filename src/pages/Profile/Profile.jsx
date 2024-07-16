import "./Profile.css";

import ProfileUserData from "../../components/ProfileUserData/ProfileUserData";
import { useAuth } from "../../hooks/AuthProvider";

const Profile = () => {
  const auth = useAuth();

  return (
    <div className="container appPage">
      <div className="row justify-content-center profile-content-container">
        <div className="col-4 profile-component-container">
          <div className="row">
            <h1>UserName</h1>
          </div>
          <div className="row">
            <i className="bi bi-person-circle profile-user-picture"></i>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => auth.logOut()}
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="col-8 profile-component-container">
          <div className="row">
            <ProfileUserData />
          </div>
          <div className="row">
            <div id="acquisitions"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
