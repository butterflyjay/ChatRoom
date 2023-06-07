import styled from "styled-components";
import { REACT_APP_LOCALHOST_KEY } from "../utils/config";
import Robot from "../assets/robot.gif";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem(REACT_APP_LOCALHOST_KEY)).username);
  });
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
