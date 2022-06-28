import { Button, Col, Popover, Row } from 'antd';
import { FaPlusCircle } from "react-icons/fa";
import ChatMessageOption from '../../../container/chat/ChatMessageOption';
import { timeFormat } from '../../../utils/timeFormat';
import CustomAvatar from '../../helper/CustomAvatar';
import TextAvatar from '../../helper/TextAvatar';
import ImageMessageCard from './ImageMessageCard';
import MessageSeenBubbles from './MessageSeenBubbles';
import TextMessageCard from './TextMessageCard';


const MessageCard = (props) => {
  const { CurrentUserProfile, userProfile, message, isOnline, deleteMessage, index, messages } = props;

  if (message?.user?.id === userProfile.id || message?.senderId === userProfile.id) {
    return (
      <>
        <Row className="message-card" justify="end">
          <Col span={14}>
            <Row>
              <Col span={21} className="messages-area">
                {((!(index > 0 && (messages[index - 1]?.senderId === message.senderId))) ||
                  (!(index > 0 && (messages[index - 1]?.user?.id === message?.user?.id))))
                  &&
                  <p className='message-time' style={{ textAlign: 'right' }}>
                    {timeFormat(message.createdAt)}
                  </p>
                }
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
              {((!(index > 0 && (messages[index - 1]?.senderId === message.senderId))) ||
                (!(index > 0 && (messages[index - 1]?.user?.id === message?.user?.id))))
                &&
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
              }
            </Row>
          </Col>
        </Row>
        <UserSeenBubbles message={message} userProfile={userProfile} />
      </>
    )
  }

  return (
    <>
      <Row className="message-card" justify="start">
        <Col span={14}>
          <Row>
            {((!(index > 0 && (messages[index - 1]?.senderId === message.senderId))) ||
              (!(index > 0 && (messages[index - 1]?.user?.id === message?.user?.id))))
              ?
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
              :
              <Col span={3}></Col>
            }
            <Col span={21} className="messages-area friend-send">
              {((!(index > 0 && (messages[index - 1]?.senderId === message.senderId))) ||
                (!(index > 0 && (messages[index - 1]?.user?.id === message?.user?.id))))
                &&
                <p className='message-time'>{timeFormat(message.createdAt)}</p>
              }
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
      <UserSeenBubbles message={message} userProfile={userProfile} />
    </>
  );
};

export default MessageCard;

const UserSeenBubbles = (props) => {
  const { message, userProfile } = props;
  return (
    <Row className="message-card-bubble" justify="start">
      <Col span={22} className="bubble-images">
        {
          (message?.users_seen?.length > 5) &&
          <Popover placement='leftBottom'
            content={<MessageSeenBubbles
              userProfile={userProfile}
              users={message.users_seen} />}
            trigger="click">
            <Button type="text" className="message-card-bubble-btn">
              <FaPlusCircle />
            </Button>
          </Popover>
        }
        {
          (message?.users_seen?.length > 0) && message.users_seen.slice(0, 5).map((user) => {
            if (user.id === userProfile.id) return false;
            return (
              user.profileImage ?
                <CustomAvatar
                  key={user.id}
                  size={16}
                  src={user.profileImage}
                />
                :
                <TextAvatar name={user?.name}
                  key={user.id}
                  size="16px" fontSize="7px" />
            )
          })
        }
      </Col>
    </Row>
  )
}