import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, FormGroup } from "react-bootstrap";

const StockForm = ({ userData }) => {
  const [currentMed, setCurrentMed] = useState([]);
  const [currentCompany, setCurrentCompany] = useState([]);
  const [Stock, setStock] = useState(
    {
      orderedQuantity: "",
      currentQuantity: "",
      price: "",
      arrivalDate: "",
      expiryDate: "",
      medName: "",
      companyName: "",
      medShop: "",
    },
  );

  const shopId = 1;
  const fetchMedicine = async (e) => {
    // if (shopId === "none") {
    // setCurrentBill([]);
    // return;
    // }
    // console.log(shopId);
    const response = await fetch(
      `http://127.0.0.1:8000/api/medicine/?medShop=${shopId}`,
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

  const fetchCompany = async (e) => {
    // if (shopId === "none") {
    // setCurrentBill([]);
    // return;
    // }
    // console.log(shopId);
    const response = await fetch(
      `http://127.0.0.1:8000/api/company/?medShop=${shopId}`,
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
    const response = await fetch("http://127.0.0.1:8000/api/stockItem/", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        input_stock
      ),
    }).catch((e)=>{console.log(e)});

    let data = await response.json();
    if (response.status >= 200 && response.status < 300) {
      console.log(data);
      alert("Stock Added SuccessFully.");
      // window.location.reload();
    }
    else{
      alert(response.statusText);
      console.log(data);
    }
  } ;


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Stock);
    postStock(Stock);
  };

  const handleInput = (e) => {
    let stockdata = Stock;
    stockdata[e.target.name] = e.target.value;
    
    stockdata['medShop'] = shopId
    
    if(e.target.name === 'medName'){
      const chosenMedicine = currentMed.find((med)=>{return (med.id === Number(e.target.value))});
      stockdata['price'] = chosenMedicine.medPrice;
      stockdata['medName'] = Number(e.target.value);
    }

    if(e.target.name === 'orderedQuantity'){
      stockdata['currentQuantity'] = Number(e.target.value);
      stockdata['orderedQuantity'] = Number(e.target.value);
    }
    
    if(e.target.name === 'companyName'){
      stockdata['companyName'] = Number(e.target.value);
    }

    setStock(prevStock => ({
      ...prevStock,
      [e.target.name]:e.target.value
    }));
    // console.log(Stock);
  };

  useEffect(() => {
    fetchMedicine();
    fetchCompany();
  }, [userData]);

  return (
    <Container>
      <Row className="justify-content-center">
        <h3>Add New Stock</h3>
      </Row>

      REMAINING TASK : <br/>
       medname in table should be a link to relevant medicine detail<br/>
       add medname bubtton<br/>
       add supplier bubtton<br/>
       add medicine functionality <br/>
       add Supplier functionality <br/>
       add Medical Shop functionality <br/>
       Supervisor detail page <br/>
       staff detail page <br/>
       go to shop link<br/>

      <Form onSubmit={(event) => handleSubmit(event)}>
        <Row className="justify-content-center">
          <Col xs="6">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>
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
              <Form.Label column sm={5}>
                Ordered Quantity
              </Form.Label>
              <Col sm={7}>
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
              <Form.Label column sm={5}>
                Medicine Expiry Date
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  required
                  type="date"
                  name="expiryDate"
                  value={Stock.expiryDate}
                  onChange={(e) => {
                    handleInput(e);
                  }}
                >
                </Form.Control>
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
              <Form.Label column sm={5}>
                Stock Arrival Date
              </Form.Label>
              <Col sm={7}>
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
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default StockForm;
