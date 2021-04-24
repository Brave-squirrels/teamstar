import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import styles from "./chat.module.scss";
const ENDPOINT = "http://localhost:5000";



const Chat = () => {


const [message, setMessage] = useState('');
const [messages, setMessages] = useState([]);
  const token: string = localStorage.getItem("token") || "null";

  const fetchChat = () => {
      fetch('http://localhost:5000/chat/6083a07879a41c5fbc6ea202', {
            headers: {
                'x-auth-token': token
            }
        }).then(async response => {
            let data = await response.data;
            console.log(data)
            // setMessages(()=>(data))
        })
  }
     useEffect(() => {
        fetchChat();
})
  



    return(
        <div className={styles.flex}>
        <div className={styles.formBox}>{messages[0]}</div>
        <input className={styles.inpucik}onChange={event => setMessage(event.target.value)} name="message" value={message}/>
        <button>SEND</button>
        </div>
    )
}

export default Chat;