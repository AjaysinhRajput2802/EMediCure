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
  };

  useEffect(() => {
    fetchMedicine();
  }, [userData,shopId]);

  return (
      <Container>
        <Row className="justify-content-center">
        <Col className="dynamic-form-headings">
          <h3>Create New Bill</h3>
          <Button variant="primary" onClick={() => handleAddbillitem()}>
            Add New Bill Item
          </Button>
        </Col>

        <Form onSubmit={(event) => handleSubmit(event)}>
          <Col xs="12">
            <Row className="justify-content-center">
              {Allbillitem.length > 0 && (
                <>
                  <Form.Group>
                    <Row className="justify-content-center">
                        <Form.Label column sm="2">Customer Name :</Form.Label>
                        <Col xs="6">
                          <Form.Control
                          type="text"
                          name="custName"
                          placeholder="Customer Full Name"
                          value={customer}
                          onChange={(e) => setcustomer(e.target.value)}
                          required
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  {Allbillitem.map((field, index) => (
                    <Col xs="4" key={index}>
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
                            {currentMed.map((m, index2) => {
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
                            type="Number"
                            name="quantity"
                            placeholder="Quantity"
                            value={field.quantity}
                            onChange={(event) => handleInput(index, event)}
                            required
                            min="1"
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
                  <Row xs="6" className="justify-content-center">
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
          </Col>
        </Form>
        </Row>
      </Container>
  );
};

export default BillForm;
