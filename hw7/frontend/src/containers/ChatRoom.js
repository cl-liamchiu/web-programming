import React from "react";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { Button, Input, message, Tag, Tabs } from "antd";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(240px - 36px);
  overflow: auto;
`;

const FootRef = styled.div`
  height: 20px;
`;

const initialItems = [
  {
    label: "Tab 1",
    children: "Content of Tab 1",
    key: "1",
  },
  {
    label: "Tab 2",
    children: "Content of Tab 2",
    key: "2",
  },
  {
    label: "Tab 3",
    children: "Content of Tab 3",
    key: "3",
    closable: false,
  },
];

const ChatRoom = () => {
  const { status, me, messages, sendMessage, displayStatus, startChat } =
    useChat();
  const [msg, setMsg] = useState("");
  const [msgSent, setMsgSent] = useState(false);

  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const msgFooter = useRef([]);


  const scrollToBottom = () => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);

    msgFooter.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
    setChatBoxes(newChatBoxes);
    console.log(chatBoxes.length - 1);
    console.log(index);
    return activeKey
      ? activeKey === targetKey
        ? index === 0
          ? newChatBoxes.length === 0
            ? ""
            : chatBoxes[index + 1].key
          : index === chatBoxes.length - 1
          ? chatBoxes[index - 1].key
          : chatBoxes[index + 1].key
        : activeKey
      : "";
  };

  const renderChat = (chat) => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);
    return chat.length === 0 ? (
      <p style={{ color: "#ccc" }}> No messages... </p>
    ) : (
      <Wrapper>
        {chat.map(({ sender, body }, i) => (
          <Message
            name={sender}
            isMe={sender === me}
            message={body}
            key={i}
          ></Message>
        ))}
        <FootRef
          ref={(el) => (msgFooter.current[index] = el)}
          key={activeKey}
        />
      </Wrapper>
    );
  };

  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const chat = renderChat(messages);
    setChatBoxes([
      ...chatBoxes,
      { label: friend, children: chat, key: friend },
    ]);
    setMsgSent(true);
    return friend;
  };

  useEffect(() => {
    scrollToBottom();
    setMsgSent(false);
  }, [msgSent, activeKey]);

  useEffect(() => {
    displayStatus(status);
  }, [status]);

  useEffect(() => {
    chatBoxes.map((chatBox) => {
      if (chatBox.label === activeKey) {
        const newChat = renderChat(messages);
        chatBox.children = newChat;
      }
    });
    setChatBoxes([...chatBoxes]);
    setMsgSent(true);
  }, [messages]);

  return (
    <>
      <Title name={me}></Title>
      <ChatBoxesWrapper
        tabBarStyle={{ height: "36px" }}
        type="editable-card"
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          startChat(me, key);
        }}
        onEdit={(targetKey, action) => {
          if (action === "add") setModalOpen(true);
          else if (action === "remove") {
            setActiveKey(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
      />
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          setActiveKey(createChatBox(name));
          startChat(me, name);
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      />
      {chatBoxes.length === 0 ? (
        ""
      ) : (
        <Input.Search
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          enterButton="Send"
          placeholder="Type a message here..."
          onSearch={(msg) => {
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter message",
              });
            } else {
              sendMessage(me, activeKey, msg);
              setMsg("");
            }
          }}
        ></Input.Search>
      )}
    </>
  );
};

export default ChatRoom;
