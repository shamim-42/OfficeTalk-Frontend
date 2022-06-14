import { Col, Row } from 'antd';
import { timeFormat } from '../../../utils/utils';
import CustomAvatar from '../../helper/CustomAvatar';
import ImageMessageCard from './ImageMessageCard';
import MessageOption from './MessageOption';
import TextMessageCard from './TextMessageCard';

const MessageCard = (props) => {
  const { CurrentUserProfile, message, isOnline, userProfile } = props;

  if (message.senderId === userProfile.id) {
    return (
      <Row className="message-card" justify="end">
        <Col span={14}>
          <Row>
            <Col span={21}>
              <p className='message-time' style={{ textAlign: 'right' }}>
                {timeFormat(message.createdAt)}
              </p>
              <div className='message-body message-right'>
                <MessageOption align="right" />
                {message.type === 'image' &&
                  <ImageMessageCard sender={true} message={message} />
                }
                {message.type === 'text' &&
                  <TextMessageCard message={message} />
                }
              </div>
            </Col>

            <Col span={3}
              className='message-sender-img'>
              <CustomAvatar
                size={40}
                icon={isOnline(userProfile?.id) && "small"}
                src={userProfile?.profileImage}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

  return (
    <Row className="message-card" justify="start">
      <Col span={14}>
        <Row>
          <Col span={3} className='message-sender-img'>
            <CustomAvatar
              size={40}
              icon={isOnline(CurrentUserProfile?.id) && "small"}
              src={CurrentUserProfile?.profileImage}
            />
          </Col>
          <Col span={21}>
            <p className='message-time'>{timeFormat(message.createdAt)}</p>
            <div className='message-body message-left'>
              {message.type === 'image' &&
                <ImageMessageCard message={message} />
              }
              {message.type === 'text' &&
                <TextMessageCard message={message} />
              }
              <MessageOption align="left" />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MessageCard;



