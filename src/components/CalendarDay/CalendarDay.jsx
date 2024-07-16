import "./CalendarDay.css";

const CalendarDay = (props) => {
  const calendarStyle = {
    backgroundColor: "hsla(" + props.day.completeness + ", 100%, 60%, 1)",
  };

  return (
    <div className="container text-center calendar-day">
      <div
        className="row calendar-day-row calendar-day-row-color"
        style={calendarStyle}
      ></div>
      <div className="row calendar-day-row">
        <div className="col-4 align-self-start">{props.day.day}</div>
      </div>
      <div className="row calendar-day-row">
        <div className="col-4 align-self-start">
          {props.day.activities.map((activity) => {
            return <span>{Array.from(activity)[0].toUpperCase()}</span>;
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
