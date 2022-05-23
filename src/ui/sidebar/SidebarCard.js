import { Avatar, Badge, Card, Col, Row } from 'antd';
import React from 'react';
import { IoCheckmarkCircleOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { conversationTimeFormat } from '../../utils/utils';


const SidebarCard = ({ user, isOnline, unreadCount, userid }) => {
  const unreadMessage = user?.message_Status_unreadMessages;
  const messageStatus = user?.message_Status_status;

  return (
    <Card
      // if active card will be add .focushed class with .sidebar-card
      className="sidebar-card"
    >
      <Link to={`chat/${user?.users_id}`}
        // if message is read will be add .read-card class on replace with .unread-card
        className="unread-card">
        <Row>
          <Col span={5}>
            <Badge
              offset={["-5%", "85%"]}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#67C148",
                textAlign: "left"
              }}
              dot={isOnline(user?.users_id)}
            >
              <Avatar
                className="sidebar-card-img circle-img"
                src={user?.users_profileImage}
              />
            </Badge>
          </Col>
          <Col span={14}>
            <p className="sidebar-user-name">{user?.users_fullname}</p>
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
                    messageStatus === 'sent' && <p className="message-status-icon"><IoCheckmarkCircleOutline /></p>) ||
                  (messageStatus === 'delevered' && <p className="message-status-icon"><IoCheckmarkCircleSharp /></p>) ||
                  (((messageStatus === 'seen' && unreadMessage > 0) && <p className={unreadMessage ? "card-message-count" : ''}>{unreadMessage}</p>) || ((messageStatus === 'seen' && unreadMessage === 0) && (user.message_status_sentBy !== userid ? <p></p> : <Avatar
                    className="circle-img message-status-img"
                    src={user?.users_profileImage}
                  />))
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