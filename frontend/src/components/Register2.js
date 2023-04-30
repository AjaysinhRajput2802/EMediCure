import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as Components from "./Login_Register_css";
import { Form , Col, Row} from "react-bootstrap";

const Register2 = ({ userData, updateUserData, signIn }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [role, setRole] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const confirmPass = e.target[5].value;

    /*if(!email.match(mailformat))
    {
        alert("Enter valid email address !");
        return;
    }
    if(password!==confirmPass)
    {
        alert("Confirm password and password are not same !");
        return;
    }*/

    const response = await fetch("http://127.0.0.1:8000/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        first_name: firstname,
        last_name: lastname,
        password,
        confirm_password: confirmPass,
        profile: {
          mobileNo: mobile,
          role,
        },
      }),
    }).catch((e) => console.log(e));
    let data = await response.json();
    console.log(data);
    if (response.status === 201) {
      localStorage.setItem("user", data.username);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("access_token", data.access);
      navigate("/");
    } else {
      if (data.username)
        document.getElementById("usernameError").innerHTML =
          "*" + data.username[0];
      else document.getElementById("usernameError").innerHTML = "";
      if (data.email)
        document.getElementById("emailError").innerHTML = "*" + data.email[0];
      else document.getElementById("emailError").innerHTML = "";
      if (data.password)
        document.getElementById("passwordError").innerHTML =
          "*" + data.password[0];
      else document.getElementById("passwordError").innerHTML = "";
      if (data.confirm_password)
        document.getElementById("confpassError").innerHTML =
          "*" + data.confirm_password[0];
      else if (data.non_field_errors)
        document.getElementById("confpassError").innerHTML =
          "*" + data.non_field_errors;
      else document.getElementById("confpassError").innerHTML = "";
      if (data.profile)
        document.getElementById("mobileError").innerHTML =
          "*" + data.profile.mobileNo[0];
      else document.getElementById("mobileError").innerHTML = "";
    }
  };

  return (
    <Components.SignUpContainer signingIn={signIn}>
      <Components.Form onSubmit={handleSubmit}>
        <Components.Title>Create Account</Components.Title>
        <Components.Input
          type="text"
          name="user"
          placeholder="UserName"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <span id="usernameError" style={{ color: "red" }}></span>

        <Components.Input
          type="email"
          name="email"
          placeholder="abcd@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <span id="emailError" style={{ color: "red" }}></span>

        <Components.Input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />

        <Components.Input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

        <Components.Input
          type="text"
          name="mobile"
          placeholder="Mobile Number : +91xxxxxxxxxx"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <span id="mobileError" style={{ color: "red" }}></span>

        <Components.Input
          type="password"
          name="pass"
          placeholder="Password : Atleast 8 Characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span id="passwordError" style={{ color: "red" }}>
        </span>

        <Components.Input
          type="password"
          name="conPass"
          placeholder="Confirm Password"
          required
        />
        <span id="confpassError" style={{ color: "red" }}></span>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>Role:</Form.Label>
        <Col sm={3}>
        <Form.Select
          type="select"
          name="roles"
          id="roles"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={{width:"150px"}}
        >
          <option value="Owner">Owner</option>
          <option value="Supervisor">Supervisor</option>
        </Form.Select>
        </Col>
      <br/>
      </Form.Group>
        <Components.Button type="submit">Sign Up</Components.Button>
      </Components.Form>
    </Components.SignUpContainer>
  );
};

export default Register2;
