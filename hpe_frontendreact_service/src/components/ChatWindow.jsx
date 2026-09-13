import { useEffect, useState } from "react";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import {
  socket,
  connectSocket,
  disconnectSocket,
  sendMessage
} from "../services/socket";

function ChatWindow() {

  const [messages, setMessages] = useState([]);

  const [connected, setConnected] = useState(false);

  useEffect(() => {

  const handleConnect = () => {
    console.log("WebSocket connected:", socket.id);
    setConnected(true);
  };

  const handleDisconnect = () => {
    console.log("WebSocket disconnected");
    setConnected(false);
  };

  socket.on("connect", handleConnect);
  socket.on("disconnect", handleDisconnect);

  connectSocket();

  return () => {

    socket.off("connect", handleConnect);
    socket.off("disconnect", handleDisconnect);

    disconnectSocket();
  };

}, []);

  const handleSend = (text) => {

    const message = {
      text: text
    };

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text
      }
    ]);

    sendMessage(message);
  };

  return (
    <div className="chat-container">

      <div className="chat-header">

        <h2>Virtual Agent</h2>

        <span>
          {connected ? "🟢 Connected" : "🔴 Disconnected"}
        </span>

      </div>

      <MessageList messages={messages} />

      <MessageInput onSend={handleSend} />

    </div>
  );
}

export default ChatWindow;