import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { React, useEffect, useState, useContext } from "react";
import { CalendarContext } from "../../utils/CalendarContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = (props) => {
  const [pieData, setPieData] = useState({
    labels: ["N/A"],
    datasets: [
      {
        label: "",
        data: [1],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  });

  const { modal, monthNumber, yearNumber, renderer, calendar } =
    useContext(CalendarContext);
  const [calendarMonth, setCalendarMonth] = calendar;

  useEffect(() => {
    let activities = {};

    calendarMonth.forEach((week) => {
      week.forEach((day) => {
        day.activities.forEach((activity) => {
          if (activity in activities) {
            activities[activity] += 1;
          } else {
            activities[activity] = 1;
          }
        });
      });
    });

    let colors = [];
    let labels = [];
    let data = [];
    Object.keys(activities).forEach((key) => {
      labels.push(key.split("#")[0]);
      colors.push("#" + key.split("#")[1]);
      data.push(activities[key]);
    });

    if (labels.length != 0) {
      setPieData({
        labels: labels,
        datasets: [
          {
            label: "Times done",
            data: data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      });
    } else {
      setPieData({
        labels: ["N/A"],
        datasets: [
          {
            label: "",
            data: [1],
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 0.2)"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [calendar, renderer]);

  const options = {
    plugins: {
      tooltip: {
        titleFont: {
          size: 15,
        },
        bodyFont: {
          size: 10,
        },
      },
      legend: {
        display: true,
        responsive: true,
        position: "left",
        labels: {
          boxWidth: 10,
          boxheight: 10,
          padding: 10,
          color: "white",
          font: {
            size: 15,
          },
        },
        align: "center",
      },
      maintainAspectRatio: false,
    },
  };

  return (
    <Pie data={pieData} options={options} width={"80%"} className="pie-chart" />
  );
};

export default PieChart;
