import React from "react";

const Home = ({ userData, updateUserData }) => {
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
