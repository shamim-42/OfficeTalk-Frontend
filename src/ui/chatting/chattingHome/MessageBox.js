import { Col, Row } from 'antd';
import MessageCard from './MessageCard';

const MessageBox = (props) => {
  const { filterMessages, currentUserStatus, userProfile, isOnline } = props;

  return (
    <>
      <Row className="chatting-date">
        <Col span={6} className="chatting-date-card">
          {filterMessages?.date}
        </Col>
      </Row>
      <div className="message-list">
        {
          filterMessages?.messages.length > 0 && filterMessages?.messages.map((message) => (
            <MessageCard
              CurrentUserProfile={currentUserStatus}
              userProfile={userProfile}
              message={message}
              isOnline={isOnline}
              key={message?.id}
            />
          ))
        }
      </div>
    </>
  );
};

export default MessageBox;