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

    connectSocket();

    socket.on("connect", () => {

      console.log("WebSocket connected:", socket.id);

      setConnected(true);
    });

    socket.on("disconnect", () => {

      console.log("WebSocket disconnected");

      setConnected(false);
    });

    socket.on("webOut", (message) => {

      console.log("Received webOut:", message);

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: message.text || message
        }
      ]);

    });

    return () => {

      socket.off("connect");
      socket.off("disconnect");
      socket.off("webOut");

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