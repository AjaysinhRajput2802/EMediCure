import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "./Login_Register_css";

const Login2 = ({ userData, updateUserData, updateShopId, signIn, toggleSignIn, onMobile }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login/`, {
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
      <Components.Form onSubmit={handleSubmit} signingIn={signIn}>
        <Components.Title style={{marginBottom:"10px"}}>Sign in</Components.Title>

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

        {onMobile?<Components.Anchor onClick={()=>toggleSignIn(false)}>Don't have an account ! Register here?</Components.Anchor>:null}

        <Components.Button type="submit" style={{marginTop:"20px"}}>Sign In</Components.Button>
      </Components.Form>
    </Components.SignInContainer>
  );
};

export default Login2;
