import React from 'react'

import * as Components from "./Login_Register_css";
import Register2 from "./Register2";
import Login2 from "./Login2";

const Login_Register = ({userData, updateUserData, updateShopId}) => {
   const [signIn, toggle] = React.useState(true);
   return (
      <div style={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         flexDirection: "column",
         fontFamily: "'Montserrat', sans-serif",
         height: "55vh",
         margin: "200px 0 50px"}}>
            <Components.Container>
         <Register2 userData={userData} updateUserData={updateUserData} signIn={signIn} />
         <Login2 userData={userData} updateUserData={updateUserData} updateShopId={updateShopId} signIn={signIn} />
         
         <Components.OverlayContainer signingIn={signIn}>
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
         </Components.OverlayContainer>
      </Components.Container>
      </div>
   );

}

export default Login_Register;