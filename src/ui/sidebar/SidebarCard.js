import { Avatar, Card, Col, Row } from 'antd';
import { IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentGroup, selectCurrentUser } from '../../redux/features/authSlice';
import { conversationTimeFormat } from '../../utils/timeFormat';
import CustomAvatar from '../helper/CustomAvatar';
import TextAvatar from '../helper/TextAvatar';


const SidebarCard = ({ user, isOnline, userid, isGroupOnline }) => {
  const currentUser = useSelector(selectCurrentUser)
  const currentGroup = useSelector(selectCurrentGroup)
  const unreadMessage = user?.message_Status_unreadMessages || user?.unreadmessage;
  const messageStatus = user?.message_Status_status || user?.status;

  const cardLink = user.type === "single" ? `chat/${user?.users_id}`
    : `group/${user?.groupId}`;

  return (
    <Card
      className={`sidebar-card ${(parseInt(currentUser) === user?.users_id || parseInt(currentGroup) === user?.groupId) && "focushed"}`}
    >
      <Link to={cardLink}
        className={unreadMessage > 0 ? 'unread-card' : "read-card"}>
        <Row>
          <Col span={5}>
            {
              (user?.users_profileImage || user?.groupImage) ? <CustomAvatar
                size={60}
                icon={(isOnline(user?.users_id) || isGroupOnline(user?.groupId)) && "large"}
                src={user?.users_profileImage || user?.groupImage}
              /> :
                <TextAvatar
                  name={user?.users_fullname || user?.name}
                  icon={(isOnline(user?.users_id) || isGroupOnline(user?.groupId)) && "large"}
                  size="60px" fontSize="24px" />
            }

          </Col>
          <Col span={14}>
            <p className="sidebar-card-user-name">{user?.users_fullname || user?.name}</p>
            <p className="sidebar-car-message">
              {user?.message_Status_lastMessage || user?.lastMessage}
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
                {user.type === "single" &&
                  ((
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
                    ))
                }
                {user.type === "group" &&
                  ((
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
                      messageStatus === 'unseen' &&
                      <p className={unreadMessage ? "card-message-count" : ''}>
                        {unreadMessage}
                      </p>
                    )
                    ||
                    (
                      (messageStatus === 'seen') &&
                      <Avatar
                        className="circle-img message-status-img"
                        src={user?.users_profileImage}
                      />
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