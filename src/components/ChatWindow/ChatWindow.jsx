/*
 User should be able to input the message.
 User should be able to send the message.
 */


import { useEffect, useState } from "react";
import { useSocket } from "../../context/socket";
import { useUser } from "../../context/user";
import { ChatHistory } from "../ChatHistory/ChatHistory";
import uniqid from "uniqid";
import "./ChatWindow.scss";

export const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const socket = useSocket();
  const user = useUser();

  const onSend = () => {
    const sanitizedMessage = message.trim();
    if (sanitizedMessage !== "") {
      setMessage("");
      socket.emit("message", { username: user.name, message: message.trim(), mid: uniqid() }, 'test-channel');
    }
  };

  return (
    <div className="chat-window">
      <ChatHistory />
      <div className="message-container">
        <input
          className="message-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          placeholder="enter your message"
          autoFocus
        />
        <button className="send-button" onClick={onSend}>
          send
        </button>
      </div>
    </div>
  );
};
