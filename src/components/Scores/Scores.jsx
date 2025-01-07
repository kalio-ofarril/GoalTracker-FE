import "./Scores.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import { React, useEffect, useState, useContext } from "react";
import { CalendarContext } from "../../utils/CalendarContext";

const Scores = () => {
  const { modal, monthNumber, yearNumber, renderer, calendar } =
    useContext(CalendarContext);
  const [calendarMonth, setCalendarMonth] = calendar;

  const [monthScores, setMonthScores] = useState({});
  const [monthScore, setMonthScore] = useState("0%");

  useEffect(() => {
    let scoreObj = {};
    let monthCompleteness = 0;
    calendarMonth.forEach((week, index) => {
      let weekCompleteness = 0;
      week.forEach((day) => {
        weekCompleteness += day.completeness;
        monthCompleteness += day.completeness;
      });
      scoreObj["Week " + (index + 1)] = Math.round(weekCompleteness / 6) + "%";
    });
    setMonthScores(scoreObj);
    setMonthScore(
      Math.round(monthCompleteness / (Object.keys(scoreObj).length * 6)) + "%"
    );
  }, [calendarMonth]);

  return (
    <Container className="full-height">
      <Row>
        <Col className="scores-month-score">This Month Score: {monthScore}</Col>
      </Row>
      <Row className="scores-table-row">
        <Col>
          <Table striped bordered hover variant="dark">
            <tbody>
              {Object.keys(monthScores).map((key) => {
                return (
                  <tr>
                    <td>{key}</td>
                    <td>{monthScores[key]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Scores;
