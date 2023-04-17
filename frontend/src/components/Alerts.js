import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Alerts = ({userData, updateUserData}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userData === null || userData.user === null)
          navigate("/login");
      },[]);
    
    return (
        <div className="mt-5">
        <h1>This is Alert page.</h1>
        </div>
    );
};

export default Alerts;