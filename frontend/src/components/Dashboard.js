import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateMedShop from "./CreateMedShop";
import "./Dashboard.css";

const Dashboard = ({ userData, updateUserData, shopList, updateShopList }) => {
  const navigate = useNavigate();

  const fetchShopList = async () => {
    if (userData === null || userData.user === null) {
      navigate("/login");
      return;
    } else {
      try {
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
          updateShopList(data);
        } else {
          alert(response.statusText);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  useEffect(() => {
    fetchShopList();
  }, [userData]);

  return (
    <>
      <CreateMedShop userData={userData} />
      <div className="row">
        {shopList.map((shop) => {
          return (
            <div className="col-sm-6" key={shop.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{shop.shopName}</h5>
                  <p className="card-text">{shop.shopAddress}</p>
                  <a href="/" className="btn btn-primary">
                    Goto Shop
                  </a>
                  <span className="ms-5">{shop.shopContactNo}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
