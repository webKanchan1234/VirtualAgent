function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sender}`}
        >
          <strong>{message.sender}:</strong>{" "}
          {message.text}
        </div>
      ))}
    </div>
  );
}

export default MessageList;