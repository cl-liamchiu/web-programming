import { FastForwardOutlined } from "@ant-design/icons";
import { createContext, useContext, useState, useEffect } from "react";
import { Button, Input, message, Tag } from "antd";
import Message from "../../components/Message";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const client = new WebSocket("ws://localhost:4000");

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  sendMessage: () => {},
  clearMessages: () => {},
  displayStatus:() => {},
  startChat:() => {}
});

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    switch (task) {
      case "init": {
        setMessages(payload);
        break;
      }
      case "CHAT": {
        setMessages(payload);
        break;
      }
      case "output": {
        setMessages([...messages, ...payload]);
        break;
      }
      case "status": {
        setStatus(payload);
        break;
      }
      case "cleared": {
        setMessages([]);
        break;
      }
      default:
        break;
    }
  };



  const sendData = async (data) => {
    client.send(JSON.stringify(data));
  };

  const startChat = (name, to) =>{
    if (!name || !to) throw new Error('Name or to require.');
    sendData({type: "CHAT", payload:{ name, to}})
  } 
  const sendMessage = (name, to, body) => {
    sendData({ type: "MESSAGE", payload: { name, to, body}});
  };

  const clearMessages = () => {
    sendData(["clear"]);
  };

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg,
        duration: 0.5,
      };
      switch (type) {
        case "success":
          message.success(content);
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };
  return (
    <ChatContext.Provider
      value={{
        status,
        me,
        signedIn,
        messages,
        setMe,
        setSignedIn,
        sendMessage,
        clearMessages,
        displayStatus,
        startChat,
      }}
      {...props}
    />
  );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
