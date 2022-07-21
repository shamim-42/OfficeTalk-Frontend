import { Avatar, Button, Col, Popover, Row, Tooltip } from 'antd';
import { useEffect, useRef } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { timeFormat } from '../../../utils/timeFormat';
import { checkDevided, getTwoCharacters } from '../../../utils/utils';
import CustomAvatar from '../../helper/CustomAvatar';
import TextAvatar from '../../helper/TextAvatar';
import ImageMessageCard from './ImageMessageCard';
import MessageOption from './MessageOption';
import MessageSeenBubbles from './MessageSeenBubbles';
import TextMessageCard from './TextMessageCard';


const MessageCard = (props) => {
  const { CurrentUserProfile, userProfile, deleteMessage, message, isOnline, messages, index, reactVisible, setReactVisible, optionVisible, setOptionVisible, makeReaction, copyToClipboard, targetId } = props;

  const { width: windowWidth } = useWindowDimensions();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (message.id === targetId) {
      messagesEndRef.current?.scrollIntoView({
        inline: "end"
      });
    }

  }, [targetId, message]);

  if (message?.user?.id === userProfile.id || message?.senderId === userProfile.id) {
    return (
      <div className="message-list" ref={messagesEndRef}>
        <Row className="message-card" justify="end">
          <Col span={windowWidth > 768 ? 14 : 22}>
            <Row>
              <Col span={21} className="messages-area">
                {
                  checkDevided(messages[index - 1], message, index)
                  &&
                  <p className='message-time' style={{ textAlign: 'right' }}>
                    {timeFormat(message.createdAt)}
                  </p>
                }
                <div className='message-body message-right'>

                  {message.type === 'image' &&
                    <>
                      <MessageOption
                        isDelete={true}
                        deleteMessage={deleteMessage}
                        copyToClipboard={copyToClipboard}
                        reactVisible={reactVisible}
                        setReactVisible={setReactVisible}
                        optionVisible={optionVisible}
                        setOptionVisible={setOptionVisible}
                        message={message}
                        makeReaction={makeReaction}
                        userProfile={userProfile}
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
                      <MessageOption
                        isDelete={true}
                        deleteMessage={deleteMessage}
                        copyToClipboard={copyToClipboard}
                        reactVisible={reactVisible}
                        setReactVisible={setReactVisible}
                        optionVisible={optionVisible}
                        setOptionVisible={setOptionVisible}
                        message={message}
                        makeReaction={makeReaction}
                        userProfile={userProfile}
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
                    <MessageOption
                      isDelete={true}
                      deleteMessage={deleteMessage}
                      copyToClipboard={copyToClipboard}
                      reactVisible={reactVisible}
                      setReactVisible={setReactVisible}
                      optionVisible={optionVisible}
                      setOptionVisible={setOptionVisible}
                      userProfile={userProfile}
                      message={message}
                      makeReaction={makeReaction}
                      align="right" />
                    <TextMessageCard
                      CurrentUserProfile={CurrentUserProfile}
                      userProfile={userProfile}
                      message={message} />
                  </div>
                }
              </Col>
              {
                checkDevided(messages[index - 1], message, index)
                &&
                <Col span={3}
                  className='message-sender-img'>
                  {
                    (userProfile.profileImageResize || userProfile.profileImage) ?
                      <CustomAvatar
                        size={40}
                        icon={isOnline(userProfile?.id) && "small"}
                        src={userProfile.profileImageResize || userProfile.profileImage}
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
      </div>
    )
  }

  return (
    <div className="message-list" ref={messagesEndRef}>
      <Row className="message-card" justify="start">
        <Col span={windowWidth > 768 ? 14 : 22}>
          <Row>
            {
              checkDevided(messages[index - 1], message, index)
                ?
                <Col span={3} className='message-sender-img'>
                  {
                    CurrentUserProfile?.profileImageResize ?
                      <CustomAvatar
                        size={40}
                        icon={isOnline(CurrentUserProfile?.id) && "small"}
                        src={CurrentUserProfile?.profileImageResize}
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
              {
                checkDevided(messages[index - 1], message, index)
                &&
                <p className='message-time'>{(CurrentUserProfile?.fullname)?.split(" ")[0]}, {timeFormat(message.createdAt)}</p>
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
                <MessageOption
                  isDelete={false}
                  copyToClipboard={copyToClipboard}
                  reactVisible={reactVisible}
                  setReactVisible={setReactVisible}
                  userProfile={userProfile}
                  optionVisible={optionVisible}
                  setOptionVisible={setOptionVisible}
                  message={message}
                  makeReaction={makeReaction}
                  align="left" />
              </div>
              {(message.content && message.type !== 'text') &&
                <div className='message-body message-left'>
                  <TextMessageCard
                    CurrentUserProfile={CurrentUserProfile}
                    userProfile={userProfile}
                    message={message} />
                  <MessageOption
                    isDelete={false}
                    copyToClipboard={copyToClipboard}
                    userProfile={userProfile}
                    reactVisible={reactVisible}
                    setReactVisible={setReactVisible}
                    optionVisible={optionVisible}
                    setOptionVisible={setOptionVisible}
                    message={message}
                    makeReaction={makeReaction}
                    align="left" />
                </div>
              }
            </Col>
          </Row>
        </Col>
      </Row>
      <UserSeenBubbles message={message} userProfile={userProfile} />
    </div>
  );
};

export default MessageCard;

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
  )
}