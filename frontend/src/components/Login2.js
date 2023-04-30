import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Components from "./Login_Register_css";

const Login2 = ({ userData, updateUserData, updateShopId, signIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.API_URL}auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).catch((e) => console.log(e));
    let data = await response.json();
    if (response.status === 200) {
      console.log(data);
      updateUserData(data.user, data.refresh, data.access);
      navigate("/dashboard");
    } else {
      alert(data.detail);
    }
  };

  return (
    <Components.SignInContainer signingIn={signIn}>
      <Components.Form onSubmit={handleSubmit}>
        <Components.Title>Sign in</Components.Title>

        <Components.Input
          type="text"
          placeholder="UserName"
          name="user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Components.Input
          type="password"
          placeholder="Password"
          name="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Components.Anchor href="#">Forgot password?</Components.Anchor>

        <Components.Button type="submit">Sign In</Components.Button>
      </Components.Form>
    </Components.SignInContainer>
  );
};

export default Login2;
