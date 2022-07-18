import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://159.223.53.175:5002";

function App() {
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("connect", () => {
      console.log("connected");
      // setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
      // setIsConnected(false);
    });

    socket.on("bot-status", (data) => {
      console.log("data ===> ", data);
      // setLastPong(new Date().toISOString());
    });
  }, []);

  return <div></div>;
}

export default App;
