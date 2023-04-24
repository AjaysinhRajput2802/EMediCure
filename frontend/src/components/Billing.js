import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BillForm from "./BillForm";
import Billtable from "./Billtable";


const Billing = ({ userData, updateUserData, shopList, updateShopList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
  }, []);

  const [currentBill, setCurrentBill] = useState([]);
  const [shopId, setShopId] = useState(0);

  const fetchBills = async (e) => {
    const Id = document.getElementById('shops').value;
    if (Id === "none") {
    setCurrentBill([]);
    setShopId(0);
    return;
    }
    console.log(Id);

    const response = await fetch(
      `http://127.0.0.1:8000/api/bill/?medShop=${Id}`,
      {
        method: "GET",
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      // console.log(data)
      setCurrentBill(data);
    } else {
      alert(response.statusText);
    }
    setShopId(Id);
  };

  useEffect(() => {
    fetchBills();
  }, [userData]);
  
  return (
    <div>
    <div>
    <label htmlFor="shops">List of Medical Shops:</label>
    <select name="" id="shops" onChange={(e) => fetchBills(e)}>
      <option value="none">Select Shop</option>
      {shopList.map((shop) => {
        return (
          <option key={shop.id} value={shop.id}>
            {shop.shopName}
          </option>
        );
      })}
    </select>
  </div>
      <BillForm userData={userData} updateUserData={updateUserData} shopId={shopId} fetchBills={fetchBills}/>
      <br />
      <br />
      <Billtable currentBill={currentBill} />
    </div>
  );
};

export default Billing;