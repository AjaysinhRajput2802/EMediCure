import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const StaffMember = ({
  userData,
  updateUserData,
  shopList,
  updateShopList,
}) => {
  const { shopId } = useParams();

  // USE STATES
  const [staffMember, setStaffMember] = useState({
    staffName: "",
    mobileNo: "",
    salary: null,
    medShop: shopId,
  });
  const [staffMemberList, setStaffMemberList] = useState([]);

  // List API CALL
  const fetchStaffMemberList = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/staffMember/?medShop=${shopId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userData.access}`,
        },
      }
    ).catch((e) => {
      console.log(e);
    });
    const data = await response.json();
    if (response.status >= 200 && response.status < 300) {
      setStaffMemberList(data);
    } else {
      alert(response.statusText);
    }
  };
  // DELETE API CALL
  const deleteStaffMember = async (staffMemberId) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/staffMember/${staffMemberId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userData.access}`,
        },
      }
    ).catch((e) => {
      console.log(e);
    });

    if (response.status == 204) {
      alert("staffMember deleted succesfully");
    } else {
      let data = await response.json();
      alert(response.status);
      console.log(data);
    }
  };
  // ADD API CALL
  const postStaffMember = async (newStaffMember) => {
    const response = await fetch("http://127.0.0.1:8000/api/staffMember/", {
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
    } else {
      let data = await response.json();

      if (data.staffName) {
        document.getElementById("staffName-error").innerHTML =
          data["staffName"];
      }
      if (data.mobileNo) {
        document.getElementById("mobileNo-error").innerHTML = data["mobileNo"];
      }
      if (data.salary) {
        document.getElementById("salary-error").innerHTML = data["salary"];
      }
    }
  };

  // FORM HANDLE
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(staffMember);
    postStaffMember(staffMember);
  };
  // INPUT HANDLE
  const handleInput = (e) => {
    setStaffMember((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // DELETE HANDLE
  const handleDelete = (id) => {
    deleteStaffMember(id);
  };

  useEffect(
    () => {
      fetchStaffMemberList();
    },
    [staffMemberList],
    [userData]
  );
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Row>
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
                    placeholder="Employee Contact Number"
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
              <Row className="text-center p-3">
                <Button type="submit">Create StaffMember</Button>
              </Row>
            </Form>
          </Col>

          <Col>
            <Table>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Contact Details</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody>
                {staffMemberList.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.staffName}</td>
                      <td>{item.mobileNo}</td>
                      <td>₹ {item.salary}</td>
                      <td>
                        <Button
                          variant="danger "
                          className="bg-danger"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StaffMember;
