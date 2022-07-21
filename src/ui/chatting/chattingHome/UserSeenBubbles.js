import { Avatar, Button, Col, Popover, Row, Tooltip } from 'antd';
import React from 'react';
import { FaPlusCircle } from "react-icons/fa";
import { getTwoCharacters } from '../../../utils/utils';
import MessageSeenBubbles from './MessageSeenBubbles';

const UserSeenBubbles = (props) => {
  const { message, userProfile } = props;

  return (
    <Row className="message-card-bubble" justify="start">
      <Col span={22} className="bubble-images">
        {
          (message?.readMessage?.length > 5) &&
          <Popover placement='leftBottom'
            content={<MessageSeenBubbles
              userProfile={userProfile}
              users={message.readMessage} />}
            trigger="click">
            <Button type="text" className="message-card-bubble-btn">
              <FaPlusCircle />
            </Button>
          </Popover>
        }
        {
          (message?.readMessage?.length > 0) && message.readMessage.slice(0, 5).map((user) => {
            if (user.userId === userProfile.id) return false;
            return (
              user.user.profileImageResize ?
                <Tooltip key={user.userId}
                  placement="top" title={user?.user.fullname}>
                  <Avatar
                    size={16}
                    src={user.user.profileImageResize}
                  />
                </Tooltip>
                :
                <Tooltip key={user.userId}
                  placement="top" title={user?.user.fullname}>
                  <p className="profile-text-avatar" >
                    {getTwoCharacters(user?.user.fullname)}
                  </p>
                </Tooltip>
            )
          })
        }
      </Col>
    </Row>
  );
};

export default UserSeenBubbles;