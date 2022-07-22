import { Col, Row } from 'antd';
import { useEffect, useRef } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { timeFormat } from '../../../utils/timeFormat';
import { checkDevided } from '../../../utils/utils';
import CustomAvatar from '../../helper/CustomAvatar';
import TextAvatar from '../../helper/TextAvatar';
import ImageMessageCard from './ImageMessageCard';
import MessageOption from './MessageOption';
import TextMessageCard from './TextMessageCard';
import UserSeenBubbles from './UserSeenBubbles';


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
          <Col span={windowWidth > 768 ? 16 : 22}>
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
                        size={windowWidth < 768 ? 24 : 40}
                        icon={isOnline(userProfile?.id) && "small"}
                        src={userProfile.profileImageResize || userProfile.profileImage}
                      />
                      :
                      <TextAvatar name={userProfile?.fullname}
                        icon={isOnline(userProfile?.id) && "small"}
                        size={windowWidth < 768 ? "24px" : "40px"}
                        fontSize={windowWidth < 768 ? "10px" : "18px"}
                      />
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
        <Col span={windowWidth > 768 ? 16 : 22}>
          <Row>
            {
              checkDevided(messages[index - 1], message, index)
                ?
                <Col span={3} className='message-sender-img'>
                  {
                    CurrentUserProfile?.profileImageResize ?
                      <CustomAvatar
                        size={windowWidth < 768 ? 24 : 40}
                        icon={isOnline(CurrentUserProfile?.id) && "small"}
                        src={CurrentUserProfile.profileImageResize || CurrentUserProfile.profileImage}
                      />
                      :
                      <TextAvatar name={CurrentUserProfile?.fullname}
                        icon={isOnline(CurrentUserProfile?.id) && "small"}
                        size={windowWidth < 768 ? "24px" : "40px"}
                        fontSize={windowWidth < 768 ? "10px" : "18px"}
                      />
                  }
                </Col>
                :
                <Col span={3}></Col>
            }
            <Col span={21} className="messages-area friend-send">
              {
                checkDevided(messages[index - 1], message, index)
                &&
                <p className='message-time'>
                  {(CurrentUserProfile?.fullname)?.split(" ")[0]}, {timeFormat(message.createdAt)}
                </p>
              }
              <div className='message-body message-left'>
                {message.type === 'image' &&
                  <ImageMessageCard message={message} />
                }
                {message.type === 'text' &&
                  <TextMessageCard
                    CurrentUserProfile={CurrentUserProfile}
                    userProfile={userProfile}
                    message={message}
                  />
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
                  align="left"
                />
              </div>

              {(message.content && message.type !== 'text') &&
                <div className='message-body message-left'>
                  <TextMessageCard
                    CurrentUserProfile={CurrentUserProfile}
                    userProfile={userProfile}
                    message={message}
                  />
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
                    align="left"
                  />
                </div>
              }
            </Col>
          </Row>
        </Col>
      </Row>
      <UserSeenBubbles
        message={message}
        userProfile={userProfile}
      />
    </div>
  );
};

export default MessageCard;