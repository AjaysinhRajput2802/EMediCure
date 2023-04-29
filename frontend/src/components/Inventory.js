import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Inventory.css";
import searchIcon from "../images/search-icon.svg";
import MedicineDetailsModal from "./MedicineDetailsModal";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button, Row, Col } from "react-bootstrap";
const Inventory = ({ userData, updateUserData, shopList, updateShopList }) => {
  const [detailsShow, setdetailsShow] = useState({ show: false, data: [] });
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

  const handleDetailsClose = () => {
    setdetailsShow({ show: false, data: [] });
  };
  const handleDetailsShow = (show, data) =>
    setdetailsShow({ show: show, data: data });

  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
    // console.log(userData);
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
      <MedicineDetailsModal
        handleDetailsClose={handleDetailsClose}
        detailsShow={detailsShow}
      />
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
      <div className="container">
        <div className="row">
          {currentShopStock.length ? (
            currentShopStock.map((medicine) => {
              return (
                <>
                  <Card key={medicine.id} className="m-3  medCard">
                    <div className="row align-items-center p-1">
                      <div className="col-5 ">
                        <Card.Img src={medicine.medImage} />
                      </div>
                      <div className="col-7 text-center">
                        <p className="mb-1">
                          {medicine.medName} | {medicine.medType}
                        </p>
                        <p className="m-1">
                          {" "}
                          Price : &#8377; {medicine.medPrice}
                        </p>
                        <p className="m-1">Supplier : {medicine.medCompany}</p>
                        <p className="m-1">
                          {" "}
                          Stock :{medicine.currentQuantity}
                        </p>
                        <Button
                          onClick={() => {
                            handleDetailsShow(true, medicine);
                          }}
                          className="mb-2"
                        >
                          details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </>
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
