/*
  For creating socket context and socket events.
  which can be used by all components
 */

import { createContext, useContext } from "react";
import socket from "socket.io-client";

const connection  = socket.connect('https://codechallenge.brand.live');

connection.on("connect", () => {
  console.log('connected');
  connection.emit("join-channel", 'test-channel' );
});


const SocketContext = createContext();

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={connection}>{children}</SocketContext.Provider>
);

export function useSocket() {
  const socket = useContext(SocketContext);
  return socket;
}
