import React from 'react'
import { useState } from "react";

import { Row, Button, Modal, Form } from 'react-bootstrap';

const StaffMemberModal = ({show, handleClose, shopId}) => {

   // USE STATE
   const [staffMember, setStaffMember] = useState({
      staffName: "",
      mobileNo: "",
      salary: null,
      medShop: shopId,
    }); 

    

   // ADD API CALL
  const postStaffMember = async (newStaffMember) => {
   const response = await fetch(`${process.env.REACT_APP_API_URL}api/staffMember/`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       // Authorization: `Bearer ${userData.access}`,
     },
     body: JSON.stringify(newStaffMember),
   }).catch((e) => {
     console.log(e);
   });

   if (response.status >= 200 && response.status < 300) {
     alert("stafff Added SuccessFully.");
     handleClose();
   } else {
     let data = await response.json();

     if (data.staffName) {
       document.getElementById("staffName-error").innerHTML = data["staffName"];
     }
     if (data.mobileNo) {
       document.getElementById("mobileNo-error").innerHTML = data["mobileNo"] ;
     }
     if (data.salary) {
       document.getElementById("salary-error").innerHTML = data["salary"];
     }
   }
 };

   // INPUT HANDLE
   const handleInput = (e) => {
      setStaffMember((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      }));

      document.getElementById("staffName-error").innerHTML = "";
      document.getElementById("mobileNo-error").innerHTML = "";
      document.getElementById("salary-error").innerHTML = "";
   };

    // FORM HANDLE
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(staffMember);
      postStaffMember(staffMember);
   };


  return (
      <Modal
         show={show}
         onHide={handleClose}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         backdrop="static"
         keyboard={false}
         centered
      >
         <Modal.Header>
         <Modal.Title>Add New Staff Member</Modal.Title>
         </Modal.Header>
            <Form onSubmit={(event) => handleSubmit(event)}>
            <Modal.Body>
            <Row className="my-1">
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee Name"
                    name="staffName"
                    value={staffMember.staffName}
                    onChange={(event) => handleInput(event)}
                    id="staffName"
                    required
                  />
                  <Form.Text id="staffName-error"></Form.Text>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Employee Contact Number with country code like +91"
                    name="mobileNo"
                    value={staffMember.mobileNo}
                    onChange={(event) => handleInput(event)}
                    id="mobileNo"
                    required
                  />
                  <Form.Text id="mobileNo-error"></Form.Text>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Employee Salary"
                    name="salary"
                    value={staffMember.salary}
                    onChange={(event) => handleInput(event)}
                    id="salary"
                    min={0}
                  />
                  <Form.Text id="salary-error"></Form.Text>
                </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Create Member
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
  )
}

export default StaffMemberModal