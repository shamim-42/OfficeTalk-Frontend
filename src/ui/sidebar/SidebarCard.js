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
  const unreadMessage = user?.unreadMessages;
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
              (user?.image) ? <CustomAvatar
                size={60}
                icon={(isOnline(user?.users_id) || isGroupOnline(user?.groupId)) && "large"}
                src={user?.image}
              /> :
                <TextAvatar
                  name={user?.name}
                  icon={(isOnline(user?.users_id) || isGroupOnline(user?.groupId)) && "large"}
                  size="60px" fontSize="24px" />
            }

          </Col>
          <Col span={14}>
            <p className="sidebar-card-user-name">{user?.name}</p>
            <p className="sidebar-car-message">
              {user?.lastMessage}
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
                {conversationTimeFormat(user?.lastMessageTime)}
              </p>
              <div className="card-bubble-img">
                {user.type === "single" &&
                  ((
                    user?.status === 'sent' &&
                    <p className="message-status-icon">
                      <IoCheckmarkCircleOutline />
                    </p>
                  ) ||
                    (
                      user?.status === 'delevered' &&
                      <p className="message-status-icon">
                        <IoCheckmarkCircleSharp />
                      </p>
                    ) ||
                    (
                      (
                        (user?.status === 'seen' && unreadMessage > 0) &&
                        <p className={unreadMessage ? "card-message-count" : ''}>
                          {unreadMessage}
                        </p>
                      ) ||
                      (
                        (user?.status === 'seen' && user.unreadMessages === 0) && (user.sentBy !== userid ? <p></p>
                          : (user?.image ?
                            <Avatar
                              className="circle-img message-status-img"
                              src={user?.image}
                            />
                            : <TextAvatar
                              name={user?.name}
                              size="20px" fontSize="8px" />)
                        )
                      )
                    ))
                }
                {user.type === "group" &&
                  ((
                    user?.status === 'sent' &&
                    <p className="message-status-icon">
                      <IoCheckmarkCircleOutline />
                    </p>
                  ) ||
                    (
                      user?.status === 'delevered' &&
                      <p className="message-status-icon">
                        <IoCheckmarkCircleSharp />
                      </p>
                    ) ||
                    (
                      user?.status === 'unseen' &&
                      <p className={unreadMessage ? "card-message-count" : ''}>
                        {unreadMessage}
                      </p>
                    )
                    ||
                    (
                      (user?.status === 'seen') &&
                      (
                        user?.users_seen?.length > 0 && user?.users_seen.slice(user?.users_seen.length - 2, user?.users_seen?.length).map((usr, i) => (usr.profileImage ? <Avatar
                          key={i}
                          className="circle-img message-status-img"
                          src={usr.profileImage}
                        />
                          :
                          <TextAvatar
                            key={i}
                            name={usr?.name}
                            size="20px" fontSize="8px" />
                        )
                        )
                      )
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