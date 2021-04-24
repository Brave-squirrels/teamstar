import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { RootState } from "reduxState/store";
import { Button } from "react-bootstrap";

import socketIOClient from "socket.io-client";

import { getChatFetch } from "reduxState/chat/getChat";
import { sendMessageFetch } from "reduxState/chat/sendMessage";

import styles from "./chat.module.scss";
const ENDPOINT = "http://localhost:5000";

const Chat = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const teamId = location.pathname.split("/")[2];
  const token: string = localStorage.getItem("token") || "null";

  const socket = socketIOClient(ENDPOINT, {
    extraHeaders: {
      "Access-Control-Allow-Origin": "*",
      token: token,
    },
  });

  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  const chatMessages = useSelector(
    (state: RootState) => state.getChat.chatData.messages
  );

  const sendState = useSelector((state: RootState) => state.sendMessage);

  useEffect(() => {
    
      dispatch(getChatFetch(teamId));
    },
    // eslint-disable-next-line
   [dispatch, teamId, msg, sendState.success]);

  const renderMessages = () => {
    return chatMessages.map((message: any) => {
      let date = new Date(message.date);
      let hours: string = date.getHours().toString();
      let minutes: string = date.getMinutes().toString();
      if (Number(minutes) < 10) {
        minutes = "0" + minutes;
      }
      if (Number(hours) < 10) {
        hours = "0" + hours;
      }
      return (
        <>
          <h3>{message.authorName}</h3>
          <p>
            {hours} : {minutes}
          </p>
          <div>{message.content}</div>
        </>
      );
    });
  };

  socket.on("message", (messageLive) => {
    if (messageLive !== "") {
      setMsg(messageLive);
    }
  });

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (message === msg) {
      return;
    }
    if(message==="") {
      return;
    }
    let data = {
      content: message,
    };

    socket.emit("chat-message", {
      data,
    });
    dispatch(sendMessageFetch(data, teamId));
    setMessage("");
  };

  return (
    <div className={styles.flex}>
      <div className={styles.formBox} id="flex">
        {renderMessages()}
      </div>
      <input
        className={styles.inpucik}
        onChange={(event) => setMessage(event.target.value)}
        name="message"
        value={message}
      />
      <Button
        onClick={(event) => {
          handleSendMessage(event);
        }}
      >
        SEND
      </Button>
    </div>
  );
};

export default Chat;
