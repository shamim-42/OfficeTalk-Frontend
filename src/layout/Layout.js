import {
    Route,
    Routes,
} from "react-router-dom";
import connector from '../connector/index';
import config from "../config/config.json";
import {Container, Row, Col} from "react-bootstrap";
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
        <Route path="/login" element={<Container><Row><Col><h1>I am login component</h1></Col></Row></Container>} />
        <Route path="/style-guide" element={<Container><Row><Col><h1>I am Style-guide component</h1></Col></Row></Container>} />
        <Route path="/" element={<Container><Row><Col><h1>I am Home Component</h1></Col></Row></Container>} />
    </Routes>
    )
}

export default Layout;