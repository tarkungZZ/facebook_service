import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://159.223.53.175:5002"

function App() {
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {

    const socket = socketIOClient(ENDPOINT);
    socket.on("connect", () => {
      console.log("connected");
      // setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnect")
      // setIsConnected(false);
    });

    socket.on("bot-status", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("bot-status");
    };
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;
