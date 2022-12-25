import React from "react";
import AppTitle from "../components/Title";
import {useChat} from "./hooks/useChat";
import LogIn from "../components/LogIn";

const SignIn = ({me}) => {
  const { setMe, setSignedIn, displayStatus } = useChat();

  const handleLogin = (name) => {
    if (!name)
      displayStatus({
        type: "error",
        msg: "Missing user name",
      });
    else setSignedIn(true);
  };

  return (
    <>
      <AppTitle />
      <LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </>
  );
};

export default SignIn;
