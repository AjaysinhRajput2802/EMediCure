import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Tab,
  FormGroup,
} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

const BillForm = ({ userData, updateUserData, shopId, fetchBills }) => {
  
  //  STATE FOR BILL FORM
  const [Allbillitem, setAllbillitem] = useState([
    { medName: "", quantity: "" },
  ]);
  const [customer, setcustomer] = useState('');
  const [currentMed, setCurrentMed] = useState([]);

  const navigate = useNavigate();
  // LOGIN REQUIRED
  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
  }, []);

  // GET MEDICINE API CALL
  const fetchMedicine = async (e) => {
    //const shopId = 1;
    if (shopId === 0) {
      setCurrentMed([]);
      return;
    }
    console.log("Here ",shopId);
    const response = await fetch(
      `http://127.0.0.1:8000/api/medicine/?medShop=${shopId}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      // console.log(data)
      setCurrentMed(data);
    } else {
      alert(response.statusText);
      console.log(response);
    }
  };

  // POST BILL API CALL
  const postBill = async (input_billitem, input_custName) => {
    if (shopId === 0) {
       return;
    }
    const response = await fetch("http://127.0.0.1:8000/api/bill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medShop: shopId,
        custName: input_custName,
        BillItems: input_billitem,
      }),
    }).catch((e) => console.log(e));

    let data = await response.json();

    if (response.status >= 200 && response.status < 300) {
      console.log(data);
      alert("Bill Created SuccessFully.");
      window.location.reload();
    } else {
      console.log(data);
      if (data.Outofstock_error) {
        let ind = [];
        for (let i = 0; i < Allbillitem.length; i++) {
          ind.push(true);
        }

        data.Outofstock_error.map((field, index) => {
          Object.keys(field).map((key, i) => {
            ind[key] = false;
            document.getElementById(key).innerHTML = field[key];
          });
        });

        for (let i = 0; i < Allbillitem.length; i++) {
          if (ind[i]) {
            document.getElementById(i).innerHTML = "";
          }
        }
      }
    }
  };

  const handleAddbillitem = () => {
    const values = [...Allbillitem];
    values.push({
      medName: "",
      quantity: "",
    });
    setAllbillitem(values);
  };

  const handleRemovebillItems = (index) => {
    const values = [...Allbillitem];
    values.splice(index, 1);
    setAllbillitem(values);
  };

  const handleInput = (index, event) => {
    const values = [...Allbillitem];
    const updatedValue = event.target.name;

    document.getElementById(index).innerHTML = "";

    values[index][updatedValue] = event.target.value;
    setAllbillitem(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postBill(Allbillitem, customer);
    fetchBills();
  };

  useEffect(() => {
    fetchMedicine();
  }, [userData,shopId]);

  return (
    <>
      <Container>
        <h3>Create New Bill</h3>

        <Form onSubmit={(event) => handleSubmit(event)}>
          <Container>
            <Row>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="custName"
                  placeholder="Customer Name"
                  value={customer}
                  onChange={(e) => setcustomer(e.target.value)}
                  required={true}
                />
              </Form.Group>
            </Row>
          </Container>

          <Container>
            {Allbillitem.length > 0 && (
              <>
                {Allbillitem.map((field, index) => (
                  <Row key={index}>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          required={true}
                          as="select"
                          type="select"
                          name="medName"
                          id={"med" + index}
                          onChange={(event) => handleInput(index, event)}
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
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="quantity"
                          placeholder="Quantity"
                          value={field.quantity}
                          onChange={(event) => handleInput(index, event)}
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Button
                        className="mb-3"
                        variant="secondary"
                        onClick={() => handleRemovebillItems(index)}
                      >
                        Cancel
                      </Button>
                    </Col>
                    <div id={index}></div>
                  </Row>
                ))}
                <Row>
                  <Col>
                    <Button
                      variant="primary"
                      type="submit"
                      alignment="center"
                      id="submitbutton"
                      className="justify-content-md-center"
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      onClick={() => handleAddbillitem()}
                      className="justify-content-md-center"
                    >
                      Add New Bill Item
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <div id="form_error"> </div>
                </Row>
              </>
            )}
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default BillForm;
