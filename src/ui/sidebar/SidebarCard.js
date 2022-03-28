import { Avatar, Badge, Card, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarCard = ({ user }) => {
  return (
    <Card
      // if active card will be add .focushed class with .sidebar-card
      className="sidebar-card"
    >
      <Link to={`chat/${user.id}`}
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
              dot={user.status}
            >
              <Avatar
                className="sidebar-card-img circle-img"
                src={user.img}
              />
            </Badge>
          </Col>
          <Col span={14}>
            <p className="sidebar-user-name">{user.name}</p>
            <p className="sidebar-car-message">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sit minima voluptates fuga atque commodi eos incidunt odio modi. Quibusdam.</p>
          </Col>
          <Col span={5}>
            <div style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <p className="card-time" style={{ fontSize: '12px' }}>10:10 pm</p>
              <div>
                <p className="card-message-count">2</p>
              </div>
            </div>
          </Col>
        </Row>
      </Link>
    </Card>
  );
};

export default SidebarCard;