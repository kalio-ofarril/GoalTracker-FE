import { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import "./Home.css";
import MonthDetails from "../../components/MonthDetails/MonthDetails";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    console.log("Start Home");
  }, [currentDate]);

  const updateCurrentDate = (day, month, year) => {
    console.log(day);
    console.log(month);
    console.log(year);
    setCurrentDate(day + "-" + month + "-" + year);
  };

  return (
    <div className="container text-center appPage">
      <div className="row align-items-center calendar-holder-row">
        <div className="col-12 order-sm-1 col-md-8 order-md-2 calendar-holder">
          <Calendar updateDate={updateCurrentDate} />
        </div>
        <div className="col-12 order-sm-2 col-md-4 order-md-1 month-details-holder">
          <MonthDetails dayData={currentDate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
