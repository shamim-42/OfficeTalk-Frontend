import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessageApi } from '../../api/chat';
import { setUpdateConversation } from '../../redux/features/layoutSlice';
import ChattingBottomUI from '../../ui/chatting/chattingBottom/ChattingBottomUI';
import { checkLink } from '../../utils/utils';

const ChattingBottom = (props) => {
  const { currentUserProfile, newSocket, userId, messageStatus, allMessage, setAllMessage,  setTargetId } = props;
  const [isTyping, setIsTyping] = useState(false);
  const [messagesText, setMessagesText] = useState('')
  const [timer, setTimer] = useState(null);
  const chatId = currentUserProfile.id;
  const dispatch = useDispatch();

  // handle on change message function
  const handleChangeMessage = (e) => {
    setMessagesText(e.target.value);
    newSocket.emit('isWriting', { chatId: chatId, userId: userId });
    if (timer) {
      clearTimeout(timer);
    }
  }

  // handle on blur event function
  const handleBlur = () => {
    setTimer(setTimeout(() => {
      newSocket.emit('isNotWriting', { chatId: chatId, userId: userId });
    }, 2000));
  }


  /**
   * Send message to current user function
   * @param {*} e 
   * @param {string} msg 
   * @returns 
   */
  async function handleSubmitMessage(e, msg = null) {
    console.log("ed");
    newSocket.emit('isNotWriting', { chatId: chatId, userId: userId });
    if (messagesText.trim().length <= 0 && !msg) {
      return
    }
    let messageLinks = null;
    const isLink = checkLink(messagesText)
    if (isLink) messageLinks = isLink;

    const messageData = {
      message: msg || messagesText,
      senderId: userId,
      type: "text",
      links: messageLinks,
    }
    async function successHandler(response) {
      const res = await response.json();
      updateMessagesOnSend(res);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
    }
    return await sendMessageApi(chatId, messageData, { successHandler, handleBadReq })
  }

  // update messages list and conversation after send new message
  const updateMessagesOnSend = (res) => {
    const result = res.result;
    const newMessage = {
      id: res.conversationId,
      users_id: parseInt(result.receiverId),
      image: currentUserProfile.profileImage,
      name: currentUserProfile.fullname,
      lastMessage: result?.content,
      sentBy: result.senderId,
      lastMessageTime: result?.createdAt,
      unreadMessages: 0,
      status: res.status,
      type: "single",
    }

    setMessagesText('');
    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const newMessage = JSON.parse(JSON.stringify(res.result));
      newMessage.EmojiTotal = [];
      newMessage.Emoji = [];
      copyPrevMessages.push(newMessage);
      return copyPrevMessages;
    });
    dispatch(setUpdateConversation(newMessage));
    setTargetId(result.id);
  }


  /**
   * All useEffect Function below
   */
  useEffect(() => {
    if (newSocket) {
      newSocket.on(`isWriting/${userId}`, (res) => {
        if (parseInt(res.userId) === parseInt(chatId)) {
          setIsTyping(true);
        }
      });

      newSocket.on(`isNotWriting/${userId}`, (res) => {
        setIsTyping(false);
      });
    }

    return () => {
      setIsTyping(false);
      if (newSocket) {
        newSocket.off(`isWriting/${userId}`);
        newSocket.off(`isNotWriting/${userId}`);
      }
    }
  }, [userId, chatId, newSocket]);

  return (
    <ChattingBottomUI
      messagesText={messagesText}
      handleSubmitMessage={handleSubmitMessage}
      isTyping={isTyping}
      currentUserProfile={currentUserProfile}
      handleChangeMessage={handleChangeMessage}
      handleBlur={handleBlur}
      allMessage={allMessage}
      messageStatus={messageStatus}
    />
  );
};

export default ChattingBottom;