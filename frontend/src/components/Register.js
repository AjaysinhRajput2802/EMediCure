import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
    if (response.status === 200) {
      localStorage.setItem("user", data.username);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("access_token", data.access);
      navigate("/");
    } else {
      if (data.username)
        document.getElementById("usernameError").innerHTML = "*" + data.username[0];
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
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-2 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your details!
                  </p>
                  <form onSubmit={handleSubmit}>
                      <label className="form-label">Username</label>
                      <div className="form-outline form-white mb-4">
                      <input
                        type="text"
                        name="user"
                        className="form-control form-control-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <span id="usernameError" style={{color:'red'}}></span>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-lg"
                        placeholder="abcd@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <span id="emailError" style={{color:'red'}}></span>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">firstname</label>
                      <input
                        type="text"
                        name="firstname"
                        className="form-control form-control-lg"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">lastname</label>
                      <input
                        type="text"
                        name="lastname"
                        className="form-control form-control-lg"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">Mobile No</label>
                      <input
                        type="text"
                        name="mobile"
                        className="form-control form-control-lg"
                        placeholder="+911234567890"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                      <span id="mobileError" style={{color:'red'}}></span>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="pass"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span id="passwordError" style={{color:'red'}}>*password must be atleast 8 characters.</span>
                    </div>

                    <div className="form-outline form-white mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        name="conPass"
                        className="form-control form-control-lg"
                        required
                      />
                      <span id="confpassError" style={{color:'red'}}></span>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <label className="form-label">Choose Role</label>
                      <select
                        name="roles"
                        id="roles"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="Owner">Owner</option>
                        <option value="Supervisor">Supervisor</option>
                      </select>
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Already have an account?{" "}
                    <a href="/login" className="text-white-50 fw-bold">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
