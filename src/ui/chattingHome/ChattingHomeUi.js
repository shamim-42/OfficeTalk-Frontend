import { Col, Row } from 'antd';
import React from 'react';
import ChatingMessageCard from '../chatingMessageCard/ChatingMessageCard';
import ChattingHeader from '../chattingHeader/ChattingHeader';


const ChattingHomeUi = (props) => {
  const { currentUser } = props;
  return (
    <>
      <ChattingHeader currentUser={currentUser} />
      <div className="chatting-content">
        <Row className="chatting-date">
          <Col span={6} className="chatting-date-card">
            Monday , May 7, 2021
          </Col>
        </Row>
        <ChatingMessageCard />
        <ChatingMessageCard />
      </div>
    </>
  );
};

export default ChattingHomeUi;