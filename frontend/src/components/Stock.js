import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stocktable from "./Stocktable";
import StockForm from "./StockForm";

const Stock = ({ userData, updateUserData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
  }, []);

  return (
    <>
      <StockForm userData={userData} />
      <br />
      <br />
      <Stocktable userData={userData} />
    </>
  );
};

export default Stock;
