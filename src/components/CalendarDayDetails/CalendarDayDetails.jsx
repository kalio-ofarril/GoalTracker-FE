import { useEffect, useState, useContext } from "react";
import { CalendarContext } from "../../utils/CalendarContext";
import {
  getDayActivities,
  getDayData,
  createDailyEntry,
} from "../../api/calendarApi";
import Button from "react-bootstrap/Button";
import { setGoalActivities as updateGoalActivities } from "../../api/calendarApi.js";

import "./CalendarDayDetails.css";

const CalendarDayDetails = ({ dayData }) => {
  const [goalActivities, setGoalActivities] = useState([]);
  const [comments, setComments] = useState("");
  const [renderDay, setRenderDay] = useState(false);

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

            if (goalRes.data.activities == "") {
              setGoalActivities([]);
            } else {
              goalRes.data.activities.split(",").forEach((activity) => {
                let activityData = {
                  name: activity,
                  checked: dayActivities.includes(activity),
                };
                activityDataList.push(activityData);
              });
            }

            setComments(dayRes.data.comments);
            setGoalActivities(activityDataList);
          })
          .catch((res) => {
            let activityDataList = [];

            if (goalRes.data.activities == "") {
              setGoalActivities([]);
            } else {
              goalRes.data.activities.split(",").forEach((activity) => {
                let activityData = {
                  name: activity,
                  checked: false,
                };
                activityDataList.push(activityData);
              });
            }

            setComments("");
            setGoalActivities(activityDataList);
          });
      })
      .catch((res) => {
        setComments("");
        setGoalActivities([]);
      });
  }, [dayData, showModal, renderDay]);

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
    //setGoalActivities(newChecked);
    let dayDataObj = {
      userId: localStorage.userId,
      activityDate: new Date(dayData),
      comments: comments,
    };
    let activities = "";
    newChecked.forEach((activity) => {
      if (activity.checked) {
        activities += activity.name + ",";
      }
    });
    activities = activities.substring(0, activities.length - 1);
    dayDataObj.activities = activities;
    createDailyEntry(dayDataObj)
      .then((res) => {
        setGoalActivities(newChecked);
        setRender(render ? false : true);
      })
      .catch((res) => {
        console.log(res);
      });
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

  const deleteActivity = (event) => {
    let newActivities = "";
    goalActivities.forEach((act) => {
      if (act.name != event) {
        newActivities += act.name + ",";
      }
    });
    newActivities = newActivities.substring(0, newActivities.length - 1);

    let dataObj = {
      userId: localStorage.userId,
      activityDate: new Date(new Date(dayData).toDateString()),
      activities: newActivities,
      isDelete: true,
    };

    let goalActivityArray = [dataObj];
    updateGoalActivities(goalActivityArray)
      .then((res) => {
        setRenderDay(renderDay == true ? false : true);
        saveActivities();
      })
      .catch((res) => {
        console.log(res);
      });
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
                    <div
                      className="row activity-checkbox-div"
                      key={activity.name}
                      style={{
                        backgroundColor: "#" + activity.name.split("#")[1],
                      }}
                    >
                      <div className="col-4">
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
                      </div>
                      <div className="col-4">
                        <label className="form-check-label calendar-day-activity-label">
                          {activity.name.split("#")[0]}
                        </label>
                      </div>
                      <div className="col-4 calendar-day-detail-btn-container">
                        <Button
                          variant="danger"
                          className="calenday-day-detail-delete-activity-btn"
                          onClick={(event) => {
                            deleteActivity(activity.name);
                          }}
                        >
                          <i className="bi bi-trash3-fill calenday-day-detail-delete-activity-btn-icon"></i>
                        </Button>
                      </div>
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
