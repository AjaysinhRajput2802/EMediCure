import React, {useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stocktable from "./Stocktable";
import StockForm from "./StockForm";

const Stock = ({ userData, updateUserData }) => {
  const navigate = useNavigate();
  const { shopId } = useParams();

  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login");
  }, []);

  return (
    <>
      <StockForm userData={userData} shopId={shopId} />
      <br />
      <br />
      <Stocktable userData={userData} shopId={shopId} />
    </>
  );
};

export default Stock;
