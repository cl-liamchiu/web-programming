import { FastForwardOutlined } from "@ant-design/icons";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { createContext, useContext, useState, useEffect } from "react";
import { Button, Input, message, Tag } from "antd";
import Message from "../../components/Message";
import {
  CHATBOX_QUERY,
  CREATE_CHATBOX_MUTATION,
  CREATE_MESSAGE_MUTATION,
  MESSAGE_SUBSCRIPTION,
} from "../../graphql";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

// const client = new WebSocket("ws://localhost:4000");

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  setMe: () => {},
  setSignedIn: () => {},
  setFriend: () => {},
  sendMessage: () => {},
  clearMessages: () => {},
  displayStatus: () => {},
  startChat: () => {},
});

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState(savedMe || "");
  const [friend, setFriend] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loadChatBox, { called, data, loading, subscribeToMore }] = useLazyQuery(
    CHATBOX_QUERY,
    { variables: { name1: me, name2: friend } }
  );
  // console.log("called ", called);
  // console.log("data ", data);
  // console.log("loading ", loading);
  console.log("friend", friend)
  const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION);
  const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  // const { subscribedData, subscribedLoading } = useSubscription(
  //   MESSAGE_SUBSCRIPTION,
  //   { from: "123", to: "456" }
  // );

  useEffect(()=>{
    if(data)
    setMessages([...data.chatBox.messages])
  },[data])

  const startChat = async (name, to) => {
    const { data } = await createChatBox({
      variables: { name1: name, name2: to },
    });
    const { name: chatBoxName, messages } = data.createChatBox;
    // console.log(chatBoxName, messages);
    setMessages(messages);
    setFriend(to);
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      variables: { from: name, to: to },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.message;
        return {
          chatBox: {
            messages: [...prev.chatBox.messages, newMessage],
            name: prev.chatBox.name,
            __typename: prev.chatBox.__typename,
          },
        };
      },
    });

    // if (!name || !to) throw new Error("Name or to require.");
    // sendData({ type: "CHAT", payload: { name, to } });
  };

  // useEffect(() => {
  //   console.log("subscribe");
  //   try {
  //     subscribeToMore({
  //       document: MESSAGE_SUBSCRIPTION,
  //       variables: { from: me, to: friend },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         const newMessage = subscriptionData.data.message;
  //         console.log(prev);
  //         return {
  //           chatBox: {
  //             messages: [...prev.chatBox.messages, newMessage],
  //           },
  //         };
  //       },
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [subscribeToMore]);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

  // client.onmessage = (byteString) => {
  //   const { data } = byteString;
  //   const [task, payload] = JSON.parse(data);
  //   switch (task) {
  //     case "init": {
  //       setMessages(payload);
  //       break;
  //     }
  //     case "CHAT": {
  //       setMessages(payload);
  //       break;
  //     }
  //     case "output": {
  //       setMessages([...messages, ...payload]);
  //       break;
  //     }
  //     case "status": {
  //       setStatus(payload);
  //       break;
  //     }
  //     case "cleared": {
  //       setMessages([]);
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  // };

  // const sendData = async (data) => {
  //   client.send(JSON.stringify(data));
  // };

  const sendMessage = async (name, to, body) => {
    const {data: newMsg} = await createMessage({
      variables: { name: name, to: to, body: body },
    });
    // console.log(a);
    const {data: msg} = await loadChatBox({
      variables: {
        name1: name,
        name2: to,
      },
    });
    console.log(newMsg.createMessage)
    const {messages, name: chatBoxName} = msg.chatBox;
    // console.log("msg", messages);
    // console.log(chatBoxName);
    // console.log(data)
    // console.log(data.chatBox.messages);
    // setMessages([...data.chatBox.messages, newMsg.createMessage]);
    setFriend(to);
    // subscribeToMore({
    //   document: MESSAGE_SUBSCRIPTION,
    //   variables: { from: name, to: to },
    //   updateQuery: (prev, { subscriptionData }) => {
    //     console.log("h");
    //     if (!subscriptionData.data) return prev;
    //     const newMessage = subscriptionData.data.message.message;
    //     return {
    //       chatBox: {
    //         messages: [...prev.chatBox.messages, newMessage],
    //       },
    //     };
    //   },
    // });
  };

  // const clearMessages = () => {
  //   sendData(["clear"]);
  // };

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
        setFriend,
        setMe,
        setSignedIn,
        sendMessage,
        // clearMessages,
        displayStatus,
        startChat,
      }}
      {...props}
    />
  );
};
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
