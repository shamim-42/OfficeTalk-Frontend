import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketio from "socket.io-client";
import { selectUserToken } from "../redux/features/authSlice";
// const accessToken = JSON.parse(localStorage.getItem("authToken"));


export default function useSocket() {
  const [socket, initSocket] = useState(null);
  const accessToken = useSelector(selectUserToken);

  useEffect(()=>{
    if(accessToken){
      const newSocket = socketio(`${process.env.REACT_APP_BASE_URL}:3000`, {
        transports: ['websocket'],
        query: {
          token: accessToken
        }
      })
      initSocket(newSocket);
    }
  },[accessToken])


  return {
    socket,
  };
};