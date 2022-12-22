import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Button, Input, message, Tag } from "antd";
import {useChat} from "./containers/hooks/useChat";
import styled from "styled-components";
import React from "react";
import SignIn from "./containers/SignIn"
import ChatRoom from "./containers/ChatRoom"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;
const App = () => {
  const { status, me, signedIn, displayStatus } = useChat();

  // useEffect(() => {
  //   displayStatus(status);
  // }, [status, displayStatus]);
  
  return <Wrapper> {signedIn ? <ChatRoom /> : <SignIn me={me}/>} </Wrapper>;
};

export default App;