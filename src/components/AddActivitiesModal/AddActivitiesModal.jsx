import "./AddActivitiesModal.css";

import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { CalendarContext } from "../../utils/CalendarContext.jsx";
import { setGoalActivities } from "../../api/calendarApi.js";

const AddActivitiesModal = () => {
  const [goalsArray, setGoalsArray] = useState([1]);
  const [validated, setValidated] = useState(false);

  const { modal } = useContext(CalendarContext);
  const [showModal, setShowModal] = modal;

  let colors = ["#8cb369", "#f4e285", "#f4a259", "#00afb9", "#bc4b51"];

  const addActivity = () => {
    setGoalsArray([...goalsArray, goalsArray.length + 1]);
  };

  const formInput = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      let startDate = new Date(event.target[1].value);
      startDate.setDate(startDate.getDate() + 1);
      let endDate = new Date(event.target[2].value);
      endDate.setDate(endDate.getDate() + 1);

      console.log(event);

      let activities = "";
      let goalActivityArray = [];
      goalsArray.forEach((goalNumber) => {
        activities =
          activities +
          event.target[3 + (2 * goalNumber - 1)].value
            .trim()
            .replace(",", ";")
            .replace("#", "") +
          event.target[3 + (2 * goalNumber - 1) + 1].value +
          ",";
      });
      activities = activities.substring(0, activities.length - 1);

      while (startDate <= endDate) {
        let dataObj = {
          userId: localStorage.userId,
          activityDate: new Date(new Date(startDate).toDateString()),
          activities: activities,
        };
        goalActivityArray.push(dataObj);
        startDate.setDate(startDate.getDate() + 1);
      }

      setGoalActivities(goalActivityArray)
        .then((res) => {
          handleClose();
          setValidated(false);
        })
        .catch((res) => {
          console.log(res);
        });
    }
  };

  const handleClose = () => {
    setGoalsArray([1]);
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={formInput}>
          <Modal.Header closeButton>
            <Modal.Title>Add Goal Activities</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Col>
                <Form.Label>From</Form.Label>
                <Form.Control required type="date" />
              </Col>
              <Col>
                <Form.Label>To</Form.Label>
                <Form.Control required type="date" />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Col>
                <Form.Label>Activities:</Form.Label>
              </Col>
              <Col className="add-activity-modal-add-activity-btn-col">
                <Button
                  variant="warning"
                  className="add-activity-modal-add-activity-btn"
                  onClick={addActivity}
                >
                  Add Activity
                  <i className="bi bi-plus-circle-fill add-activity-modal-add-activity-btn-icon"></i>
                </Button>
              </Col>
            </Form.Group>
            {goalsArray.map((index) => {
              return (
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId={"activity-text-" + index}
                  key={index}
                >
                  <Form.Label column sm="3">
                    Activity {index}
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      required
                      controlId={"activity-text-" + index}
                    />
                  </Col>
                  <Col sm="2">
                    <Form.Control
                      type="color"
                      defaultValue={colors[(index - 1) % 5]}
                      name="color"
                      title="Choose your color"
                      plaintext
                    />
                  </Col>
                </Form.Group>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddActivitiesModal;
