import { useEffect, useState } from "react";
import Calendar from "../Calendar/Calendar";
import "./Home.css";
import MonthDetails from "../../components/MonthDetails/MonthDetails";
import AddActivitiesModal from "../../components/AddActivitiesModal/AddActivitiesModal";
import { CalendarContext } from "../../utils/CalendarContext";

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [render, setRender] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState([]);

  useEffect(() => {}, [currentDate, showModal]);

  const updateCurrentDate = (day) => {
    let date = new Date(day);
    date.setDate(date.getDate() + 1);
    setCurrentDate(date.toDateString());
  };

  return (
    <>
      <CalendarContext.Provider
        value={{
          modal: [showModal, setShowModal],
          monthNumber: [month, setMonth],
          yearNumber: [year, setYear],
          renderer: [render, setRender],
          calendar: [calendarMonth, setCalendarMonth],
        }}
      >
        <AddActivitiesModal />
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
      </CalendarContext.Provider>
    </>
  );
};

export default Home;
