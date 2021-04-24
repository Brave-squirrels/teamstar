import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reduxState/store";
import { Button, Spinner } from "react-bootstrap";

import socketIOClient from "socket.io-client";

import { getChatFetch } from "reduxState/chat/getChat";
import { sendMessageFetch } from "reduxState/chat/sendMessage";
import { mutateToAxios } from "utils/onChangeForm";


import styles from "./chat.module.scss";
const ENDPOINT = "http://localhost:5000";




const Chat = () => {

const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);
  const token: string = localStorage.getItem("token") || "null";
  let chatMessages = useSelector(
    (state: RootState) => state.getChat.chatData.messages
  );

const sendState = useSelector((state: RootState) => state.sendMessage);
const socket = socketIOClient(ENDPOINT, {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
        token: token,
      },
    })
  

  const dispatch = useDispatch();

  const teamId = '6083e2c3de7b7644d83d369e';
  const chatId = 
  useEffect(() => {
    dispatch(getChatFetch(teamId));
  }, [dispatch, teamId]
);

// useEffect(()=> {
//       (props:any) => {
//           const { chatId } = props.match.params.chatId
//       }
//   })
const renderMessages = () => {
    return chatMessages.map((message:any) => {
        let date = new Date(message.date);
        let hours:string = date.getHours().toString();
        let minutes:string = date.getMinutes().toString();
        if(Number(minutes) < 10) {
            minutes = '0' + minutes
        }
        if(Number(hours) < 10) {
            hours = '0' + hours
        }
        return (
        <><h3>{message.authorName}</h3><p>{hours} : {minutes}</p>
        <div>{message.content}</div></>
        )
    })
}


socket.on("message", messageLive => {
    console.log(messageLive.data.content)
    
})

const handleSendMessage = (e:any) => {
    e.preventDefault();
    if(message==="") {
        return
    }
    let data = {
        content: message
    }

    dispatch(
      sendMessageFetch(data, teamId)
    );
    socket.emit("chat-message", {
      data
    });
}


    return(
        <div className={styles.flex}>
        <div className={styles.formBox}>{renderMessages()}</div>
        <input className={styles.inpucik} onChange={event => setMessage(event.target.value)} name="message" value={message}/>
        <Button onClick={(event) => {
            handleSendMessage(event)
        }}>SEND</Button>
        </div>
    )
}

export default Chat;