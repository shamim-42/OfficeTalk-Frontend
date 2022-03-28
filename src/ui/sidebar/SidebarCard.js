import { Avatar, Badge, Card, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarCard = ({ user }) => {
  return (
    <Card
      style={{ width: '100%', borderRadius: '8px', backgroundColor: '#fafafa' }}
    >
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
          <Link to={`chat/${user.id}`} className="sidebar-user-name">{user.name}</Link>
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
    </Card>
  );
};

export default SidebarCard;