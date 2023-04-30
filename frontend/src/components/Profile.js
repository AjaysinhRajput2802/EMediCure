import React, { useState, useEffect, useRef } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = ({ userData, updateUserData }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [initialMobile, setInitialMobile] = useState("");
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  
  if(typeof(userData)=="string")
    userData=JSON.parse(userData);

  // LOGIN REQUIRED
  useEffect(() => {
    if (userData === null || userData.user === null) navigate("/login-register");
  }, []);

  const LoadData = () => {
    setEmail(userData.user.email);
    setFirstname(userData.user.first_name);
    setLastname(userData.user.last_name);
    setMobile(userData.user.profile.mobileNo);
    setInitialMobile(userData.user.profile.mobileNo);
  };

  const IsChanged = () => {
    document.getElementById("saveButton").disabled = false;
    if (firstname !== userData.user.first_name) return;
    if (lastname !== userData.user.last_name) return;
    if (email !== userData.user.email) return;
    if (mobile !== userData.user.profile.mobileNo) return;
    if (image !== null) return; 
    document.getElementById("saveButton").disabled = false;
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const response1 = await fetch(
      `http://127.0.0.1:8000/auth/user/${userData.user.id}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.access}`,
        },
        body: JSON.stringify({
          email: email,
          first_name: firstname,
          last_name: lastname,
          profile: {
            id: userData.user.profile.id,
          },
        }),
      }
    ).catch((e) => console.log(e));
    let data = await response1.json();
    console.log(data);
    if (response1.status === 200) {
      updateUserData(
        {
          ...userData.user,
          first_name: firstname,
          last_name: lastname,
          email: email,
        },
        userData.refresh,
        userData.access
      );
    }
    if (data.email && response1.status!==200) {
      document.getElementById("emailError").innerHTML = "*" + data.email[0];
      console.log("email error");
    } else{
      document.getElementById("emailError").innerHTML = "";
    }
    if (initialMobile !== mobile || image !== null) {
      //console.log(userData);
      const form_data = new FormData();
      form_data.append("id", userData.user.profile.id);
      if(initialMobile !== mobile){
        form_data.append("mobileNo", mobile);
      }
      if (image !== null) {
        form_data.append("profilePhoto", image, image.name);
      }
      form_data.append("role",userData.user.profile.role);
      const response2 = await fetch(
        `http://127.0.0.1:8000/api/profile/${userData.user.profile.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${userData.access}`,
          },
          body: form_data,
        }
      ).catch((e) => console.log(e));
      let data = await response2.json();
      //console.log(data);
      if (response2.status === 200) {
        const temp = data.profilePhoto.split("/");
        data.profilePhoto = "";
        for(var i=3;i<temp.length;i++)
        {
          data.profilePhoto += "/" + temp[i];
        }
        updateUserData(
          {
            ...userData.user,
            profile: {
              id: data.id,
              mobileNo: data.mobileNo,
              profilePhoto: data.profilePhoto,
              role: data.role,
            },
          },
          userData.refresh,
          userData.access
        );
      }
      if (data.mobileNo && response2.status!==200) {
        document.getElementById("mobileError").innerHTML =
          "*" + data.mobileNo[0];
        console.log("mobile error");
      } else {
        document.getElementById("mobileError").innerHTML = "";
      }
      if (response1.status === 200 && response2.status === 200) {
        document.getElementById("Profileupdated").innerHTML =
          "Profile updated successfully";
      } else {
        document.getElementById("Profileupdated").innerHTML = "";
      }
    } else {
      document.getElementById("mobileError").innerHTML = "";
      if (response1.status === 200) {
        document.getElementById("Profileupdated").innerHTML =
          "Profile updated successfully";
      } else {
        document.getElementById("Profileupdated").innerHTML = "";
      }
    }
  };

  return (
    <div className="container rounded mb-5" style={{marginTop:"120px",backgroundColor:"lightgrey",color:"#10454F"}} onLoad={LoadData}>
      {userData && userData.user ? (
        <div className="row justify-content-center">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5 mt-3">
            <div className="img" onClick={(e) => hiddenFileInput.current.click()} style={{ position:"relative"}}>
            <button id="middle">Change Photo</button>
            <img className="rounded-circle" id="image" src={image ? URL.createObjectURL(image) :
                `http://127.0.0.1:8000${userData.user.profile.profilePhoto}`
              } alt="profilePhoto"/>
            <input
              id="image-upload-input"
              type="file"
              onChange={(e) => {const file = e.target.files[0]; setImage(file); IsChanged();}}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
              <span className="font-weight-bold" style={{display:"block"}}>{userData.user.username}</span>
              <span className="text-black-50">{userData.user.email}</span>
              <span> </span>
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <form onSubmit={updateProfile}>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels" htmlFor="first_name">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      value={firstname}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                        IsChanged();
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      value={lastname}
                      onChange={(e) => {
                        setLastname(e.target.value);
                        IsChanged();
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobileNo"
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        IsChanged();
                      }}
                    />
                    <span id="mobileError" style={{ color: "red" }}></span>
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Email ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        IsChanged();
                      }}
                    />
                    <span id="emailError" style={{ color: "red" }}></span>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="submit"
                    id="saveButton"
                    style={{backgroundColor:"#10454F"}}
                    disabled={true}
                  >
                    Save Profile
                  </button>
                  <span
                    id="Profileupdated"
                    style={{ color: "green", display: "block" }}
                  ></span>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Role</span>
                <span className="px-3 p-1" style={{backgroundColor:"#506266",color:"white",cursor:"auto",borderRadius:"5px"}}>
                  {userData.user.profile.role}
                </span>
              </div>
              <br />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
