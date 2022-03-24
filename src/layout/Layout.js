import {
    Route,
    Routes,
} from "react-router-dom";
import connector from '../connector/index';
import config from "../config/config.json";
import StyleGuide from "../container/StyleGuide";
import Login from "../container/Login";
import Registration from "../container/Registration";
import HomePage from "../container/HomePage";
connector.baseUrl = config.baseUrl;

function Layout() {

    connector.handle404 = async (response) => {
        const err = await response.json();
        console.log(err.message);
    }
    connector.handle403 = async (response) => {
        const err = await response.json();
        console.log(err.message);
    }
    connector.handle500 = async (response) => {
        const err = await response.json();
        console.log(err.message);
    }
    connector.handleBadReq = async (response) => {
        let errorResponse = await response.json();
        console.log({ message: Object.values(errorResponse).join(", ") });
    }
    connector.onRequestStart = function () {
        // dispatch(setLoading());
    }
    connector.onRequestStartDelay = 500;
    connector.onRequestEnd = async function () {
        // return dispatch(resetLoading());
    }

    connector.onNetworkError = async function () {
        console.log("network error")
    }

    connector.headers = {
        // "x-access-token": isLoggedIn({ getToken: true }),
        "content-type": "application/json"
    }

    // function onLogin(authToken) {
    //     localStorage.setItem("authToken", authToken);
    //     setLoggedIn(true);
    // }
    // function onLogout() {
    //     localStorage.removeItem("authToken");
    //     setLoggedIn(false);
    //     window.location.href = "/admin/login";
    // }

    return (
        <Routes>
            <Route path="/style-guide" element={<StyleGuide />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Registration />} exact />
        </Routes>
    )
}

export default Layout;