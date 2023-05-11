import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Modal from "react-bootstrap/Modal";
// import { Calendar } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";

const MedicineSales = ({ medList }) => {
  const [data, setData] = useState([]);
  const [filData, setFilData] = useState([]);

  // useEffect(() => {
  //   fetchMedSales(medName);
  // }, []);
  const fetchMedSales = async (medName) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}graph/medSales/${medName}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let datar = await response.json();
      console.log(datar);
      setData(datar);
      setFilData(datar);
    } else {
      console.log(response);
    }
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelect = (date) => {
    console.log(date.selection.startDate);
    console.log(date.selection.endDate);
    let filterData = data.filter((item) => {
      let datearray = item.day.split("/");
      let todayDate = new Date(datearray[2], datearray[1], datearray[0]);
      console.log(todayDate);
      return (
        todayDate >= date.selection.startDate &&
        todayDate <= date.selection.endDate
      );
    });
    console.log("filter data : ", filterData);
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setFilData(filterData);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  return (
    <>
      <div>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Select Date Range </Modal.Title>
          </Modal.Header>
          <Modal.Body className="jusity-content-center">
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              rangeColors={["#3ecf8e"]}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
          <Form.Group>
            <Form.Group
              as={Row}
              className="mb-3 justify-content-center align-items-center"
            >
              <Form.Label className="filter" column sm={3}>
                <div style={{ "text-align": "center" }}>
                  <Button
                    onClick={handleShow}
                    style={{
                      color: "white",
                      backgroundColor: "#3ce646",
                      border: "none",
                    }}
                  >
                    Medicine Sales Chart
                  </Button>
                </div>
              </Form.Label>
              <Col sm={2}>
                <Form.Control
                  required
                  as="select"
                  type="select"
                  name="medName"
                  id="medName"
                  onChange={(event) => fetchMedSales(event.target.value)}
                  style={{
                    border: "2px solid white",
                    backgroundColor: "#506266",
                    color: "white",
                  }}
                >
                  <option value="">Select Medicine</option>
                  {medList.map((m) => {
                    return (
                      <option key={m.id} value={m.id}>
                        {m.medName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
          </Form.Group>
        </Form>

        {filData.length ? (
          <ResponsiveContainer
            className="my-3"
            width="100%"
            height="100%"
            aspect={3}
          >
            <LineChart
              width={400}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis
                dataKey="day"
                interval={"preserveStartEnd"}
                tick={{ fill: "white" }}
                tickLine={{ stroke: "white" }}
                stroke="white"
              >
                <Label
                  value="Date"
                  offset={0}
                  position="insideBottom"
                  fill="white"
                />
              </XAxis>
              <YAxis
                dataKey="Medicine_Sales"
                interval={"preserveStartEnd"}
                tick={{ fill: "white" }}
                tickLine={{ stroke: "white" }}
                stroke="white"
              >
                <Label
                  value="Amount (₹)"
                  offset={0}
                  position="insideLeft"
                  fill="white"
                  angle="-90"
                />
              </YAxis>
              <Tooltip />
              {/* <Legend verticalAlign="top" height={36} /> */}
              <Line
                type="monotone"
                dataKey="Medicine_Sales"
                stroke="#3ce646"
                activeDot={{ r: 8 }}
              />
              {/* <Line type="monotone" dataKey="amount" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center mb-5">
            This medicine does not contains any data in Bills
          </div>
        )}
      </div>
    </>
  );
};

export default MedicineSales;
