import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { groupMessageSendApi } from '../../api/group';
import { updateConversationGroupMessage } from '../../redux/features/layoutSlice';
import GroupBottomUi from '../../ui/group/GroupBottomUi';

const GroupBottom = (props) => {
  const { setAllMessage, setTargetId, userId, groupId } = props;
  const [messageText, setMessageText] = useState("");
  const dispatch = useDispatch();


  // Update message text function on change
  const handleChangeMessage = (e) => {
    setMessageText(e.target.value);
  }

  /**
   * Send message to current user function
   * @returns 
   */
  async function handleSubmitMessage() {
    if (messageText.trim().length <= 0 && !messageText) {
      return
    }
    const messageData = {
      message: messageText,
      senderId: userId,
      type: "text",
    }
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res);
      updateMessagesOnSend(res);
    }

    async function handleBadReq(response) {
      // let error = await response.json();
    }
    return await groupMessageSendApi(groupId, messageData, { successHandler, handleBadReq })
  }

  // update messages list after send message
  const updateMessagesOnSend = (res) => {
    // console.log(res);
    setMessageText('');
    const result = res.result;
    const newMessage = {
      lastMessage: result?.content,
      groupId: result?.room?.id,
      lastMessageTime: result?.createdAt,
      name: result?.room?.name,
      image: result?.room?.groupImage,
      unreadMessages: 0,
      type: "group",
      status: res?.status,
      users_seen: []
    }

    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const newMessage = JSON.parse(JSON.stringify(result));
      newMessage.EmojiTotal = [];
      newMessage.Emoji = [];
      newMessage.readMessage = [];
      const index = copyPrevMessages.findIndex(message => message.id === result.id);
      if (index === -1) {
        copyPrevMessages.push(newMessage);
      }
      return copyPrevMessages;
    });
    dispatch(updateConversationGroupMessage(newMessage))
    setTargetId(result.id);
  }

  return (
    <GroupBottomUi
      messageText={messageText}
      handleChangeMessage={handleChangeMessage}
      handleSubmitMessage={handleSubmitMessage}
    />
  );
};

export default GroupBottom;