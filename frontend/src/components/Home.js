import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = ({ userData, updateUserData }) => {
  const navigate = useNavigate();

  if (typeof userData == "string") userData = JSON.parse(userData);

  useEffect(() => {
    if (userData === null || userData.user === null) {
      navigate("/login-register");
      return;
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <header>
      <section>
        <div
          id="intro"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')",
          }}
        >
          <div
            className="mask"
            style={{ backgroundColor: "rgba(250, 182, 162, 0.15)" }}
          ></div>
        </div>
      </section>
    </header>
  );
};

export default Home;
