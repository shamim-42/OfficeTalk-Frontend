import { Avatar, Card, Col, Row } from 'antd';
import { IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { conversationTimeFormat } from '../../utils/timeFormat';
import CustomAvatar from '../helper/CustomAvatar';


const SidebarCard = ({ user, isOnline, userid }) => {
  const unreadMessage = user?.message_Status_unreadMessages;
  const messageStatus = user?.message_Status_status;

  return (
    <Card
      // if active card will be add .focushed class with .sidebar-card
      className="sidebar-card"
    >
      <Link to={`chat/${user?.users_id}`}
        className={unreadMessage > 0 ? 'unread-card' : "read-card"}>
        <Row>
          <Col span={5}>
            <CustomAvatar
              size={60}
              icon={isOnline(user?.users_id) && "large"}
              src={user?.users_profileImage}
            />
          </Col>
          <Col span={14}>
            <p className="sidebar-card-user-name">{user?.users_fullname}</p>
            <p className="sidebar-car-message">
              {user?.message_Status_lastMessage}
            </p>
          </Col>
          <Col span={5}>
            <div style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <p className="card-time" style={{ fontSize: '12px' }}>
                {conversationTimeFormat(user?.message_Status_lastMessageTime)}
              </p>
              <div>
                {
                  (
                    messageStatus === 'sent' &&
                    <p className="message-status-icon">
                      <IoCheckmarkCircleOutline />
                    </p>
                  ) ||
                  (
                    messageStatus === 'delevered' &&
                    <p className="message-status-icon">
                      <IoCheckmarkCircleSharp />
                    </p>
                  ) ||
                  (
                    (
                      (messageStatus === 'seen' && unreadMessage > 0) &&
                      <p className={unreadMessage ? "card-message-count" : ''}>
                        {unreadMessage}
                      </p>
                    ) ||
                    (
                      (messageStatus === 'seen' && unreadMessage === 0) && (user.message_status_sentBy !== userid ? <p></p>
                        : <Avatar
                          className="circle-img message-status-img"
                          src={user?.users_profileImage}
                        />)
                    )
                  )
                }
              </div>
            </div>
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default SidebarCard;