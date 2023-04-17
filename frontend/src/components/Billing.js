import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Billing = ({userData, updateUserData}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userData === null || userData.user === null)
          navigate("/login");
      },[]);
    
    return (
        <div>
        <h1>To make Bill payment</h1>
        </div>
    );
};

export default Billing;