import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stocktable from "./Stocktable";
import StockForm from "./StockForm";
import CreateMedicineModal from "./CreateMedicineModal";
import { Button, Row, Col } from "react-bootstrap";
import CreateCompanyModal from "./CreateCompanyModal";

const Stock = ({ userData, updateUserData }) => {
  const navigate = useNavigate();
  const { shopId } = useParams();

  const [createMed, setMed] = useState(false);
  const handleClose = () => setMed(false);
  const handleShow = () => setMed(true);

  const [createCom, SetCom] = useState(false);
  const handleComClose = () => SetCom(false);
  const handleComShow = () => SetCom(true);

  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
  }, []);

  return (
    <>
      <StockForm userData={userData} shopId={shopId} />
      <br />
      <br />
      <Row className="text-center">
        <Col>
          <CreateMedicineModal
            userData={userData}
            shopId={shopId}
            createMed={createMed}
            setMed={setMed}
            handleClose={handleClose}
          />
          <Button
            variant="primary"
            onClick={() => {
              handleShow(true);
            }}
          >
            Create Medicine
          </Button>
        </Col>
        <Col>
          <CreateCompanyModal
            userData={userData}
            shopId={shopId}
            createCom={createCom}
            SetCom={SetCom}
            handleComClose={handleComClose}
          />
          <Button
            variant="primary"
            onClick={() => {
              handleComShow(true);
            }}
          >
            Create Company
          </Button>
        </Col>
      </Row>
      <br />
      <br />
      <Stocktable userData={userData} shopId={shopId} />
    </>
  );
};

export default Stock;
