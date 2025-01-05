import "./CalendarDay.css";

const CalendarDay = (props) => {
  console.log(props);
  props.day.activities.map((activity) => {
    console.log(activity);
    console.log(activity.length);
  });

  const calendarStyle = {
    backgroundColor: "hsla(" + props.day.completeness + ", 100%, 60%, 1)",
  };

  return (
    <div className={`container text-center calendar-day ${props.otherMonth}`}>
      <div
        className="row calendar-day-row calendar-day-row-color"
        style={calendarStyle}
      ></div>
      <div className="row calendar-day-row">
        <div className="col-4 align-self-start">
          {props.day.activityDate.split("-")[2]}
        </div>
      </div>
      <div className="row calendar-day-row calendar-day-activity-letter-container-row">
        <div className="col-12 align-self-start calendar-day-activity-letter-container">
          {props.day.activities.map((activity) => {
            if (activity.length > 0) {
              return (
                <span
                  key={activity}
                  className="calendar-day-activity-letter"
                  style={{ backgroundColor: "#" + activity.split("#")[1] }}
                >
                  {Array.from(activity)[0].toUpperCase()}
                </span>
              );
            }
          })}
        </div>
      </div>
      <div className="row calendar-day-row calendar-day-completeness">
        <div className="col-4 align-self-start calendar-day-completeness-col">
          {props.day.completeness == "" ? "" : props.day.completeness + "%"}
        </div>
      </div>
    </div>
  );
};

export default CalendarDay;
