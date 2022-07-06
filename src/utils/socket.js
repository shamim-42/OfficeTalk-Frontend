import socketio from "socket.io-client";
const accessToken = JSON.parse(localStorage.getItem("authToken"));

export const newSocket = socketio("http://192.168.1.15:3000", {
  transports: ['websocket'],
  query: {
    token: accessToken
  }
})
