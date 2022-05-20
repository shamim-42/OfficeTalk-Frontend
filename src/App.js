import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import connector from './connector';
import Login from './container/auth/Login';
import Registration from './container/auth/Registration';
import Layout from './layout/Layout';
import { selectUserProfile, selectUserToken } from './redux/features/authSlice';
import { newSocket } from './utils/socket';

const PrivateRoute = ({ children }) => {
  const userProfile = useSelector(selectUserProfile)
  return userProfile ? <Layout>{children}</Layout> : <Navigate replace to="/login" />;
};

function App() {
  const accessToken = useSelector(selectUserToken);
  connector.handle404 = async (response) => {
    const err = await response.json();
    console.log(err);
  }
  connector.handle401 = async (response) => {
    const err = await response.json();
    console.log(err);
  }
  connector.handle403 = async (response) => {
    const err = await response.json();
    console.log(err);
  }
  connector.handle500 = async (response) => {
    const err = await response.json();
    console.log(err);
  }
  connector.handleBadReq = async (response) => {
    let errorResponse = await response.json();
    console.log({ message: Object.values(errorResponse).join(", ") });
  }
  connector.onRequestStart = function () {
    console.log("onRequestStart")
    // dispatch(setLoading());
  }
  connector.onRequestStartDelay = 500;
  connector.onRequestEnd = async function () {
    console.log("onRequestEnd")

  }

  connector.onNetworkError = async function () {
    console.log("network error")
  }


  useEffect(() => {
    if (accessToken) {
      connector.headers = {
        Authorization: `bearer ${accessToken}`,
        "Content-type": "application/json",
      }
    } else {
      if (connector?.headers?.Authorization) {
        delete connector.headers.Authorization
      }
    }

    newSocket.connect()
    return () => newSocket.close();
  }, [accessToken]);
  return (
    <Routes>
      <Route path="/*" element={<PrivateRoute />} />
      <Route path="/login" element={<Login />} exact />
      <Route path="/signup" element={<Registration />} exact />
    </Routes>
  );
}

export default App;
