import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import Container from "react-bootstrap/Container";

import CreateMedShopModal from "./CreateMedShopModal";
import AssignSupervisorModal from "./AssignSupervisorModal";

const Dashboard = ({
  userData,
  updateUserData,
  shopList,
  updateShopList,
  updateShopId,
}) => {
  const navigate = useNavigate();
  if (typeof userData == "string") userData = JSON.parse(userData);

  // LOGIN REQUIRED
  useEffect(() => {
    if (userData === null || userData.user === null)
      navigate("/login-register");
  }, []);

  // -------- USE STATES ------
  const [show, setShow] = useState(false);
  const [inputData, setinputData] = useState({
    email: "",
    medshopid: "",
  });

  const [createMedShop, setMedShop] = useState(false);

  // -------- USE EFFECTS ------

  useEffect(() => {
    fetchShopList();
  }, [userData]);

  useEffect(() => {
    updateShopId(0);
  },[shopList]);

  // -------- API CALLING FUNCTIONS ------

  const fetchShopList = async () => {
    try {
      console.log(userData);
      const role = userData.user.profile.role;
      console.log(role);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/medical/?shop${role}=${userData.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((e) => console.log(e));
      if (response.status === 200) {
        let data = await response.json();
        //console.log(data);
        updateShopList(data);
      } else {
        alert(response.statusText);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // -------- HELPER FUNCTIONS ------

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMedShopClose = () => setMedShop(false);
  const handleMedShopShow = () => setMedShop(true);

  const gotoShop = (id) => {
    let shopId = id;
    console.log(shopId);
    updateShopId(shopId);
    navigate(`/inventory/${shopId}`);
  };

  const assignButton = (shopid) => {
    setinputData((prevData) => ({
      ...prevData,
      medshopid: shopid,
    }));
    handleShow();
  };

  // -------- RETURN STATEMENTS ------
  return (
    <Container>
      <br />
      <div className="row">
        {shopList.map((shop) => {
          return (
            <div className="col-sm-6" key={shop.id}>
              <div className="card">
                <div className="card-body">
                  <div
                    className="text-center mb-2"
                    style={{
                      backgroundColor: "#005E54",
                      maxWidth: "15rem",
                      minHeight: "2.5rem",
                      margin: "2px auto",
                      borderRadius: "5px",
                    }}
                  >
                    <h4 className="card-title pt-1">{shop.shopName}</h4>
                  </div>
                  <p className="card-text">
                    <i className="bi bi-pin-map"></i> {shop.shopAddress}
                  </p>
                  <p className="card-text">
                    <i className="bi bi-phone"> {shop.shopContactNo} </i>
                  </p>
                  <p className="card-text">
                    <i className="bi bi-shop"></i> {shop.shopOwner}
                  </p>
                  <div className="row">
                    <div className="col mt-1">
                      <p className="card-text">
                        <i className="bi bi-person-square"></i>{" "}
                        {shop.shopSupervisor}
                      </p>
                    </div>
                    {userData.user.profile.role === "Owner" ? (
                      <div className="col-sm-9">
                        <AssignSupervisorModal
                          userData={userData}
                          show={show}
                          handleClose={handleClose}
                          inputData={inputData}
                          setinputData={setinputData}
                        />

                        <button
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => {
                            assignButton(shop.id);
                          }}
                        >
                          Assign new Supervisor
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="d-flex justify-content-end mt-2 me-4">
                    <button
                      onClick={() => gotoShop(shop.id)}
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "#45C4B0",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Goto Shop
                    </button>
                  </div>
                </div>
              </div>
              <br />
            </div>
          );
        })}

        {userData.user.profile.role === "Owner" ? (
          <>
            <CreateMedShopModal
              userData={userData}
              setMedShop={setMedShop}
              createMedShop={createMedShop}
              handleMedShopClose={handleMedShopClose}
            />
            <div
              className="card bg-transparent mb-3 col-sm-6"
              style={{ border: "0mm" }}
            >
              <i
                className="btn bi bi-plus-square-fill"
                id="addCard"
                onClick={() => {
                  handleMedShopShow(true);
                }}
              ></i>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
