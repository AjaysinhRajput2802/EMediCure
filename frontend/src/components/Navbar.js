import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  /*var user = localStorage.getItem("user");
  alert(user);
  if (user === null) return;
  const response = fetch(`http://127.0.0.1:8000/api/profile?user=${user.id}`, {
    method: "GET",
  }).catch((e) => console.log(e));
  if (response.status === 200) {
    let data = response.json();
    console.log(data);
    setProfile(data);
  } else {
    alert(response.statusText);
  }*/

  

  const LogOut = async () => {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://127.0.0.1:8000/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ refresh: localStorage.getItem("refresh_token") }),
    }).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
      localStorage.removeItem("user");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      navigate("/");
    } else {
      alert(response.statusText);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top mask-custom shadow-0">
      <div className="container">
        <a className="navbar-brand" href="#!">
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
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Inventory
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Alerts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Billing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                About
              </a>
            </li>
          </ul>

          {localStorage.getItem('user') ? (
            <ul className="navbar-nav d-flex flex-row">
              <li className="btn btn-primary me-3" onClick={LogOut}>
                <span className="nav-link">Log Out</span>
              </li>
              <li>

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
