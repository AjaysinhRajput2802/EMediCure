import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import './Alerts.css';

const Alerts = ({ userData, updateUserData, shopList, updateShopList }) => {
  const navigate = useNavigate();
  const { shopId } = useParams();
  
  // USE-STATES
  const [currentShopStock, setCurrentShopStock] = useState([]);

  // USE-EFFECTS
  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login-register");
    if (shopId != 0) fetchInventory();
  }, []);

  // API CALLS
  const fetchInventory = async (e) => {
    console.log(shopId);

    const response = await fetch(
      `http://127.0.0.1:8000/api/medicine/?medShop=${shopId}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    console.log(response);
    if (response.status === 200) {
      let data = await response.json();
      const alertMeds = data.filter((medicine) => {
        return medicine.currentQuantity < medicine.minimumQty;
      });
      console.log(alertMeds);
      setCurrentShopStock(alertMeds);
    } else {
      alert(response.statusText);
    }
  };


  

  // RETURN STATEMENT

  return (
    <div>
      <div className="container mt-3">
        <div className="d-flex flex-row" id="flex-basis">
          {currentShopStock.length ? (
            currentShopStock.map((medicine) => {
              return (
                <>
                  <Card
                    key={medicine.id}
                    className="m-3 alertCard"
                  >
                    <div className="row align-items-center p-3">
                      <div className="col-5">
                        <Card.Img
                          src={medicine.medImage}
                          height="120px"
                          width="140px"
                        />
                      </div>
                      <div className="col-7">
                        <p className="m-1" id="medDetails">
                          {medicine.medName}
                        </p>
                        <p className="m-1" id="medDetails">
                          {medicine.medType}
                        </p>
                        <p className="m-1" id="medDetails">
                          {" "}
                          Price : &#8377; {medicine.medPrice}
                        </p>
                        <p className="m-1" id="medDetails">
                          {" "}
                          Stock : {medicine.currentQuantity}
                        </p>
                        <p className="m-1" id="medDetails" style={{color:"red"}}>
                          {" "}
                          Minimum Required : {medicine.minimumQty}
                        </p>
                      </div>
                    </div>
                  </Card>
                </>
              );
            })
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{width:"100vw", height:"40vh"}}>
              <h1 style={{ color: "white" }}>No Alerts Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
