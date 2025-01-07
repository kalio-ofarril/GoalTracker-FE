import "./MonthBreakdown.css";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import PieChart from "../PieChart/PieChart";
import Scores from "../Scores/Scores";

const MonthBreakdown = () => {
  return (
    <div className="row align-items-center detail-holder-bottom">
      <div className="col-12 full-height">
        <div className="row align-items-center">
          <div className="col-12">
            <h3>Month Breakdown</h3>
          </div>
        </div>
        <div className="row align-items-center monthbreakdown-tab-container">
          <div className="col-12 full-height">
            <Tabs defaultActiveKey="Pie" className="mb-3">
              <Tab eventKey="Pie" title="Pie">
                <PieChart />
              </Tab>
              <Tab eventKey="Scores" title="Scores">
                <Scores />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthBreakdown;
