import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Inventory.css";
import searchIcon from "../images/search-icon.svg";
import CreateMedicine from "./CreateMedicine";

const Inventory = ({ userData, updateUserData, shopList, updateShopList }) => {
  const [currentShopStock, setCurrentShopStock] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { shopId } = useParams();

  const fetchInventory = async (e) => {
    console.log(shopId);
    const response = await fetch(
      `http://127.0.0.1:8000/api/medicine/?medShop=${shopId}`,
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
    if (userData === null || userData.user === null) navigate("/login");
    console.log(userData);
  }, [shopId]);

  const filterMedicine = async () => {
    console.log(shopId);

    const response = await fetch(
      `http://127.0.0.1:8000/api/medicine/?medShop=${shopId}&search=${searchTerm}`,
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
    <div>
      <div>
        <CreateMedicine shopId={shopId} userData={userData} />
      </div>
      <div className="Wrapper">
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
      <div className="container">
        <div className="row">
          {currentShopStock.length ? (
            currentShopStock.map((medicine) => {
              return (
                <div
                  className="col-xs-12 col-md-6 bootstrap snippets bootdeys"
                  key={medicine.id}
                >
                  <div className="product-content product-wrap clearfix">
                    <div className="row">
                      <div className="col-md-5 col-sm-12 col-xs-12">
                        <div className="product-image">
                          <img
                            src={medicine.medImage}
                            height="250px"
                            width="257px"
                            alt="medicinePhoto"
                            className="img-responsive"
                          />
                        </div>
                      </div>
                      <div className="col-md-7 col-sm-12 col-xs-12">
                        <div className="product-deatil">
                          <h5 className="name">
                            <a href="/">
                              {medicine.medName} <span>{medicine.medType}</span>
                            </a>
                          </h5>
                          <p className="price-container">
                            <span>&#8377;{medicine.medPrice}</span>
                          </p>
                          <span className="tag1"></span>
                        </div>
                        <div className="description">
                          <p>{medicine.medDes}</p>
                        </div>
                        <div className="product-info smart-form">
                          <a href="/" className="btn btn-success">
                            Details
                          </a>
                          <span style={{ float: "right", margin: "0px auto" }}>
                            Quantity: {medicine.currentQuantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h1>No Data Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
