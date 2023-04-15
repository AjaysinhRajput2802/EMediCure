import React from "react";
import { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = ({ userData, updateUserData }) => {
  const [shopList, setShopList] = useState([]);

  const fetchShopList = async () => {
    if (userData==null || userData.user==null) return;
    const role = userData.user.profile.role;
    console.log(role);
    const response = await fetch(
      `http://127.0.0.1:8000/api/medical/?shop${role}=${userData.user.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      setShopList(data);
    } else {
      alert(response.statusText);
    }
  };

  useEffect(() => {
    fetchShopList();
  }, [userData]);

  return (
    <div className="row">
      {shopList.map((shop) => {
        return (
          <div className="col-sm-6" key={shop.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{shop.shopName}</h5>
                <p className="card-text">
                  {shop.shopAddress}
                </p>
                <a href="#" className="btn btn-primary">
                  Goto Shop
                </a>
                <span className="ms-5">{shop.shopContactNo}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
