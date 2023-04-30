import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import CreateMedicineModal from "./CreateMedicineModal";
import CreateCompanyModal from "./CreateCompanyModal";
import "./StockForm.css";

const StockForm = ({
  userData,
  shopId,
  createMed,
  setMed,
  handleShow,
  handleClose,
  createCom,
  SetCom,
  handleComShow,
  handleComClose
}) => {
  const [currentMed, setCurrentMed] = useState([]);
  const [currentCompany, setCurrentCompany] = useState([]);
  const [Stock, setStock] = useState({
    orderedQuantity: "",
    currentQuantity: "",
    price: "",
    arrivalDate: "",
    expiryDate: "",
    medName: "",
    companyName: "",
    medShop: "",
  });

  const fetchMedicine = async (e) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/medicine/?medShop=${shopId}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    let data = await response.json();
    if (response.status === 200) {
      setCurrentMed(data);
    } else {
      alert(response.statusText);
      console.log(data);
    }
  };

  const fetchCompany = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/company/?medShop=${shopId}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    let data = await response.json();
    if (response.status === 200) {
      setCurrentCompany(data);
    } else {
      alert(response.statusText);
      console.log(data);
    }
  };

  const postStock = async (input_stock) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/stockItem/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input_stock),
    }).catch((e) => {
      console.log(e);
    });

    let data = await response.json();
    if (response.status >= 200 && response.status < 300) {
      console.log(data);
      alert("Stock Added SuccessFully.");
      window.location.reload();
    } else {
      alert(response.statusText);
      //console.log(data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Stock);
    postStock(Stock);
  };

  const handleInput = (e) => {
    let stockdata = Stock;
    stockdata[e.target.name] = e.target.value;

    stockdata["medShop"] = shopId;

    if (e.target.name === "medName") {
      const chosenMedicine = currentMed.find((med) => {
        return med.id === Number(e.target.value);
      });
      stockdata["price"] = chosenMedicine.medPrice;
      stockdata["medName"] = Number(e.target.value);
    }

    if (e.target.name === "orderedQuantity") {
      stockdata["currentQuantity"] = Number(e.target.value);
      stockdata["orderedQuantity"] = Number(e.target.value);
    }

    if (e.target.name === "companyName") {
      stockdata["companyName"] = Number(e.target.value);
    }

    setStock((prevStock) => ({
      ...prevStock,
      stockdata
    }));
    // console.log(Stock);
  };

  useEffect(() => {
    fetchMedicine();
    fetchCompany();
  }, [userData]);

  useEffect(() => {
    fetchMedicine();
  },[createMed]);

  useEffect(() => {
    fetchCompany();
  }, [createCom]);

  return (
    <Container className="pt-3">
      <Row>
        <h3 style={{ color: "#5e9693"}}>Add </h3>
        <h3 style={{ color: "#fff" }}> New Stock</h3>
      </Row>
      <Form
        className="stockform"
        style={{ color: "aquamarine", backgroundColor:"#506266", padding:"20px", borderRadius:"10px"}}
      >
        <Row className="justify-content-center pt-2 pb-1">
          <Col xs="8" className="justify-content-center">
            <Form.Group as={Row} className="mb-3">
              <Form.Label className="filter" column sm={4}>
                Medicine
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  required
                  as="select"
                  type="select"
                  name="medName"
                  id="medName"
                  onChange={(event) => handleInput(event)}
                >
                  <option value="">Select Medicine</option>
                  {currentMed.map((m) => {
                    return (
                      <option key={m.id} value={m.id}>
                        {m.medName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Ordered Quantity
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  required
                  type="number"
                  name="orderedQuantity"
                  placeholder="a number > 0"
                  value={Stock.orderedQuantity}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                  min={1}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Medicine Expiry Date
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  required
                  type="date"
                  name="expiryDate"
                  value={Stock.expiryDate}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Supplier Name
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  required
                  as="select"
                  type="select"
                  name="companyName"
                  id="companyName"
                  onChange={(event) => handleInput(event)}
                >
                  <option value="">Select Supplier</option>
                  {currentCompany.map((c, index) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.companyName}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
                Stock Arrival Date
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  required
                  type="datetime-local"
                  name="arrivalDate"
                  value={Stock.arrivalDate}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                ></Form.Control>
              </Col>
            </Form.Group>
            <div className="text-center">
            <Button type="submit" className="mt-2" style={{backgroundColor:"#10454F",border:"none"}} onClick={(e)=>handleSubmit(e)}>Submit</Button>
            </div>
          </Col>
          <Col xs={1}>
            <h3>
              <CreateMedicineModal
                userData={userData}
                shopId={shopId}
                createMed={createMed}
                handleClose={handleClose}
              />
              <i
                className="bi bi-plus-circle-fill"
                variant="primary"
                style={{cursor:"pointer"}}
                onClick={() => {
                  handleShow(true);
                }}
              ></i>
            </h3>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h3>
              <CreateCompanyModal
                userData={userData}
                shopId={shopId}
                createCom={createCom}
                handleComClose={handleComClose}
              />
              <i
                className="bi bi-plus-square-fill"
                style={{cursor:"pointer"}}
                variant="primary"
                onClick={() => {
                  handleComShow(true);
                }}
              ></i>
            </h3>
          </Col>
        </Row>
      </Form>

    </Container>
  );
};

export default StockForm;
