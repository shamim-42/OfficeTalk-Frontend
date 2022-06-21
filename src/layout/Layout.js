import { Route, Routes } from "react-router-dom";
import config from "../config/config.json";
import connector from '../connector/index';
import EditProfile from "../container/auth/EditProfile";
import ProfileView from "../container/auth/ProfileView";
import ChattingHome from "../container/chat/ChattingHome";
import GroupHome from "../container/group/GroupHome";
import HomePage from "../container/HomePage";
import StyleGuide from "../container/StyleGuide";
import WelcomeHome from "../ui/home/WelcomeHome";
connector.baseUrl = config.baseUrl;

function Layout() {
    return (
        <Routes>
            <Route path="/gude" element={<StyleGuide />} />

            <Route path="/" element={<HomePage />}>
                <Route index element={<WelcomeHome />} />
                <Route path="/chat/:chatId" element={<ChattingHome />} />
                <Route path="/group/:id" element={<GroupHome />} />
                <Route path="/profile" element={<ProfileView />} exact />
                <Route path="/editprofile" element={<EditProfile />} exact />
            </Route>
            {/* <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Registration />} exact /> */}
        </Routes>
    )
}

export default Layout;