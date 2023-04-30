import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Inventory.css";
import searchIcon from "../images/search-icon.svg";
import MedicineDetailsModal from "./MedicineDetailsModal";
import Card from "react-bootstrap/Card";
import { Fragment } from "react";

const Inventory = ({ userData, updateUserData, shopList, updateShopList }) => {
  const [detailsShow, setdetailsShow] = useState({ show: false, data: [] });
  const [currentShopStock, setCurrentShopStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { shopId } = useParams();

  if(typeof(userData)=="string")
    userData=JSON.parse(userData);

  // LOGIN REQUIRED
  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login-register");
  }, []);

  const fetchInventory = async (e) => {
    console.log(shopId);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/medicine/?medShop=${shopId}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      setCurrentShopStock(data);
    } else {
      alert(response.statusText);
    }
  };

  const handleDetailsClose = () => {
    setdetailsShow({ show: false, data: [] });
  };
  const handleDetailsShow = (show, data) =>
    setdetailsShow({ show: show, data: data });

  const filterMedicine = async () => {
    console.log(shopId);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/medicine/?medShop=${shopId}&search=${searchTerm}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      setCurrentShopStock(data);
    } else {
      alert(response.statusText);
    }
  };

  useEffect(() => {
    filterMedicine();
  }, [searchTerm]);

  return (
    <div className="pt-5">
      <MedicineDetailsModal
        handleDetailsClose={handleDetailsClose}
        detailsShow={detailsShow}
      />
      <div className="fixed-top mt-5">
      <div className="Content">
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Medicine"
          id="searchbar"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      </div>
      <div className="container mt-3">
        <div className="d-flex flex-row" id="flex-basis">
          {currentShopStock.length ? (
            currentShopStock.map((medicine) => {
              return (
                <Fragment key={medicine.id}>
                  <Card className="m-3 medCard" onClick={() => {
                    handleDetailsShow(true, medicine);
                  }} style={{cursor:"pointer"}}>
                    <div className="row align-items-center p-3">
                      <div className="col-5">
                        <Card.Img src={medicine.medImage} height="110px" width="135px" />
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
                      </div>
                    </div>
                  </Card>
                </Fragment>
              );
            })
          ) : (
            <div className="d-flex justify-content-center align-items-center" style={{width:"100vw", height:"40vh"}}>
              <h1 style={{ color: "white" }}>No Medicine Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
