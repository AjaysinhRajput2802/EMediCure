import React from "react";
import { useState, useEffect, useNavigate } from "react";

import { Row, Modal, Form, Button} from "react-bootstrap";

function CreateMedShopModal({
  handleMedShopClose,
  createMedShop,
  setMedShop,
  userData,
}) {
  const [medical, SetMedical] = useState({
    shopName: "",
    shopContactNo: "",
    shopAddress: "",
    shopOwner: "",
    shopSupervisor: null,
  });

  // FORM SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(medical);
    postMedical(medical);
  };

  // Handle Input
  const handleInput = (e) => {
    SetMedical((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    document.getElementById("shopContactNo-error").innerHTML = "";
  };

  // POST SHOP CALL
  const postMedical = async (newMedical) => {
    newMedical.shopOwner = userData.user.id;
    const response = await fetch("http://127.0.0.1:8000/api/medical/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.access}`,
      },

      body: JSON.stringify(newMedical),
    }).catch((e) => console.log(e));
    if (response.status === 201) {
      let data = await response.json();
      console.log("postmedical", data);
      handleMedShopClose();
      window.location.reload();
    } else {
      let data = await response.json();
      console.log("postmedical", data);
      if (data.shopContactNo) {
        document.getElementById("shopContactNo-error").innerHTML =
          data["shopContactNo"];
      }
    }
  };

  return (
    <>
      <Modal
        show={createMedShop}
        onHide={handleMedShopClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Create New Store</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <Modal.Body>
            <Row className="my-1">
              <Form.Group>
                {/* <Form.Label>Store Name</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Shop Name"
                  name="shopName"
                  value={medical.shopName}
                  onChange={(event) => handleInput(event)}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="my-1">
              <Form.Group>
                {/* <Form.Label>Store Contact No</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Mobile Number"
                  name="shopContactNo"
                  value={medical.shopContactNo}
                  onChange={(event) => handleInput(event)}
                  required
                />
                <Form.Text id="shopContactNo-error"></Form.Text>
              </Form.Group>
            </Row>
            <Row className="my-1">
              <Form.Group>
                {/* <Form.Label>Store address</Form.Label> */}
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  placeholder="Enter Shop Address"
                  name="shopAddress"
                  value={medical.shopAddress}
                  onChange={(event) => handleInput(event)}
                  required
                />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Create Store
            </Button>
            <Button variant="danger" onClick={handleMedShopClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
export default CreateMedShopModal;
