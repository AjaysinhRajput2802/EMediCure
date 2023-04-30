import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const CreateMedicine = ({ userData, shopId }) => {
  // MedShop State
  const [medicine, SetMedicine] = useState({
    is_delete: false,
    medName: "",
    medDes: "",
    medPrice: null,
    medType: null,
    minimumQty: null,
    medShop: shopId,
    medCompany: null,
    medImage: null,
  });

  const [companyList, SetCompanyList] = useState([]);

  const typeList = ["Tablet", "Capsule", "Liquid", "Cream", "Patche", "Other"];

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(medicine);
    let flag = true;
    if (Number(medicine.medPrice) <= 0.0) {
      flag = false;
      document.getElementById("medPrice-error").innerHTML =
        "Price can not be zero or negative...";
    }
    if (Number(medicine.minimumQty) <= 0) {
      flag = false;
      document.getElementById("minimumQty-error").innerHTML =
        "Minimum Quantity can not be zero or negative...";
    }
    if (flag) postMedicine(medicine);
  };

  // Handle Input
  const handleInput = (e) => {
    if ([e.target.name] === "medImage") {
      SetMedicine((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      SetMedicine((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // POST Medicine CALL
  const postMedicine = async (newMedicine) => {
    const requestURL = `${process.env.REACT_APP_API_URL}api/medicine/`;
    const uploadData = new FormData();
    uploadData.append("medName", medicine.medName);
    uploadData.append("medDes", medicine.medDes);
    uploadData.append("medPrice", medicine.medPrice);
    uploadData.append("medType", medicine.medType);
    uploadData.append("minimumQty", medicine.minimumQty);
    uploadData.append("medCompany", medicine.medCompany);
    uploadData.append("medShop", medicine.medShop);
    uploadData.append("medImage", medicine.medImage, medicine.medImage.name);

    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userData.access}`,
      },
      body: uploadData,
    }).catch((e) => console.log(e));

    let data = await response.json();

    if (response.status === 201) {
      console.log("postmedicine", data);
      window.location.reload();
    } else {
      console.log("postmedicine", data);
      //   data.map((item)=>{
      //     let fields = item
      //     document.getElementById()
      //   })
    }
  };

  const fetchCompanyList = async (e) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/company/?medShop=${shopId}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      SetCompanyList(data);
    } else {
      alert(response.statusText);
    }
  };

  useEffect(() => {
    fetchCompanyList();
  }, []);
  return (
    <div>
      <Form
        encType="multipart/form-data"
        onSubmit={(event) => handleSubmit(event)}
      >
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Medicine Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Medicine Name"
                name="medName"
                value={medicine.medName}
                onChange={(event) => handleInput(event)}
                required
              />
              <Form.Text id="medName-error"></Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Medicine Type</Form.Label>
              <Form.Control
                type="select"
                as="select"
                placeholder="Enter Medicine Type"
                name="medType"
                value={medicine.medType}
                onChange={(event) => handleInput(event)}
                required
              >
                <option value="">Select Type of Medicine</option>
                {typeList.map((m) => {
                  return (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Medicine Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Medicine Price"
                name="medPrice"
                value={medicine.medPrice}
                onChange={(event) => handleInput(event)}
                required
              />
              <Form.Text id="medPrice-error"></Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <Form.Group>
              <Form.Label>Medicine Image</Form.Label>
              <Form.Control
                type="file"
                accept="Image"
                placeholder="Enter Medicine Image"
                name="medImage"
                onChange={(event) => handleInput(event)}
              />
              <Form.Text id="medImage-error"></Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Medicine Company</Form.Label>
              <Form.Control
                as="select"
                type="select"
                placeholder="Enter Medicine Company"
                name="medCompany"
                value={medicine.medCompany}
                onChange={(event) => handleInput(event)}
                required
              >
                <option value="">Select Company</option>
                {companyList.map((m) => {
                  return (
                    <option key={m.id} value={m.id}>
                      {m.companyName}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Medicine Minimum Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Medicine Minimum Quantity"
                name="minimumQty"
                value={medicine.minimumQty}
                onChange={(event) => handleInput(event)}
                required
              ></Form.Control>
              <Form.Text id="minimumQty-error"></Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Medicine Description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Description Name"
                name="medDes"
                value={medicine.medDes}
                onChange={(event) => handleInput(event)}
                required
              />
              <Form.Text id="medDes-error"></Form.Text>
            </Form.Group>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Create Store
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateMedicine;
