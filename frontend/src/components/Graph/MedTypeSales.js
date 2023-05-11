import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import Button from "react-bootstrap/Button";
const MedTypeSales = ({ shopId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchTypeSales();
  }, []);

  const fetchTypeSales = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/graph/medTypeSales/${shopId}/`,
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
    } else {
      console.log(response);
    }
  };

  return (
    <>
      <div style={{ "text-align": "center" }}>
        <Button
          style={{
            color: "white",
            backgroundColor: "#3ce646",
            border: "none",
          }}
        >
          Medicine TypeWise Sales Chart
        </Button>
      </div>
      {data.length !== 0 ? (
        <ResponsiveContainer width="100%" height="100%" aspect={3}>
          <BarChart
            width={50}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="type"
              interval={"preserveStartEnd"}
              tick={{ fill: "white" }}
              tickLine={{ stroke: "white" }}
              stroke="white"
            >
              <Label
                value="Medicine Types"
                offset={0}
                position="insideBottom"
                fill="white"
              />
            </XAxis>
            <YAxis
              dataKey="amount"
              interval={"preserveStartEnd"}
              tick={{ fill: "white" }}
              tickLine={{ stroke: "white" }}
              stroke="white"
            >
              <Label
                value="Medicine Sales Amount (₹)"
                offset={0}
                position="insideLeft"
                fill="white"
                angle="-90"
              />
            </YAxis>
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="amount" fill="#3ce646" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center mb-5">Data is not availabel!</div>
      )}
    </>
  );
};

export default MedTypeSales;
