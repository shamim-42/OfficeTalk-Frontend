import { Avatar, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarHead from '../../container/SidebarHead';
import { selectConversationList } from '../../redux/features/layoutSlice';
import CustomAvatar from '../helper/CustomAvatar';
import TextAvatar from '../helper/TextAvatar';
import SidebarCard from './SidebarCard';

const Sidebar = (props) => {
  const { users, userProfile, onlineUsers } = props;
  const conversationList = useSelector(selectConversationList);


  function isOnline(userid) {
    return onlineUsers.indexOf(parseInt(userid)) !== -1;
  }

  return (
    <div className="sidebar-container">
      <SidebarHead />
      <div className="online-users">
        <Avatar.Group className="online-user-group">
          {
            users.map((user, index) => (
              <Link to={`chat/${user.id}`} key={user.id || index}>
                {
                  user.profileImage ?
                    <CustomAvatar
                      size={40}
                      src={user.profileImage}
                      icon={isOnline(user.id) && "small"}
                    />
                    :
                    <TextAvatar name={userProfile.fullname}
                      icon={isOnline(user.id) && "small"}
                      size="40px" fontSize="18px" />
                }
              </Link>
            ))
          }
        </Avatar.Group>
      </div>
      <Divider />
      <div className="sidebar-card-container">
        <div className="sidebar-cards">
          {
            conversationList.length > 0 && conversationList.map((user, i) => (
              <SidebarCard userid={userProfile.id} isOnline={isOnline} key={i} user={user} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

