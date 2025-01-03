import "./Calendar.css";

import { useEffect, useState, useContext } from "react";
import CalendarDay from "../../components/CalendarDay/CalendarDay";
import { getMonthData } from "../../api/calendarApi";
import { useNavigate } from "react-router-dom";
import { CalendarContext } from "../../utils/CalendarContext";

const Calendar = ({ updateDate }) => {
  const [monthName, setMonthName] = useState();

  const { modal, monthNumber, yearNumber, renderer, calendar } =
    useContext(CalendarContext);
  const [showModal, setShowModal] = modal;
  const [month, setMonth] = monthNumber;
  const [year, setYear] = yearNumber;
  const [render, setRender] = renderer;
  const [calendarMonth, setCalendarMonth] = calendar;

  useEffect(() => {
    createCalendarMonth();
  }, [month, year, render]);

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

  const subtractMonth = () => {
    if (month == 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const addMonth = () => {
    if (month == 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const createCalendarMonth = () => {
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let monthDayCounter = 1;

    let monthDatesArray = [];
    let week1Dates = [];
    let nextMonthDates;

    let firstDay = new Date(year, month, 1);
    let lastMonthDates = new Date(year, month, 1);
    lastMonthDates.setDate(lastMonthDates.getDate() - dayone);

    if (firstDay.getMonth() == 11) {
      nextMonthDates = new Date(year + 1, 0, 1);
    } else {
      nextMonthDates = new Date(year, month + 1, 1);
    }

    for (let i = 0; i < dayone; i++) {
      week1Dates.push(new Date(lastMonthDates));
      lastMonthDates.setDate(lastMonthDates.getDate() + 1);
    }
    while (week1Dates.length < 7) {
      week1Dates.push(new Date(firstDay));
      firstDay.setDate(firstDay.getDate() + 1);
      monthDayCounter++;
    }
    monthDatesArray.push(week1Dates);

    while (monthDayCounter < lastdate) {
      let weekDayCounter = 0;
      let weekDates = [];
      while (weekDayCounter < 7) {
        if (monthDayCounter > lastdate) {
          weekDates.push(new Date(nextMonthDates));
          nextMonthDates.setDate(nextMonthDates.getDate() + 1);
        } else {
          weekDates.push(new Date(firstDay));
          firstDay.setDate(firstDay.getDate() + 1);
        }
        weekDayCounter++;
        monthDayCounter++;
      }
      monthDatesArray.push(weekDates);
    }

    getMonthData(localStorage.userId, month + 1, year).then((res) => {
      let calendarMonthData = [];
      let calendarData = {};

      monthDatesArray.forEach((week) => {
        week.forEach((day) => {
          if (res.data.length != 0) {
            res.data.forEach((resDay) => {
              let dayData = new Date(resDay.activityDate);
              dayData.setDate(dayData.getDate() + 1);
              dayData = dayData.toDateString();
              if (dayData == day.toDateString()) {
                resDay.activities = resDay.activities.split(",");
                resDay.completeness =
                  (resDay.activities.length /
                    resDay.goalActivities.split(",").length) *
                  100;
                resDay.otherMonth =
                  month + 1 == resDay.activityDate.split("-")[1]
                    ? ""
                    : "other-month-day";
                calendarData[day.toDateString()] = resDay;
              } else {
                if (!(day.toDateString() in calendarData)) {
                  calendarData[day.toDateString()] = {
                    activityDate: formatDate(day.toDateString()),
                    activities: [],
                    comments: "",
                    completeness: 0,
                    otherMonth:
                      month + 1 == formatDate(day.toDateString()).split("-")[1]
                        ? ""
                        : "other-month-day",
                  };
                }
              }
            });
          } else {
            calendarData[day.toDateString()] = {
              activityDate: formatDate(day.toDateString()),
              activities: [],
              comments: "",
              completeness: 0,
              otherMonth:
                month + 1 == formatDate(day.toDateString()).split("-")[1]
                  ? ""
                  : "other-month-day",
            };
          }
        });
      });

      monthDatesArray.forEach((week) => {
        let calendarWeekData = [];
        week.forEach((day) => {
          calendarWeekData.push(calendarData[day.toDateString()]);
        });
        calendarMonthData.push(calendarWeekData);
      });
      setCalendarMonth(calendarMonthData);
    });

    setMonthName(months[month]);
    setYear(year);
  };

  const openGoalActivitiesModal = () => {
    setShowModal(true);
  };

  return (
    <div className="calendar-container">
      <div className="container text-center">
        <div className="row align-items-center calendar-header-row">
          <p className="col-sm-12 col-md-8 calendar-date-header">
            {monthName + " " + year}
          </p>
          <span className="col-sm-12 col-md-4 calendar-date-btn-header">
            <button
              type="button"
              className="btn btn-info day-details-btn add-goal-activities-calendar-btn"
              onClick={openGoalActivitiesModal}
            >
              Add Goal Avtivities
            </button>
          </span>
        </div>
        <div className="row justify-content-between">
          <div
            id="calendar-prev"
            className="col-1 calendar-month-change-btn-left"
          >
            <i
              className="bi bi-caret-left-square-fill bi-calendar-month-selector"
              onClick={subtractMonth}
            ></i>
          </div>
          <div
            id="calendar-next"
            className="col-1 calendar-month-change-btn-right"
          >
            <i
              className="bi bi-caret-right-square-fill bi-calendar-month-selector"
              onClick={addMonth}
            ></i>
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
          {calendarMonth.map((week, index) => {
            return (
              <ul className="calendar-dates" key={"ul_" + index}>
                {week.map((day) => {
                  return (
                    <li
                      key={"li_" + day.activityDate}
                      onClick={() => updateDate(day.activityDate)}
                    >
                      <CalendarDay
                        day={day}
                        key={day.activityDate}
                        otherMonth={day.otherMonth}
                      />
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
