import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

function CreateMedicineModal({
  handleClose,
  createMed,
  shopId,
  userData,
}) {

  const [medicine, SetMedicine] = useState({
    is_delete: false,
    medName: "",
    medDes: "",
    medPrice: null,
    medType: null,
    minimumQty: null,
    medShop: shopId,
    medCompany: null,
  });
  const [image, setImage] = useState(null);
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
    SetMedicine((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
  };
  // POST Medicine CALL
  const postMedicine = async (newMedicine) => {
    const requestURL = `${process.env.REACT_APP_API_URL}api/medicine/`;
    const uploadData = new FormData();
    uploadData.append("medName", newMedicine.medName);
    uploadData.append("medDes", newMedicine.medDes);
    uploadData.append("medPrice", newMedicine.medPrice);
    uploadData.append("medType", newMedicine.medType);
    uploadData.append("minimumQty", newMedicine.minimumQty);
    uploadData.append("medCompany", newMedicine.medCompany);
    uploadData.append("medShop", newMedicine.medShop);
    console.log(newMedicine);
    if (image !== null)
      uploadData.append(
        "medImage",
        image,
        image.name
      );

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
      handleClose();
      alert("New Medicine added successfully");
    } else {
      //console.log("postmedicine", data);
      console.log(data.statusText);
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
    <>
      <Modal
        show={createMed}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Create New Medicine</Modal.Title>
        </Modal.Header>
        <Form
          encType="multipart/form-data"
          onSubmit={(event) => handleSubmit(event)}
        >
          <Modal.Body>
            <Row className="my-2">
              <Col>
                {" "}
                <Form.Group>
                  {/* <Form.Label>Medicine Name</Form.Label> */}
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
                  {/* <Form.Label>Medicine Type</Form.Label> */}
                  <Form.Control
                    type="select"
                    as="select"
                    placeholder="Select Medicine Type"
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
            </Row>
            <Row className="my-2">
              <Col>
                <Form.Group>
                  {/* <Form.Label>Medicine Price</Form.Label> */}
                  <Form.Control
                    type="text"
                    placeholder="Enter Medicine Price"
                    name="medPrice"
                    value={medicine.medPrice}
                    onChange={(event) => handleInput(event)}
                    required
                  />
                  {/* <Form.Text id="medPrice-error"></Form.Text> */}
                  <Form.Control.Feedback
                    type="invalid"
                    id="medPrice-error"
                  ></Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  {/* <Form.Label>Medicine Minimum Quantity</Form.Label> */}
                  <Form.Control
                    type="number"
                    placeholder="Enter Medicine Minimum Quantity(>=1)"
                    name="minimumQty"
                    value={medicine.minimumQty}
                    onChange={(event) => handleInput(event)}
                    min={1}
                    required
                  ></Form.Control>
                  <Form.Text id="minimumQty-error"></Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <Col>
                <Form.Group>
                  {/* <Form.Label>Medicine Company</Form.Label> */}
                  <Form.Control
                    as="select"
                    type="select"
                    placeholder="Select Supplier"
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
                  {/* <Form.Label>Medicine Image</Form.Label> */}
                  <Form.Control
                    type="file"
                    accept="image/*"
                    placeholder="Enter Medicine Image (Not Required)"
                    name="medImage"
                    onChange={(e) => {const file = e.target.files[0]; setImage(file);}}
                  />
                  <Form.Text id="medImage-error"></Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <Form.Group>
                {/* <Form.Label>Medicine Description</Form.Label> */}
                <Form.Control
                  type="textarea"
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description of Medicine Here"
                  name="medDes"
                  value={medicine.medDes}
                  onChange={(event) => handleInput(event)}
                  required
                />
                <Form.Text id="medDes-error"></Form.Text>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Create Medicine
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
export default CreateMedicineModal;
