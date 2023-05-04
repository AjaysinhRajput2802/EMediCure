import React from "react";
import { useState } from "react";

import * as Components from "./Login_Register_css";
import Register2 from "./Register2";
import Login2 from "./Login2";

const Login_Register = ({ userData, updateUserData, updateShopId }) => {
  const [signIn, toggle] = React.useState(true);
  const [onMobile, setOnMobile] = useState(false);
  window.onresize = () => {
    if (window.innerWidth < 768) {
      setOnMobile(true);
    } else {
      setOnMobile(false);
    }
  };

  const toggleSignIn = (val) => {
    toggle(val);
  };

  return (
      <Components.Container onMobile={onMobile} signIn={signIn}>
        {!signIn?<Register2
          userData={userData}
          updateUserData={updateUserData}
          signIn={signIn}
          toggleSignIn={toggleSignIn}
          onMobile={onMobile}
        />:null}
        {signIn?<Login2
          userData={userData}
          updateUserData={updateUserData}
          updateShopId={updateShopId}
          signIn={signIn}
          toggleSignIn={toggleSignIn}
          onMobile={onMobile}
        />:null}

        {!onMobile?<Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>:null}
      </Components.Container>
  );
};

export default Login_Register;
