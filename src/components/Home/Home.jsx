/*
  This is the login page, where user enters details to enter the room.
 */


import { useLayoutEffect, useState } from "react";
import { useSocket } from "../../context/socket";
import { UserProvider } from "../../context/user";
import { ChatWindow } from "../ChatWindow/ChatWindow";
import "./Home.scss";

export const Home = () => {
  const [name, setName] = useState("");
  const [userInRoom, setUserInRoom] = useState(false);
  const socket = useSocket();

  useLayoutEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setName(username);
      setUserInRoom(true);
    }
  }, []);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onEnterRoom = () => {
    const username = name.trim();
    if (username !== "") {

      setUserInRoom(true);
    }
  };

  if (userInRoom) {
    return (
      <UserProvider value={{ name }}>
        <ChatWindow />
      </UserProvider>
    );
  }

  return (

    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col">
              <div className="display-login-text">
              <h1>Chat Room App </h1><br/>
              <h5><b> Enter your name to join chat room </b></h5>
             </div>
          </div>
          <div className="col">
            <div className="user-container">
              <input
                  type="text"
                  name="username"
                  id="username"
                  data-testid="username-input"
                  className="user-input"
                  placeholder="Enter User name"
                  value={name}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onEnterRoom();
                  }}
                  onChange={onNameChange}
                  autoFocus
                  required
              />
              <button className="user-button" onClick={onEnterRoom}>
                Enter Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};
