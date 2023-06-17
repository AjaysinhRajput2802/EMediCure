import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Modal from "react-bootstrap/Modal";

// import { Calendar } from "react-date-range";
import { DateRangePicker } from "react-date-range";

const Sales = ({ shopId }) => {
  const [data, setData] = useState([]);
  const [filData, setFilData] = useState([]);
  useEffect(() => {
    fetchsales();
  }, []);
  const fetchsales = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}graph/sales/${shopId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let datar = await response.json();
      for (let i = 0; i < datar.length; i++) {
        let temp = datar[i];
        temp["sales"] = parseFloat(temp["sales"]);
        datar[i] = temp;
      }
      setData(datar);
      setFilData(datar);
    } else {
      console.log(response);
    }
  };

  // Date picker state

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
      <div style={{ "text-align": "center" }}>
        <Button
          onClick={handleShow}
          style={{
            color: "white",
            backgroundColor: "#3ce646",
            border: "none",
          }}
        >
          General Sales Chart
        </Button>
      </div>

      <ResponsiveContainer width="100%" height="100%" aspect={3}>
        <LineChart
          width={400}
          height={300}
          data={filData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis
            tick={{ fill: "white" }}
            tickLine={{ stroke: "white" }}
            stroke="white"
            dataKey="day"
            interval={"preserveStartEnd"}
          >
            <Label
              value="Date"
              offset={0}
              position="insideBottom"
              fill="white"
            />
          </XAxis>
          <YAxis
            tick={{ fill: "white" }}
            tickLine={{ stroke: "white" }}
            dataKey="sales"
            interval={"preserveStartEnd"}
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

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#3ce646"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default Sales;
