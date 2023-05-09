import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

// Bootstrap import
import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";

// module import

import Sales from "./Graph/Sales";
import Purchase from "./Graph/Purchase";
import MedicineSales from "./Graph/MedicineSales";
import MedicinePurChase from "./Graph/MedicinePurchase";
import MedTypeSales from "./Graph/MedTypeSales";

const Reports = ({ userData, updateUserData }) => {
  const { shopId } = useParams();
  const [medList, setMedList] = useState([]);
  const [medName, setMedName] = useState("");
  useEffect(() => {
    fetchMedicineList();
  }, []);
  const fetchMedicineList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/medicine/?medShop=${shopId}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      setMedList(data);
    } else {
      let data = await response.json();
      console.log(data);
    }
  };
  const handleInput = (e) => {
    console.log(e.target.value);
    setMedName(e.target.value);
    console.log(medName);
  };

  return (
    <Carousel
      style={{
        color: "aquamarine",
        backgroundColor: "#506266",
        padding: "20px",
        borderRadius: "10px",
        margin: "150px 25px 25px 25px",
      }}
      interval={null}
      controls={false}
    >
      <Carousel.Item>
        {/* <Row className="justify-content-center">General Sales Chart <Button></Button></Row> */}
        <Sales shopId={shopId} />
      </Carousel.Item>

      <Carousel.Item>
        {/* <Row className="justify-content-center">General Purchase Chart</Row> */}
        <Purchase shopId={shopId} />
      </Carousel.Item>

      <Carousel.Item>
        {/* <Row className="justify-content-center">Medicine Sales Chart</Row> */}
        <MedicineSales medList={medList} />
      </Carousel.Item>

      <Carousel.Item>
        {/* <Row className="justify-content-center">Medicine Purchase Chart</Row> */}
        <MedicinePurChase medList={medList} />
      </Carousel.Item>

      <Carousel.Item>
        {/* <Row className="justify-content-center">
          Medicine TypeWise Sales Chart
        </Row> */}
        <MedTypeSales shopId={shopId} />
      </Carousel.Item>
    </Carousel>
  );
};

export default Reports;
