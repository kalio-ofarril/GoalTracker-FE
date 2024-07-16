import { useEffect, useState } from "react";
import { getMonthActivities } from "../../api/calendarApi";

import "./CalendarDayDetails.css";

const CalendarDayDetails = (props) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log(props);
    console.log(getMonthActivities());
    setActivities(getMonthActivities());
  }, [props]);

  return (
    <div className="row align-items-center detail-holder-top">
      <div className="col-12 full-height">
        <div className="row align-items-center full-height">
          <form className="full-height">
            <h3 className="day-details-header">{props.dayData}</h3>
            <h6>This month activities:</h6>
            <div className="form-check activity-checkbox-container">
              {activities.map((activity) => {
                return (
                  <div className="activity-checkbox-div">
                    <input
                      className="form-check-input activity-checkbox"
                      type="checkbox"
                      value={activity}
                      id={activity}
                    />
                    <label className="form-check-label" for={activity}>
                      {activity}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="form-group activity-comments-holder">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Comments for this day..."
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-success day-details-btn activity-save-btn"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CalendarDayDetails;
