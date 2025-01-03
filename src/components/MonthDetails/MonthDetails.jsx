import { useEffect } from "react";
import CalendarDayDetails from "../CalendarDayDetails/CalendarDayDetails";
import MonthBreakdown from "../MonthBreakdown/MonthBreakdown";
import "./MonthDetails.css";

const MonthDetails = (props) => {

  return (
    <div className="container text-center fullHeight">
      <CalendarDayDetails dayData={props.dayData} />
      <MonthBreakdown />
    </div>
  );
};

export default MonthDetails;
