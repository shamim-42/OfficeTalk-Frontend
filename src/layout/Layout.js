import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import config from "../config/config.json";
import connector from '../connector/index';
import EditPassword from "../container/auth/EditPassword";
import EditProfile from "../container/auth/EditProfile";
import Login from "../container/auth/Login";
import ProfileView from "../container/auth/ProfileView";
import Registration from "../container/auth/Registration";
import ChattingHome from "../container/ChattingHome";
import HomePage from "../container/HomePage";
import StyleGuide from "../container/StyleGuide";
import { selectUserProfile, selectUserToken } from "../redux/features/authSlice";
import WelcomeHome from "../ui/welcomeHome/WelcomeHome";
connector.baseUrl = config.baseUrl;

const PrivateRoute = ({ children }) => {
    const userProfile = useSelector(selectUserProfile)
    return userProfile ? children : <Navigate to="/login" />;
};

function Layout() {
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
                Authorization: "bearer" + " " + accessToken,
                "Content-type": "application/json",
            }
        } else {
            if (connector?.headers?.Authorization) {
                delete connector.headers.Authorization
            }
        }
    }, [accessToken]);

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
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>}>
                <Route index element={<WelcomeHome />} />
                <Route path="/chat/:id" element={<ChattingHome />} />
                <Route path="/profile" element={<ProfileView />} exact />
                <Route path="/editprofile" element={<EditProfile />} exact />
                <Route path="/editpassword" element={<EditPassword />} exact />
            </Route>
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Registration />} exact />
        </Routes>
    )
}

export default Layout;