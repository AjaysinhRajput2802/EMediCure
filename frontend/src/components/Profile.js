import React from "react";
import './Profile.css';

const Profile = ({ userData, updateUserData }) => {

  const updateProfile = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const first_name = e.target[0].value;
    const last_name = e.target[1].value;
    const email = e.target[2].value;
    const mobileNo = e.target[3].value;
    console.log(first_name, last_name, email, mobileNo);

    /*const response = await fetch(
      `http://127.0.0.1:8000/api/profile?user=${userData.user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
        })
      }
    ).catch((e) => console.log(e));
    if (response.status === 200) {
      let data = await response.json();
      console.log(data);
    } else {
      alert(response.statusText);
    }*/
  };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
        {userData.user ? <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src={'http://127.0.0.1:8000'+userData.user.profile.profilePhoto}
              alt="profilePhoto"
            />
            <span className="font-weight-bold">{userData.user.username}</span>
            <span className="text-black-50">{userData.user.email}</span>
            <span> </span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels" htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={userData.user.first_name}
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={userData.user.last_name}
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
                  value={userData.user.profile.mobileNo}
                />
              </div>          
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={userData.user.email}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="submit">
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center experience">
              <span>Role</span>
              <span className="border px-3 p-1 add-experience">
                <i className="fa fa-plus"></i>&nbsp;{userData.user.profile.role}
              </span>
            </div>
            <br />
          </div>
        </div>
      </div> : <div>Loading...</div>}
      
    </div>
  );
};

export default Profile;
