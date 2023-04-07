import React from "react";

const Home = () => {
  return (
    <header>
      <section>
        <div
          id="intro"
          className="bg-image vh-100"
          style={{
            backgroundImage:
              "url('https://mdbootstrap.com/img/Photos/new-templates/psychologist/img1.jpg')",
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
