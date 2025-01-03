import axios from "axios";

const getMonthData = async (userId, month, year) => {
  return await axios.get(
    `${
      import.meta.env.VITE_GOAL_TRACKER_BE_URL
    }/calendar/getMonthData?userId=${userId}&monthNumber=${month}&yearNumber=${year}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

const getDayActivities = async (userId, date) => {
  date = date == "" ? new Date() : new Date(date);
  return await axios.get(
    `${
      import.meta.env.VITE_GOAL_TRACKER_BE_URL
    }/calendar/getDayActivities?userId=${userId}&month=${
      date.getMonth() + 1
    }&year=${date.getFullYear()}&day=${date.getDate()}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

const setGoalActivities = async (activityArray) => {
  return await axios.post(
    `${import.meta.env.VITE_GOAL_TRACKER_BE_URL}/calendar/setActivities`,
    activityArray,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

const getDayData = async (userId, date) => {
  date = date == "" ? new Date() : new Date(date);
  return await axios.get(
    `${
      import.meta.env.VITE_GOAL_TRACKER_BE_URL
    }/calendar/getDayData?userId=${userId}&month=${
      date.getMonth() + 1
    }&year=${date.getFullYear()}&day=${date.getDate()}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

const createDailyEntry = async (dayData) => {
  return await axios.post(
    `${import.meta.env.VITE_GOAL_TRACKER_BE_URL}/calendar/createDailyEntry`,
    dayData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
};

export {
  getMonthData,
  getDayActivities,
  setGoalActivities,
  getDayData,
  createDailyEntry,
};
