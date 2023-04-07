import React, { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(sessionStorage.getItem("UserData"));
  console.log(user);

  const LogOut = async () => {
    const response = await fetch("http://127.0.0.1:8000/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    if (response.status === 200) {
      let data = await response.text();
      console.log(data);
      sessionStorage.removeItem("UserData");
      setUser(null);
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
                Offer
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Reference
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Contact
              </a>
            </li>
          </ul>

          {user ? (
            <ul className="navbar-nav d-flex flex-row">
              <li className="btn btn-primary me-3" onClick={LogOut}>
                <a className="nav-link" href="/">
                  Log Out
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
