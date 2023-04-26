import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({
  userData,
  updateUserData,
  updateShopList,
  shopId,
  updateShopId,
}) => {
  const navigate = useNavigate();

  const LogOut = async () => {
    let data;
    let response = await fetch("http://127.0.0.1:8000/auth/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: userData.refresh }),
    }).catch((e) => console.log(e));
    if (response.status === 200) {
      data = await response.json();
      console.log(data);
      updateUserData(userData.user, data.refresh, data.access);
    } else {
      alert(response.statusText);
    }
    const token = data.access;

    response = await fetch("http://127.0.0.1:8000/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refresh: data.refresh }),
    }).catch((e) => console.log(e));
    if (response.status === 200) {
      data = await response.json();
      console.log(data);
      updateUserData(null, "", "");
      updateShopList(null);
      updateShopId(0);
      navigate("/");
    } else {
      alert(response.statusText);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <span style={{ color: "#5e9693" }}>EMedi</span>
          <span style={{ color: "#fff" }}>Cure</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            {userData && userData.user ? (
              userData.user.profile.role === "Owner" ? (
                shopId ? (
                  <>
                    <li className="nav-item">
                      <a className="nav-link" id="dashboard" href="/dashboard">
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href={`/inventory/${shopId}`}>
                        Inventory
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href={`/alerts/${shopId}`}>
                        Alerts
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href={`/billing/${shopId}`}>
                        Billing
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href={`/stock/${shopId}`}>
                        Stock
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <a className="nav-link" id="dashboard" href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                )
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href={`/inventory/${shopId}`}>
                      Inventory
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={`/alerts/${shopId}`}>
                      Alerts
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={`/billing/${shopId}`}>
                      Billing
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href={`/stock/${shopId}`}>
                      Stock
                    </a>
                  </li>
                </>
              )
            ) : (
              <></>
            )}
            {/* <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li> */}
          </ul>

          {userData && userData.user ? (
            <ul className="navbar-nav d-flex flex-row">
              <li className="btn btn-primary me-3" onClick={LogOut}>
                <span className="nav-link">Log Out</span>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a href="/profile">
                  <img
                    className="profileIcon"
                    src={
                      "http://127.0.0.1:8000" +
                      userData.user.profile.profilePhoto
                    }
                    alt="profilePhoto"
                  />
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav d-flex flex-row">
              <li className="btn btn-primary me-3">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="btn btn-secondary ms-3">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
