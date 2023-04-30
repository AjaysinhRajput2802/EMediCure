import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stocktable from "./Stocktable";
import StockForm from "./StockForm";
import { Button, Row, Col } from "react-bootstrap";

import CreateMedicineModal from "./CreateMedicineModal";
import CreateCompanyModal from "./CreateCompanyModal";

const Stock = ({ userData, updateUserData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
  }, []);
  const [currentStock, setCurrentStock] = useState([]);
  const { shopId } = useParams();

  const [createMed, setMed] = useState(false);
  const handleClose = () => setMed(false);
  const handleShow = () => setMed(true);

  const [createCom, SetCom] = useState(false);
  const handleComClose = () => SetCom(false);
  const handleComShow = () => SetCom(true);

  const fetchStock = async () => {
    console.log(shopId);

    const response = await fetch(
      `http://127.0.0.1:8000/api/stockItem/?medShop=${shopId}`,
      { method: "GET" }
    ).catch((e) => {
      console.log(e);
    });

    const data = await response.json();

    if (response.status >= 200 && response.status < 300) {
      setCurrentStock(data);
    } else {
      alert(response.statusText);
    }
  };

  const updateCurrentStock = (data) => {
    setCurrentStock(data);
  };

  useEffect(() => {
    fetchStock();
  }, [userData]);
  
  useEffect(() => {
  if (userData === null || userData.user === null) navigate("/login-register");
  }, []);

  
  return (
    <>
      <StockForm userData={userData}
      shopId={shopId}
      createMed={createMed}
      setMed={setMed}
      handleShow={handleShow}
      handleClose={handleClose}
      createCom={createCom}
      SetCom={SetCom}
      handleComShow={handleComShow}
      handleComClose={handleComClose}      />
      <br />
      <br />
      <Stocktable currentStock={currentStock} updateCurrentStock={updateCurrentStock} shopId={shopId} />
    </>
  );
};

export default Stock;
