import { io } from "socket.io-client";
const accessToken = JSON.parse(localStorage.getItem("authToken"));

export const newSocket = io("http://192.168.1.3:3000", {
  transports: ['websocket'],
  query: {
    token: accessToken
  }
})
