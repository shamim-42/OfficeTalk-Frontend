import { Avatar, Badge, Card, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { conversationTimeFormat } from '../../utils/utils';

const SidebarCard = ({ user, isOnline, unreadCount }) => {
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
                <p className={user?.message_Status_unreadMessages ? "card-message-count" : ''}>{user?.message_Status_unreadMessages || ''}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default SidebarCard;