import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import components
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Inventory from "./components/Inventory";
import Billing from "./components/Billing";
import Alerts from "./components/Alerts";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Stock from "./components/Stock";
// import About from "./components/About";

/* All Pages
 Home, Dashboard, Profile, Register, Login, About, Inventory, Billing
*/

function App() {
  const [userData, setUserData] = useState(localStorage.getItem("userData"));
  const [shopList, setShopList] = useState([]);
  const [shopId, setShopId] = useState(0);

  useEffect(() => {
    const data1 = JSON.parse(localStorage.getItem("userData"));
    const data2 = JSON.parse(localStorage.getItem("shopList"));
    const data3 = JSON.parse(localStorage.getItem("shopId"));
    if (data1 !== null) setUserData(data1);
    if (data2 !== null) setShopList(data2);
    if (data3 !== null) setShopId(data3);
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("shopList", JSON.stringify(shopList));
  }, [shopList]);

  useEffect(() => {
    localStorage.setItem("shopId", JSON.stringify(shopId));
  }, [shopId]);

  const updateUserData = (user, refresh, access) => {
    setUserData({ user, refresh, access });
  };

  const updateShopList = (shops) => {
    setShopList(shops);
  };

  const updateShopId = (id) => {
    setShopId(id);
  };

  return (
    <Router>
      <Navbar
        userData={userData}
        updateUserData={updateUserData}
        shopList={shopList}
        updateShopList={updateShopList}
        shopId={shopId}
        updateShopId={updateShopId}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home userData={userData} updateUserData={updateUserData} />}
        />
        <Route
          exact
          path="/dashboard"
          element={
            <Dashboard
              userData={userData}
              updateUserData={updateUserData}
              shopList={shopList}
              updateShopList={updateShopList}
              updateShopId={updateShopId}
            />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Profile userData={userData} updateUserData={updateUserData} />
          }
        />
        {/* <Route
          exact
          path="/about"
          element={
            <About userData={userData} updateUserData={updateUserData} />
          }
        /> */}
        <Route
          exact
          path="/inventory/:shopId"
          element={
            <Inventory
              userData={userData}
              updateUserData={updateUserData}
              shopList={shopList}
              updateShopList={updateShopList}
            />
          }
        />
        <Route
          exact
          path="/billing/:shopId"
          element={
            <Billing
              userData={userData}
              updateUserData={updateUserData}
              shopList={shopList}
              updateShopList={updateShopList}
            />
          }
        />
        <Route
          exact
          path="/alerts/:shopId"
          element={
            <Alerts
              userData={userData}
              updateUserData={updateUserData}
              shopList={shopList}
              updateShopList={updateShopList}
            />
          }
        />
        <Route
          exact
          path="/stock/:shopId"
          element={
            <Stock
              userData={userData}
              updateUserData={updateUserData}
              shopList={shopList}
              updateShopList={updateShopList}
            />
          }
        />
        <Route
          exact
          path="/register"
          element={
            <Register userData={userData} updateUserData={updateUserData} />
          }
        />
        <Route
          exact
          path="/login"
          element={
            <Login
              userData={userData}
              updateUserData={updateUserData}
              updateShopId={updateShopId}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
