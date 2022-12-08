import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import styled from "styled-components";
import React from 'react'
import useUser from "../functions/Store";


export const Register = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const userLogin = useUser(state => state.loginUser)

  const getEmail = (e) => {
    setEmail(e.target.value)
  }

  const getPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    userLogin(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    // ..
  });
  }

  return (
    <Container>
      <Content>
        <CTA>
          <CTALogoOne src="/images/cta-logo-one.svg" alt="CTA-one" />
          <EmailInput type="email" placeholder="email" onChange={getEmail}/>
          <PasswordInput type= "password" placeholder="password" onChange={getPassword}/>
          <SignUp onClick={handleSubmit}>Register</SignUp>
          <Description>Disney+ Hotstar currently offers over 100,000 hours of TV content and movies across 9 languages, and every major sport covered live. </Description>
          <CTALogoTwo src="/images/cta-logo-two.png" alt="CTA-two" />
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;
const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
  background-image: url(/images/login-background.jpg);
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  z-index: -100;
  left: 0;
  filter: brightness(30%);
`;

const CTA = styled.div`
margin-bottom: 2vw;
max-width: 650px;
flex-wrap:wrap;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 0;
align-items: center;
margin-right: auto;
margin-left: auto;
transition-timing-function: ease-out;
transition: opacity 0.2s;
width: 100%;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const SignUp = styled.button`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  border: 1px solid transparent;
  font-size: 18px;
  padding: 16.5px 0;
  border-radius:  4px;

  &:hover {
    background-color: #0483ee;
    cursor: pointer;
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 12px;
  margin: 0 0 24px;
  line-height: 1.5em;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
max-width:600px;
width: 100%;
margin-bottom:20px;
display: inline-block;
vertical-align: bottom;
`;

const EmailInput = styled.input`
  margin-bottom: 10px;
  width: 100%;
  padding: 15px 15px;
  background-color: rgb(249,249,249);
  border: none;
  border-radius: 4px;
  outline: none;
  font-size:13px;
  font-weight: 600;
  line-height: 1.42rem;
  letter-spacing: 1.09px;
`;
const PasswordInput = styled.input`
 margin-bottom: 10px;
  width: 100%;
  padding: 15px 15px;
  background-color: rgb(249,249,249);
  border: none;
  border-radius: 4px;
  outline: none;
  font-size:13px;
  font-weight: 600;
  line-height: 1.42rem;
  letter-spacing: 1.09px;
`;

export default Register;


