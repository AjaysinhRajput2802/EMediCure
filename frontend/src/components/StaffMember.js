import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";

const StaffMember = ({
  userData,
  updateUserData,
  shopList,
  updateShopList,
}) => {
  const { shopId } = useParams();
  const [staffMember, setStaffMember] = useState({
    staffName: "",
    mobileNo: "",
    salary: null,
    medShop: shopId,
  });

  const [staffMemberList, setStaffMemberList] = useState([]);

  const fetchStaffMemberList = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/staffMember/?medShop=${shopId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
  const postStaffMember = async (newStaffMember) => {
    const response = await fetch("http://127.0.0.1:8000/api/staffMember/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStaffMember),
    }).catch((e) => {
      console.log(e);
    });

    if (response.status >= 200 && response.status < 300) {
      let data = await response.json();
      console.log(data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(staffMember);
    postStaffMember(staffMember);
  };

  const handleInput = (e) => {
    setStaffMember((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchStaffMemberList();
  }, [userData]);
  return (
    <>
      <Form onSubmit={(event) => handleSubmit(event)}>
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
        <Button type="submit">Create StaffMember</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Contact Details</th>
            <th scope="col">Salary</th>
          </tr>
        </thead>
        {staffMemberList.map((item, index) => {
          return (
            <tr key={index + 1}>
              <td>{item.staffName}</td>
              <td>{item.mobileNo}</td>
              <td>₹ {item.salary}</td>
            </tr>
          );
        })}
        <tbody></tbody>
      </Table>
    </>
  );
};

export default StaffMember;
