import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import React from "react";
import { useState } from "react";

const CreateMedShop = ({ userData }) => {
  // MedShop State
  const [medical, SetMedical] = useState({
    shopName: "",
    shopContactNo: "",
    shopAddress: "",
    shopOwner: userData.user.id,
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}api/medical/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.access}`,
      },
      body: JSON.stringify({
        ...newMedical,
      }),
    }).catch((e) => console.log(e));
    if (response.status === 201) {
      let data = await response.json();
      console.log("postmedical", data);

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
    <div>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Form.Group>
          <Form.Label>Store Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Shop Name"
            name="shopName"
            value={medical.shopName}
            onChange={(event) => handleInput(event)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Store Contact No</Form.Label>
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
        <Form.Group>
          <Form.Label>Store address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Shop Address"
            name="shopAddress"
            value={medical.shopAddress}
            onChange={(event) => handleInput(event)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Store
        </Button>
      </Form>
    </div>
  );
};

export default CreateMedShop;
