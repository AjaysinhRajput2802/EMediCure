import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const BillForm = ({ userData, updateUserData, fetchBills }) => {
  const [Allbillitem, setAllbillitem] = useState([
    { medName: "", quantity: "" },
  ]);
  const [currentMed, setCurrentMed] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
  }, []);

  const fetchMedicine = async (e) => {
    const shopId = 1;
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
    if (response.status === 200) {
      let data = await response.json();
      // console.log(data)
      setCurrentMed(data);
    } else {
      alert(response.statusText);
      console.log(response);
    }
  };

  const postBill = async (e) => {
    const shopId = 1;
    // if (shopId === "none") {
    //   setCurrentBill([]);
    //   return;
    //   }
    // console.log(shopId);
    const response = await fetch("http://127.0.0.1:8000/api/bill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        medShop: shopId,
        BillItems: e,
      }),
    }).catch((e) => console.log(e));

    let data = await response.json();

    if (response.status >= 200 && response.status < 300) {
      let data = await response.json();
      console.log(data);
      alert("Bill Created SuccessFully.");
    } else {
      console.log(data)
      if(data.Outofstock_error){

        let ind=[]
        for(let i=0; i<Allbillitem.length; i++){
          ind.push(true);
        }

        data.Outofstock_error.map((field, index) => {
          Object.keys(field).map((key, i) => {
            ind[key] = false;
            document.getElementById(key).innerHTML = field[key];
          })
        })

        for(let i=0; i<Allbillitem.length; i++){
          if(ind[i]){
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
    postBill(Allbillitem);
    fetchBills();
  };

  useEffect(() => {
    fetchMedicine();
  }, [userData]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="dynamic-form-headings">
          <h3>Create New Bill</h3>
          <Button variant="primary" onClick={() => handleAddbillitem()}>
            Add New Bill Item
          </Button>
        </Col>
        <Col xs="12">
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Row className="justify-content-center">
              {Allbillitem.length > 0 && (
                <>
                  {Allbillitem.map((field, index) => (
                    <Col xs="4">
                      <div>
                        <h4> Bill Item {index + 1}</h4>
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
                            {currentMed.map((m) => {
                              return (
                                <option key={m.id} value={m.id}>
                                  {m.medName}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            name="quantity"
                            placeholder="Quantity"
                            value={field.quantity}
                            onChange={(event) => handleInput(index, event)}
                            required="true"
                          />
                        </Form.Group>
                        
                        <Button
                          variant="secondary"
                          onClick={() => handleRemovebillItems(index)}
                        >
                          Cancel
                        </Button>
                        
                        <div id={index}></div>
                      </div>
                    </Col>
                  ))}
                  <Row xs="6">
                    <Button
                      variant="primary"
                      type="submit"
                      alignment="center"
                      id="submitbutton"
                    >
                      Submit
                    </Button>
                  </Row>{" "}
                  <div id="form_error"> </div>
                </>
              )}
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default BillForm;
