import React from 'react'
import * as Components from "./Login_Register_css";
import Register2 from "./Register2";

const Login_Register = ({userData, updateUserData}) => {
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
         
         <Components.SignInContainer signingIn={signIn}>
         <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="email" placeholder="Email" />
            <Components.Input type="password" placeholder="Password" />
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button>Sign In</Components.Button>
         </Components.Form>
         </Components.SignInContainer>
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