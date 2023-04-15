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

/* All Pages
 Home, Dashboard, Profile, Register, Login, About, Inventory, Billing
*/

function App() {
  const [userData, setUserData] = useState(localStorage.getItem("userData"));

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data !== null) setUserData(JSON.parse(userData));
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const updateUserData = (user, refresh, access) => {
    setUserData({ user, refresh, access });
  };

  return (
    <Router>
      <Navbar userData={userData} updateUserData={updateUserData} />
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
            <Dashboard userData={userData} updateUserData={updateUserData} />
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
            <Inventory userData={userData} updateUserData={updateUserData} />
          }
        />
        <Route
          exact
          path="/billing"
          element={
            <Billing userData={userData} updateUserData={updateUserData} />
          }
        />
        <Route
          exact
          path="/alerts"
          element={
            <Alerts userData={userData} updateUserData={updateUserData} />
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
