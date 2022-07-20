import { message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import connector from './connector';
import Login from './container/auth/Login';
import Registration from './container/auth/Registration';
import Layout from './layout/Layout';
import { selectUserToken } from './redux/features/authSlice';
import { updateLoading } from './redux/features/layoutSlice';

// requestForToken()

const PrivateRoute = ({ children }) => {
  const accessToken = useSelector(selectUserToken);
  return accessToken ? <Layout>{children}</Layout> : <Navigate replace to="/login" />;
};

function App() {
  const dispatch = useDispatch();

  const accessToken = useSelector(selectUserToken);
  connector.handle404 = async (response) => {
    dispatch(updateLoading(false));
    const err = await response.json();
    message.error(err.message);
    console.log(err);
  }
  connector.handle401 = async (response) => {
    dispatch(updateLoading(false));
    const err = await response.json();
    message.error(err.message);
    console.log(err);
  }
  connector.handle403 = async (response) => {
    dispatch(updateLoading(false));
    const err = await response.json();
    message.error(err.message);
    console.log(err);
  }
  connector.handle500 = async (response) => {
    dispatch(updateLoading(false));
    const error = await response.json();
    message.error("Something went wrong, please try again later.");
    console.log(error);
  }
  connector.handleBadReq = async (response) => {
    dispatch(updateLoading(false));
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
    dispatch(updateLoading(false));
    message.error("network error")
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


  }, [accessToken]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} exact />
      <Route path="/signup" element={<Registration />} exact />
      <Route path="/*" element={<PrivateRoute />} />
    </Routes>
  );
}

export default App;
