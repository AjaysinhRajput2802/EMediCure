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

  // -------- USE STATES ------

  const [show, setShow] = useState(false);
  const [inputData, setinputData] = useState({
    email: "",
    medshopid: "",
  });

  const [createMedShop, setMedShop] = useState(false);

  // -------- USE EFFECTS ------

  useEffect(()=>{
    updateShopId(0);
  });

  useEffect(() => {
    fetchShopList();
  }, [userData]);

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
                  <h5 className="card-title">{shop.shopName}</h5>
                  <p className="card-text">{shop.shopAddress}</p>
                  <p className="card-text">
                    shop contact : {shop.shopContactNo}
                  </p>
                  <p className="card-text">Owner : {shop.shopOwner}</p>
                  <div className="row">
                    <div className="col">
                      <p className="card-text">
                        Supervisor : {shop.shopSupervisor}
                      </p>
                    </div>
                    {userData.user.profile.role === "Owner" ? (
                      <div className="col-sm-6">
                        <AssignSupervisorModal
                          userData={userData}
                          show={show}
                          handleClose={handleClose}
                          inputData={inputData}
                          setinputData={setinputData}
                        />

                        <button
                          className="btn btn-outline-dark"
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

                  <button
                    onClick={() => gotoShop(shop.id)}
                    className="btn btn-primary"
                  >
                    Goto Shop
                  </button>
                </div>
              </div>
              <br />
            </div>
          );
        })}

        {/* {userData.user.profile.role === "Owner" ? ( */}
        <CreateMedShopModal
          userData={userData}
          setMedShop={setMedShop}
          createMedShop={createMedShop}
          handleMedShopClose={handleMedShopClose}
        />
        <div className="card bg-transparent mb-3 col-sm-6">
        <div
          className="btn text-light"
          onClick={() => {
            handleMedShopShow(true);
          }}
          >
            <i class="bi bi-plus-circle"></i>
            Create New Store
          </div>
        </div>
        </div>
        {/* ) : <></>} */}
    </Container>
  );
};

export default Dashboard;
