import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BillForm from "./BillForm";
import Billtable from "./Billtable";


const Billing = ({ userData, updateUserData, shopList, updateShopList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
  }, []);

  const [currentBill, setCurrentBill] = useState([]);
  const { shopId } = useParams();

  const fetchBills = async (e) => {
    console.log(shopId);

    const response = await fetch(
      `http://127.0.0.1:8000/api/bill/?medShop=${shopId}`,
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
  };

  useEffect(() => {
    fetchBills();
  }, [userData]);
  
  return (
    <div>
      <BillForm userData={userData} updateUserData={updateUserData} shopId={shopId} fetchBills={fetchBills}/>
      <br />
      <br />
      <Billtable currentBill={currentBill} />
    </div>
  );
};

export default Billing;