import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import components
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import About from "./components/About";
import Inventory from "./components/Inventory";
import Billing from "./components/Billing";
import Alerts from "./components/Alerts";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Stock from "./components/Stock";

/* All Pages
 Home, Dashboard, Profile, Register, Login, About, Inventory, Billing
*/

function App() {
  const [userData, setUserData] = useState(localStorage.getItem("userData"));
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    const data1 = JSON.parse(localStorage.getItem("userData"));
    const data2 = JSON.parse(localStorage.getItem("shopList"));
    if (data1 !== null) setUserData(data1);
    if (data2 !== null) setShopList(data2);
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("shopList", JSON.stringify(shopList));
  }, [shopList]);

  const updateUserData = (user, refresh, access) => {
    setUserData({ user, refresh, access });
  };

  const updateShopList = (shops) => {
    setShopList(shops);
  };

  return (
    <Router>
      <Navbar userData={userData} updateUserData={updateUserData} shopList={shopList} updateShopList={updateShopList} />
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
            <Dashboard userData={userData} updateUserData={updateUserData} shopList={shopList} updateShopList={updateShopList} />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Profile userData={userData} updateUserData={updateUserData} />
          }
        />
        <Route
          exact
          path="/about"
          element={
            <About userData={userData} updateUserData={updateUserData} />
          }
        />
        <Route
          exact
          path="/inventory"
          element={
            <Inventory userData={userData} updateUserData={updateUserData} shopList={shopList} updateShopList={updateShopList} />
          }
        />
        <Route
          exact
          path="/billing"
          element={
            <Billing userData={userData} updateUserData={updateUserData} shopList={shopList} updateShopList={updateShopList} />
          }
        />
        <Route
          exact
          path="/alerts"
          element={
            <Alerts userData={userData} updateUserData={updateUserData} shopList={shopList} updateShopList={updateShopList} />
          }
        />
        <Route
          exact
          path="/stock"
          element={
            <Stock userData={userData} updateUserData={updateUserData} shopList={shopList} updateShopList={updateShopList} />
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
            <Login userData={userData} updateUserData={updateUserData} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
