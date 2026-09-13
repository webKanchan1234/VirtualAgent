import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const sendMessage = (message) => {
  socket.emit("webIn", message);
};