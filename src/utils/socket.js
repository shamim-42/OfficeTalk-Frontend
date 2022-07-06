import socketio from "socket.io-client";
const accessToken = JSON.parse(localStorage.getItem("authToken"));

export const newSocket = socketio("officetalk.tetonelectronics.com:3000", {
  transports: ['websocket'],
  query: {
    token: accessToken
  }
})
