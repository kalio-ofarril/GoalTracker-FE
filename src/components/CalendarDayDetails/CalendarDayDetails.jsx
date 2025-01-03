import { useEffect, useState, useContext } from "react";
import { CalendarContext } from "../../utils/CalendarContext";
import {
  getDayActivities,
  getDayData,
  createDailyEntry,
} from "../../api/calendarApi";

import "./CalendarDayDetails.css";

const CalendarDayDetails = ({ dayData }) => {
  const [goalActivities, setGoalActivities] = useState([]);
  const [comments, setComments] = useState("");

  const { modal, monthNumber, yearNumber, renderer } =
    useContext(CalendarContext);
  const [showModal, setShowModal] = modal;
  const [month, setMonth] = monthNumber;
  const [year, setYear] = yearNumber;
  const [render, setRender] = renderer;

  useEffect(() => {
    getDayActivities(localStorage.userId, dayData)
      .then((goalRes) => {
        getDayData(localStorage.userId, dayData)
          .then((dayRes) => {
            let dayActivities = dayRes.data.activities.split(",");
            let activityDataList = [];

            goalRes.data.activities.split(",").forEach((activity) => {
              let activityData = {
                name: activity,
                checked: dayActivities.includes(activity),
              };
              activityDataList.push(activityData);
            });

            setComments(dayRes.data.comments);
            setGoalActivities(activityDataList);
          })
          .catch((res) => {
            let activityDataList = [];
            goalRes.data.activities.split(",").forEach((activity) => {
              let activityData = {
                name: activity,
                checked: false,
              };
              activityDataList.push(activityData);
            });

            setComments("");
            setGoalActivities(activityDataList);
          });
      })
      .catch((res) => {
        setComments("");
        setGoalActivities([]);
      });
  }, [dayData, showModal]);

  const checkboxChange = (activity, event) => {
    let newChecked = [];
    goalActivities.forEach((act) => {
      let obj = {
        name: act.name,
      };
      if (act.name == activity) {
        obj.checked = event.target.checked;
      } else {
        obj.checked = act.checked;
      }
      newChecked.push(obj);
    });
    setGoalActivities(newChecked);
  };

  const commentChange = (event) => {
    setComments(event.target.value);
  };

  const saveActivities = () => {
    let dayDataObj = {
      userId: localStorage.userId,
      activityDate: new Date(dayData),
      comments: comments,
    };
    let activities = "";
    goalActivities.forEach((activity) => {
      if (activity.checked) {
        activities += activity.name + ",";
      }
    });
    activities = activities.substring(0, activities.length - 1);
    dayDataObj.activities = activities;
    createDailyEntry(dayDataObj)
      .then((res) => {
        setRender(render ? false : true);
      })
      .catch((res) => {
        console.log(res);
      });
  };

  const openGoalActivitiesModal = () => {
    setShowModal(true);
  };

  return (
    <div className="row align-items-center detail-holder-top">
      <div className="col-12 full-height">
        <div className="row align-items-center full-height">
          <form className="full-height">
            <h3 className="day-details-header">
              {new Date(dayData).toDateString()}
            </h3>
            <h6>Activities for today:</h6>
            <div className="form-check activity-checkbox-container">
              {goalActivities.length == 0 ? (
                <button
                  type="button"
                  className="btn btn-info day-details-btn add-goal-activities-month-btn"
                  onClick={openGoalActivitiesModal}
                >
                  Add Day Goal Activities
                </button>
              ) : (
                goalActivities.map((activity) => {
                  return (
                    <div className="activity-checkbox-div" key={activity.name}>
                      <input
                        className="form-check-input activity-checkbox"
                        type="checkbox"
                        value={activity.name}
                        id={activity.name}
                        key={activity.name}
                        checked={activity.checked}
                        onChange={(event) => {
                          checkboxChange(activity.name, event);
                        }}
                      />
                      <label className="form-check-label">
                        {activity.name.split("#")[0]}
                      </label>
                    </div>
                  );
                })
              )}
            </div>
            <div className="form-group activity-comments-holder">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="1"
                placeholder="Comments for this day..."
                value={comments}
                onChange={(event) => {
                  commentChange(event);
                }}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-success day-details-btn activity-save-btn"
              onClick={saveActivities}
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
