/*

 This page show the history of previous messages.
 Data gets stored into local storage.
 When click's on refresh button after one hour - Chat messages will be removed

 */

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../../context/socket";
import { useUser } from "../../context/user";
import "./ChatHistory.scss";

export const ChatHistory = () => {
  const socket = useSocket();
  const user = useUser();
  const newMessageRef = useRef();
  const [messageHistory, updateMessageHistory] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    const localMessageHistoryJSON = localStorage.getItem("history");
    if (localMessageHistoryJSON) {
      try {
        const localMessageHistory = JSON.parse(localMessageHistoryJSON);
        console.log(new Date().getTime())
        console.log(localMessageHistory.expiryTime)

        if (new Date().getTime() < localMessageHistory.expiryTime) {
          updateMessageHistory([...localMessageHistory.messageHistory]);
          setHistoryLoaded(true);
        }else{
          localStorage.removeItem("history");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      messageHistory.push( message);
      updateMessageHistory([...messageHistory]);
    });
  }, [socket, historyLoaded]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify({messageHistory,expiryTime: new Date().getTime()+60*60*1000}));
  }, [messageHistory]);

  useEffect(() => {
    if (!newMessageRef.current) {
      //   newMessageRef.current = true;
    } else {
      newMessageRef.current?.scrollIntoView(true);
    }
  });

  return (
    <div className="chat-history-window">
      <div className="chat-display-title">Welcome {user.name} to Chat Room<br/></div>
      <hr/> <br/>
      {messageHistory.map((message, index) => {
        if (message.username === user.name) {
          return (
            <div
              className="users-message"
              key={message.mid}
              ref={index === messageHistory.length - 1 ? newMessageRef : null}
            >
              <div className="users-name">Me: </div>
              <div className="user-display">{message.message}</div>
            </div>
          );
        }
        return (
          <div
            className="others-message"
            key={message.mid}
            ref={index === messageHistory.length - 1 ? newMessageRef : null}
          >
            <div className="others-name">{message.username}:</div>
            <div>{message.message}</div>
          </div>
        );
      })}
    </div>
  );
};
