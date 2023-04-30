import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const BillForm = ({ userData, updateUserData, shopId, fetchBills }) => {
  //  STATE FOR BILL FORM
  const [Allbillitem, setAllbillitem] = useState([
    { medName: "", quantity: "" },
  ]);
  const [customer, setcustomer] = useState("");
  const [currentMed, setCurrentMed] = useState([]);

  const navigate = useNavigate();

  // LOGIN REQUIRED
  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login-register");
  }, []);

  if(typeof(userData)=="string")
    userData=JSON.parse(userData);

  // GET MEDICINE API CALL
  const fetchMedicine = async (e) => {
    //const shopId = 1;
    if (shopId === 0) {
      setCurrentMed([]);
      return;
    }
    console.log("Here ", shopId);
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
    if (values.length !== 1) {
      values.splice(index, 1);
      setAllbillitem(values);
    }
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
  }, [userData, shopId]);

  return (
    <Container className="pt-3">
      <h3 style={{ color: "#5e9693" }}>Create </h3>
      <h3 style={{ color: "#fff" }}> New Bill</h3>

      <Form onSubmit={(event) => handleSubmit(event)}>
        {Allbillitem.length > 0 && (
          <>
            <Row className="mb-2 mt-3">
              <Form.Group>
                {/* <Col>
                  <Form.Label>Customer Name :</Form.Label>
                </Col> */}

                <Form.Control
                  type="text"
                  name="custName"
                  placeholder="Customer Full Name"
                  value={customer}
                  onChange={(e) => setcustomer(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            {Allbillitem.map((field, index) => (
              <Fragment key={index}>
                <Row className="my-1">
                  {/* <Col>Bill Item {index + 1}</Col> */}
                  <Col xs={5} className="justify text-center">
                    <Form.Group>
                      <Form.Control
                        required
                        as="select"
                        type="select"
                        name="medName"
                        id={"med" + index}
                        onChange={(event) => handleInput(index, event)}
                      >
                        <option value="">Select Medicine</option>
                        {currentMed.map((m, index2) => {
                          return (
                            <option key={m.id} value={m.id}>
                              {m.medName}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={5} className="justify text-center">
                    <Form.Group>
                      <Form.Control
                        type="Number"
                        name="quantity"
                        placeholder="Quantity"
                        value={field.quantity}
                        onChange={(event) => handleInput(index, event)}
                        required
                        min="1"
                      />
                    </Form.Group>
                  </Col>
                  {(Allbillitem.length>1) ? (
                    <Col
                      xs={1}
                      style={{ color: "red", marginTop: "3px", width: "50px" }}
                    >
                      <h3>
                        <i
                          className="bi bi-dash-circle-fill"
                          style={{ cursor: "pointer" }}
                          variant="primary"
                          onClick={() => {
                            handleRemovebillItems(index);
                          }}
                        ></i>
                      </h3>
                    </Col>
                  ) : (
                    <></>
                  )}
                  {index + 1 === Allbillitem.length ? (
                    <Col
                      xs={1}
                      style={{ color: "aquamarine", marginTop: "3px" }}
                    >
                      <h3>
                        <i
                          className="bi bi-plus-circle-fill"
                          style={{ cursor: "pointer" }}
                          variant="primary"
                          onClick={() => {
                            handleAddbillitem();
                          }}
                        ></i>
                      </h3>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
                <Row>
                  <div id={index}></div>
                </Row>
              </Fragment>
            ))}

            <div id="form_error"> </div>
          </>
        )}
        <Row className="my-3">
          <Col className="justify text-center">
            <Button
              type="submit"
              alignment="center"
              id="submitbutton"
              style={{backgroundColor:"#10454F",border:"none"}}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default BillForm;
