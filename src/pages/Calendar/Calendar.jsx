import "./Calendar.css";

import { useEffect } from "react";
import { useState } from "react";
import CalendarDay from "../../components/CalendarDay/CalendarDay";
import { getCalendarData } from "../../api/calendarApi";
import { Link, useNavigate } from "react-router-dom";

const Calendar = ({ updateDate }) => {
  const [month, setMonth] = useState("July");
  const [year, setYear] = useState("2024");
  const [calendarMonth, setCalendarMonth] = useState([]);
  const [calendarData, setCalendarData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    createCalendarMonth();
  }, []);

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Function to generate the calendar
  const createCalendarMonth = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    let monthDayCounter = 1;

    let monthArray = [];
    let week1 = [];

    for (let i = 0; i < dayone; i++) {
      week1.push("");
    }
    while (week1.length < 7) {
      week1.push(monthDayCounter);
      monthDayCounter++;
    }

    monthArray.push(week1);

    while (monthDayCounter < lastdate) {
      let weekDayCounter = 0;
      let week = [];
      while (weekDayCounter < 7) {
        if (monthDayCounter > lastdate) {
          week.push("");
        } else {
          week.push(monthDayCounter);
        }

        weekDayCounter++;
        monthDayCounter++;
      }
      monthArray.push(week);
    }

    let cData = getCalendarData();

    setCalendarData(cData);

    monthArray.forEach((week) => {
      week.forEach((day, index) => {
        if (
          cData[year.toString()][month.toString()][day.toString()] ==
            undefined ||
          day == ""
        ) {
          let dayData = {
            activities: [],
            completeness: day == "" ? "" : 0,
            day: day,
          };
          week[index] = dayData;
        } else {
          let dayData = {
            ...cData[year.toString()][month.toString()][day.toString()],
            day: day,
          };
          week[index] = dayData;
        }
      });
    });

    setCalendarMonth(monthArray);
    setMonth(months[month]);
  };

  // const updateCurrentDate = (day, month, year) => {
  //   console.log(day);
  //   console.log(month);
  //   console.log(year);
  //   //<Link to={`/?day=${day}&month=${month}&year=${year}`} />;
  // };

  return (
    <div className="calendar-container">
      <div className="container text-center">
        <div className="row align-items-center">
          <p className="col-12 calendar-date-header">{month + " " + year}</p>
        </div>
        <div className="row justify-content-between">
          <div id="calendar-prev" className="col-1">
            <i className="bi bi-caret-left-square-fill bi-calendar-month-selector"></i>
          </div>
          <div id="calendar-next" className="col-1">
            <i className="bi bi-caret-right-square-fill bi-calendar-month-selector"></i>
          </div>
        </div>
      </div>

      <div className="container text-center calendar-body">
        <div className="row align-items-center">
          <ul className="col-12 calendar-weekdays">
            <li key={"Sun"}>Sun</li>
            <li key={"Mon"}>Mon</li>
            <li key={"Tue"}>Tue</li>
            <li key={"Wed"}>Wed</li>
            <li key={"Thu"}>Thu</li>
            <li key={"Fri"}>Fri</li>
            <li key={"Sat"}>Sat</li>
          </ul>
        </div>
        <div className="row align-items-center">
          {calendarMonth.map((week) => {
            return (
              <ul className="calendar-dates">
                {week.map((day) => {
                  return (
                    <li
                      key={"li_" + month + "_" + day.day}
                      onClick={() => updateDate(day.day, month, year)}
                    >
                      <CalendarDay day={day} key={month + "_" + day.day} />
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
