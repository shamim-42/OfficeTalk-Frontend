import { Col, Row } from 'antd';
import ChatMessageOption from '../../../container/chat/ChatMessageOption';
import { timeFormat } from '../../../utils/timeFormat';
import CustomAvatar from '../../helper/CustomAvatar';
import TextAvatar from '../../helper/TextAvatar';
import ImageMessageCard from './ImageMessageCard';
import TextMessageCard from './TextMessageCard';

const MessageCard = (props) => {
  const { CurrentUserProfile, userProfile, message, isOnline, deleteMessage } = props;

  if (message?.user?.id === userProfile.id || message?.senderId === userProfile.id) {
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
                      isDelete={true}
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
                      isDelete={true}
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
                    isDelete={true}
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
              {
                userProfile?.profileImage ?
                  <CustomAvatar
                    size={40}
                    icon={isOnline(userProfile?.id) && "small"}
                    src={userProfile?.profileImage}
                  />
                  :
                  <TextAvatar name={userProfile?.fullname}
                    icon={isOnline(userProfile?.id) && "small"}
                    size="40px" fontSize="18px" />
              }
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
            {
              CurrentUserProfile?.profileImage ?
                <CustomAvatar
                  size={40}
                  icon={isOnline(CurrentUserProfile?.id) && "small"}
                  src={CurrentUserProfile?.profileImage}
                />
                :
                <TextAvatar name={CurrentUserProfile?.fullname}
                  icon={isOnline(CurrentUserProfile?.id) && "small"}
                  size="40px" fontSize="18px" />
            }
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
              <ChatMessageOption
                isDelete={false}
                message={message} align="left" />
            </div>
            {(message.content && message.type !== 'text') &&
              <div className='message-body message-left'>
                <TextMessageCard
                  CurrentUserProfile={CurrentUserProfile}
                  userProfile={userProfile}
                  message={message} />
                <ChatMessageOption
                  isDelete={false}
                  message={message} align="left" />
              </div>
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MessageCard;



