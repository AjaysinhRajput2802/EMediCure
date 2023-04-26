import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import CreateMedShop from "./CreateMedShop";

const Dashboard = ({
  userData,
  updateUserData,
  shopList,
  updateShopList,
  updateShopId,
}) => {
  const navigate = useNavigate();

  // -------- USE STATES ------

  const [show, setShow] = useState(false);

  const [inputData, setinputData] = useState({
    email: "",
    medshopid: "",
    medshopname: "",
  });

  const [postData, setpostData] = useState({
    id: "",
    profile: {
      id: "",
      role: "",
    },
  });

  // -------- USE EFFECTS ------

  // useEffect(()=>{
  //   updateShopId(0);
  // });

  useEffect(() => {
    fetchShopList();
  }, [userData]);

  useEffect(() => {
    if (postData.id !== "") {
      assignsupervisor_Update_User_MedicalShop();
      handleClose();
    }
  }, [postData]);

  // -------- API CALLING FUNCTIONS ------

  const fetchShopList = async () => {
    if (userData === null || userData.user === null) {
      navigate("/login");
      return;
    } else {
      try {
        const role = userData.user.profile.role;
        console.log(role);
        const response = await fetch(
          `http://127.0.0.1:8000/api/medical/?shop${role}=${userData.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).catch((e) => console.log(e));
        if (response.status === 200) {
          let data = await response.json();
          console.log(data);
          updateShopList(data);
        } else {
          alert(response.statusText);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const assignsupervisor_Update_User_MedicalShop = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/auth/user/${postData.id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.access}`,
        },
        body: JSON.stringify(postData),
      }
    ).catch((e) => console.log(e));
    let data = await response.json();
    console.log(data);
    if (response.status >= 200 && response.status < 300) {
      const response2 = await fetch(
        `http://127.0.0.1:8000/api/medical/${inputData.medshopid}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.access}`,
          },
          body: JSON.stringify({ shopSupervisor: postData.id }),
        }
      ).catch((e) => console.log(e));
      let data2 = await response2.json();

      if (response2.status >= 200 && response2.status < 300) {
        alert(
          `Supervisor with email : ${data.email} is assigned to Medical Shop : ${data2.shopName}`
        );
      } else {
        console.log(data2);
        alert(response2.statusText);
      }
    } else {
      console.log(data);
      alert(response.statusText);
    }
  };

  const assignsupervisor_getUserId = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/auth/user?email=${inputData.email}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.access}`,
        },
      }
    ).catch((e) => {
      console.log(e);
    });

    const data = await response.json();

    if (response.status >= 200 && response.status < 300 && data !== []) {
      setpostData((postData) => ({
        ...postData,
        id: data[0].id,
        profile: {
          ...postData.profile,
          id: data[0].profile.id,
          role: "Supervisor",
        },
      }));
    } else {
      console.log(data);
      alert(
        "User with email address is not registered. Please register the user first then assign him as Supervisor."
      );
    }
  };

  // -------- HELPER FUNCTIONS ------

  const gotoShop = (id) => {
    let shopId = id;
    console.log(shopId);
    updateShopId(shopId);
    navigate(`/inventory/${shopId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    assignsupervisor_getUserId();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // -------- RETURN STATEMENTS ------
  return (
    <>
      {/* <div>
        <CreateMedShop userData={userData} />
      </div> */}
      <div className="row">
        {shopList.map((shop) => {
          return (
            <div className="col-sm-6" key={shop.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{shop.shopName}</h5>
                  <p className="card-text">{shop.shopAddress}</p>
                  <p className="card-text">{shop.shopContactNo}</p>
                  <p className="card-text">Owner : {shop.shopOwner}</p>
                  <p className="card-text">
                    Supervisor : {shop.shopSupervisor}
                  </p>
                  <button
                    onClick={() => gotoShop(shop.id)}
                    className="btn btn-primary"
                  >
                    Goto Shop
                  </button>

                  {userData.user.profile.role === "Owner" ? (
                    <div>
                      <Button variant="primary" onClick={handleShow}>
                        Assign new Supervisor
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title> Supervisor Detail </Modal.Title>
                        </Modal.Header>
                        <Form
                          onSubmit={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          <Modal.Body>
                            <Form.Text muted>
                              Enter the email address of registered user whom
                              you want to assign Supervisor
                            </Form.Text>
                            <Form.Group className="mb-3">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                required
                                name="superemail"
                                type="email"
                                placeholder="name@example.com"
                                id="idsuperemail"
                                onChange={(e) => {
                                  setinputData((prevData) => ({
                                    ...prevData,
                                    email: e.target.value,
                                  }));
                                }}
                              />
                            </Form.Group>
                            <Form.Group>
                              <Form.Control
                                required
                                as="select"
                                type="select"
                                name="medshop"
                                id="idmedshop"
                                onChange={(e) => {
                                  setinputData((prevData) => ({
                                    ...prevData,
                                    medshopid: Number(
                                      e.target.value.substring(
                                        0,
                                        e.target.value.indexOf(" ")
                                      )
                                    ),
                                    medshopname: e.target.value.substring(
                                      e.target.value.indexOf(" ") + 1
                                    ),
                                  }));
                                }}
                              >
                                <option value="">Select Shop</option>
                                {shopList.map((s, index2) => {
                                  return (
                                    <option
                                      key={s.id}
                                      value={s.id + " " + s.shopName}
                                    >
                                      {s.shopName}
                                    </option>
                                  );
                                })}
                              </Form.Control>
                            </Form.Group>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" type="submit">
                              Save Changes
                            </Button>
                          </Modal.Footer>
                        </Form>
                      </Modal>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
