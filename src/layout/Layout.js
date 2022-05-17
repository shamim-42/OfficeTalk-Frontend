import { Route, Routes } from "react-router-dom";
import config from "../config/config.json";
import connector from '../connector/index';
import EditPassword from "../container/auth/EditPassword";
import EditProfile from "../container/auth/EditProfile";
import Login from "../container/auth/Login";
import ProfileView from "../container/auth/ProfileView";
import Registration from "../container/auth/Registration";
import ChattingHome from "../container/ChattingHome";
import HomePage from "../container/HomePage";
import WelcomeHome from "../ui/welcomeHome/WelcomeHome";
connector.baseUrl = config.baseUrl;



function Layout() {
    

    return (
        
        <Routes>
            <Route path="/" element={<HomePage/>}>
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