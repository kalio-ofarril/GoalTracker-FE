const MonthBreakdown = () => {
  return (
    <div className="row align-items-center detail-holder-bottom">
      <div className="col-12">
        <div className="row align-items-center">
          <div className="col-12">
            <h3>Month Breakdown</h3>
          </div>
        </div>
        <div className="row align-items-cente">
          <div className="col-12">
            <label className="form-label">Filter by:</label>
            <select
              id="activitySelectFilter"
              className="activitySelectFilter"
              aria-label="Default select example"
            >
              <option defaultValue={"All"}>All</option>
              <option value="Gym">Gym</option>
              <option value="Diet">Diet</option>
              <option value="Practice">Practice</option>
              <option value="Learning">Learning</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthBreakdown;
