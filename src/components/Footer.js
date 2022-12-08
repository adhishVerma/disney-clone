import React from "react";
import styled from "styled-components";
import { ReactComponent as TMDBsvg } from "../assets/asset5.svg";

const Footer = () => {
  return (
    <Container>
      <Wrap>
        <p>Powered by:</p>
        <TMDBsvg height={12} />
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrap = styled.div`
  padding-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

export default Footer;
