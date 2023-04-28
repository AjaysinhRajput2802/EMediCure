import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import { Container} from "react-bootstrap";

import StaffMemberModal from "./StaffMemberModal";

const StaffMember = ({
  userData,
  updateUserData,
  shopList,
  updateShopList,
}) => {
  const { shopId } = useParams();

  // USE STATES
  const [staffMemberList, setStaffMemberList] = useState([]);
  const [show, setShow] = useState(false);

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
  
  // DELETE HANDLE
  const handleDelete = (id) => {
    deleteStaffMember(id);
  };

  useEffect(() => {
      fetchStaffMemberList();
    },[staffMemberList, userData]);

    
   //HELPER FUNCTION
   const handleClose = () => {setShow(false)};
   const handleShow = () => setShow(true);
    
  return (
      <Container>
        <h3 style={{ color: "#5e9693" }}>Staff </h3>
        <h3 style={{ color: "#fff" }}>Details</h3>
        
        <StaffMemberModal show={show} handleClose={handleClose} shopId={shopId} />  
          <button className="btn btn-warning" onClick={handleShow} style={{marginTop:"-50px", float:"right"}}>
          <i class="bi bi-person-plus-fill"></i> New StaffMember
          </button>
            <Table>
              <thead style={{ color:"lightblue"}}>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Contact Details</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody style={{color:"lightgrey"}}>
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
      </Container>
  );
};

export default StaffMember;
