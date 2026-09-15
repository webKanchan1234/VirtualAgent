import { useEffect, useState } from "react";
// import {randomUUID} from "crypto"
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
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {

    const handleConversationStarted = (data) => {

      console.log(
        "Conversation started:",
        data.conversationId
      );

      setConversationId(data.conversationId);
    };

    const handleConnect = () => {
      console.log("WebSocket connected:", socket.id);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    };

    const handleWebOut = (message) => {

      console.log(
        "Received webOut:",
        message
      );

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: message.text || message
        }
      ]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("webOut", handleWebOut);
    socket.on("conversationStarted", handleConversationStarted);

    connectSocket();


    return () => {

      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("webOut", handleWebOut);
      socket.off("conversationStarted", handleConversationStarted);

      disconnectSocket();
    };

  }, []);

  const handleSend = (text) => {

    if (!conversationId) {
      console.warn("Cannot send message: conversation not initialized");
      return;
    }

    const message = {
      messageId: crypto.randomUUID(),
      type: "user_message",
      text: text,
      conversationId: conversationId
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