import "./ProfileUserData.css";

const ProfileUserData = () => {
  return (
    <div className="container profile-data-container">
      <h3>Profile Data</h3>
      <form class="row g-3">
        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">
            Email
          </label>
          <input type="email" class="form-control" id="inputEmail4" />
        </div>
        <div class="col-md-6">
          <label for="inputPassword4" class="form-label">
            Password
          </label>
          <input type="password" class="form-control" id="inputPassword4" />
        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">
            Description
          </label>
          <input type="text" class="form-control" id="inputAddress" />
        </div>
        <div class="col-12">
          <label for="inputAddress2" class="form-label">
            Address 2
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUserData;
