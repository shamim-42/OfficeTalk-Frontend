import { Divider } from 'antd';
import { useSelector } from 'react-redux';
import SidebarHead from '../../container/sidebar/SidebarHead';
import { selectConversationList } from '../../redux/features/layoutSlice';
import SidebarCard from './SidebarCard';

const SidebarUI = (props) => {
  const { userProfile, isOnline, isGroupOnline } = props;
  const conversationList = useSelector(selectConversationList);

  return (
    <div className="sidebar-container">
      <SidebarHead isOnline={isOnline} />
      <Divider />
      <div className="sidebar-card-container">
        <div className="sidebar-cards">
          {
            conversationList.length > 0 && conversationList.map((user, i) => (
              <SidebarCard
                userid={userProfile.id}
                isGroupOnline={isGroupOnline}
                isOnline={isOnline} key={i} user={user} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SidebarUI;

