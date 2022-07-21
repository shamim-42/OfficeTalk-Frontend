import { message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessageApi, singleReactionApi } from '../../api/chat';
import { selectUserProfile } from '../../redux/features/authSlice';
import { deleteSingleConversation, selectActiveUser, updateConversationMessage } from '../../redux/features/layoutSlice';
import MessageCard from '../../ui/chatting/chattingHome/MessageCard';
import { updateMessageListOnReact } from '../../utils/utils';

const ChatCardContainer = (props) => {
  const { currentUserProfile, setAllMessage, singleMessage, messages, index, targetId } = props;
  const [reactVisible, setReactVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  const chatId = currentUserProfile?.id;
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;
  const onlineUsers = useSelector(selectActiveUser);

  console.log(targetId)

  // check user online status function
  function isOnline(id) {
    return onlineUsers.indexOf(id) !== -1;
  }

  /**
     * single message reaction function
     * @param {number} msgId 
     * @param {number} react 
     * @returns 
     */
  async function makeReaction(msgId, react) {
    const reactData = {
      itemId: msgId,
      vote: react,
      receiverId: chatId,
    }
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res)
      setReactVisible(false);
      setAllMessage((prevMessages) => {
        const newMessages = updateMessageListOnReact(prevMessages, res);
        return newMessages;

      });
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
      // console.log(error)
    }
    return await singleReactionApi(userId, reactData, { successHandler, handleBadReq })
  }


  /**
   *  Handle delete message by message id function
   * @param {number} id 
   * @returns 
   */
  async function deleteMessage(id) {
    async function successHandler(response) {
      const res = await response.json();
      setOptionVisible(false);
      updateMessagesOnDelete(res, id);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
    }
    return await deleteMessageApi(id, userId, chatId, { successHandler, handleBadReq })
  }

  // update messages list after delete message
  const updateMessagesOnDelete = (res, id) => {
    const newMessage = {
      id: chatId,
      lastmessage: res.lastmessage,
      lastMessageTime: res.lastMessageTime,
      status: res.status,
      unreadMessages: res.unreadmessage,
    }
    if (!res.deleteall) {
      dispatch(updateConversationMessage(newMessage))
    } else {
      dispatch(deleteSingleConversation(chatId))
    }
    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const updatedMessages = copyPrevMessages.filter(message => message.id !== id);
      return updatedMessages;
    });
    message.success(res.message);
  }

  // Function for copy message text
  const copyToClipboard = (content) => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    message.success('Message copied successfully!');
    setOptionVisible(false);
  };

  return (
    <MessageCard
      CurrentUserProfile={currentUserProfile}
      userProfile={userProfile}
      deleteMessage={deleteMessage}
      message={singleMessage}
      isOnline={isOnline}
      messages={messages}
      index={index}
      copyToClipboard={copyToClipboard}
      reactVisible={reactVisible}
      setReactVisible={setReactVisible}
      optionVisible={optionVisible}
      setOptionVisible={setOptionVisible}
      makeReaction={makeReaction}
      targetId={targetId}
    />
  );
};

export default ChatCardContainer;