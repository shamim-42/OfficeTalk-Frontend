import { Col, Row } from 'antd';
import ChatMessageOption from '../../../container/chat/ChatMessageOption';
import { timeFormat } from '../../../utils/timeFormat';
import CustomAvatar from '../../helper/CustomAvatar';
import ImageMessageCard from './ImageMessageCard';
import TextMessageCard from './TextMessageCard';

const MessageCard = (props) => {
  const { CurrentUserProfile, userProfile, message, isOnline, deleteMessage } = props;

  if (message?.user?.id === userProfile.id) {
    return (
      <Row className="message-card" justify="end">
        <Col span={14}>
          <Row>
            <Col span={21} className="messages-area">
              <p className='message-time' style={{ textAlign: 'right' }}>
                {timeFormat(message.createdAt)}
              </p>
              <div className='message-body message-right'>

                {message.type === 'image' &&
                  <>
                    <ChatMessageOption
                      deleteMessage={deleteMessage}
                      message={message}
                      align="right" />
                    <ImageMessageCard
                      sender={true}
                      message={message} />
                  </>
                }
              </div>
              <div className='message-body message-right'>
                {message.type === 'text' &&
                  <>
                    <ChatMessageOption
                      deleteMessage={deleteMessage}
                      message={message}
                      align="right" />
                    <TextMessageCard
                      CurrentUserProfile={CurrentUserProfile}
                      userProfile={userProfile}
                      message={message} />
                  </>
                }
              </div>

              {/* {
                message?.links?.length > 0 && message.links.map((link, index) => (
                  <LinkPreview
                    key={index}
                    margin="30px auto"
                    width="300px"
                    className="link-preview"
                    height="320px"
                    url="https://www.youtube.com"
                  />
                ))
              } */}

              {(message.content && message.type !== 'text') &&
                <div className='message-body message-right'>
                  <ChatMessageOption
                    deleteMessage={deleteMessage}
                    message={message}
                    align="right" />
                  <TextMessageCard
                    CurrentUserProfile={CurrentUserProfile}
                    userProfile={userProfile}
                    message={message} />
                </div>
              }
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
          <Col span={21} className="messages-area">
            <p className='message-time'>{timeFormat(message.createdAt)}</p>
            <div className='message-body message-left'>
              {message.type === 'image' &&
                <ImageMessageCard message={message} />
              }
              {message.type === 'text' &&
                <TextMessageCard
                  CurrentUserProfile={CurrentUserProfile}
                  userProfile={userProfile}
                  message={message} />
              }
              <ChatMessageOption deleteMessage={deleteMessage} message={message} align="left" />
            </div>
            {(message.content && message.type !== 'text') &&
              <div className='message-body message-left'>
                <TextMessageCard
                  CurrentUserProfile={CurrentUserProfile}
                  userProfile={userProfile}
                  message={message} />
                <ChatMessageOption deleteMessage={deleteMessage} message={message} align="left" />
              </div>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MessageCard;



