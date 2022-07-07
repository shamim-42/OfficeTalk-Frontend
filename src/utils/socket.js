import socketio from "socket.io-client";
const accessToken = JSON.parse(localStorage.getItem("authToken"));

// console.log(process.env);

export const newSocket = socketio(`${process.env.REACT_APP_BASE_URL}:3000`, {
  transports: ['websocket'],
  query: {
    token: accessToken
  }
})
