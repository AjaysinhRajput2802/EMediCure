import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";
function CreateCompanyModal({
  createCom,
  SetCom,
  shopId,
  userData,
  handleComClose,
}) {
  const [company, SetCompany] = useState({
    companyName: "",
    address: "",
    contactNumber: "",
    medShop: shopId,
  });
  const [companyList, SetCompanyList] = useState([]);

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();
    postCompany(company);
  };
  // Handle Input
  const handleInput = (e) => {
    SetCompany((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // POST Medicine CALL
  const postCompany = async (newCompany) => {
    const requestURL = "http://127.0.0.1:8000/api/company/";
    // const uploadData = new FormData();

    const response = await fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.access}`,
      },
      body: JSON.stringify(newCompany),
    }).catch((e) => console.log(e));

    let data = await response.json();

    if (response.status === 201) {
      console.log("postCompany", data);
      handleComClose();
      window.location.reload();
    } else {
      alert(data.statusText);
      console.log("postCompany", data);
    }
  };
  const fetchCompanyList = async (e) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/company/?medShop=${shopId}`,
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
        show={createCom}
        onHide={handleComClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Create New Company</Modal.Title>
        </Modal.Header>
        <Form
          encType="multipart/form-data"
          onSubmit={(event) => handleSubmit(event)}
        >
          <Modal.Body>
            <Row className="my-2">
              <Form.Group>
                {/* <Form.Label>Company Name</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder=" Company Name"
                  name="companyName"
                  value={company.companyName}
                  onChange={(event) => handleInput(event)}
                  required
                />
                <Form.Text id="companyName-error"></Form.Text>
              </Form.Group>
            </Row>
            <Row className="my-2">
              <Form.Group>
                {/* <Form.Label> Contact Number with Country code(+91) </Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Contact Number with country code like(+91)"
                  name="contactNumber"
                  value={company.contactNumber}
                  onChange={(event) => handleInput(event)}
                  required
                />
                <Form.Text id="contactNumber-error"></Form.Text>
              </Form.Group>
            </Row>
            <Row className="my-2">
              <Form.Group>
                {/* <Form.Label>Company Address</Form.Label> */}
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  placeholder="Company Address"
                  name="address"
                  value={company.address}
                  onChange={(event) => handleInput(event)}
                  required
                />
                <Form.Text id="address-error"></Form.Text>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Create Company
            </Button>
            <Button variant="danger" onClick={handleComClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
export default CreateCompanyModal;
