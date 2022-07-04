import { message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupMessageDeleteApi, groupReactionApi } from '../../api/group';
import { selectActiveUser, updateConversationMessage } from '../../redux/features/layoutSlice';
import MessageCard from '../../ui/chatting/chattingHome/MessageCard';
import { updateMessageListOnReact } from '../../utils/utils';

const GroupCardContainer = (props) => {
  const { singleMessage, userProfile, index, messages, setAllMessage, groupId } = props;
  const userId = userProfile.id;
  const [reactVisible, setReactVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  const dispatch = useDispatch();
  const onlineUsers = useSelector(selectActiveUser);

  // check user online status function
  function isOnline(id) {
    return onlineUsers.indexOf(id) !== -1;
  }

  /**
     * group message reaction function
     * @param {number} msgId 
     * @param {number} react 
     * @returns 
     */
  async function makeReaction(msgId, react) {
    const reactData = {
      itemId: msgId,
      vote: react,
      groupId: groupId,
    }
    async function successHandler(response) {
      const res = await response.json();
      console.log(res)
      setReactVisible(false);
      setAllMessage((prevMessages) => {
        const newMessages = updateMessageListOnReact(prevMessages, res);
        return newMessages;

      });
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error)
    }
    return await groupReactionApi(userId, reactData, { successHandler, handleBadReq })
  }


  /**
   *  Handle delete group message function
   * @param {number} msgId 
   * @returns 
   */
  async function deleteGroupMessage(msgId) {
    async function successHandler(response) {
      const res = await response.json();
      setOptionVisible(false);
      updateMessagesOnDelete(res, msgId);
    }

    async function handleBadReq(response) {
      setOptionVisible(false);
      let error = await response.json();
      message.error(error.message);
    }
    return await groupMessageDeleteApi(msgId, groupId, userId, { successHandler, handleBadReq })
  }

  //  update messages list after delete message
  const updateMessagesOnDelete = (res, msgId) => {
    message.success(res.message);
    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const updatedMessages = copyPrevMessages.filter(message => message.id !== msgId);
      return updatedMessages;
    });
    const newMessage = {
      id: groupId,
      lastmessage: res.lastMessage,
      lastMessageTime: res.lastMessageTime,
      status: 'seen',
      unreadMessages: 0
    }
    dispatch(updateConversationMessage(newMessage))
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
      CurrentUserProfile={singleMessage.user}
      userProfile={userProfile}
      deleteMessage={deleteGroupMessage}
      message={singleMessage}
      isOnline={isOnline}
      messages={messages}
      copyToClipboard={copyToClipboard}
      index={index}
      reactVisible={reactVisible}
      setReactVisible={setReactVisible}
      optionVisible={optionVisible}
      setOptionVisible={setOptionVisible}
      makeReaction={makeReaction}
    />
  );
};

export default GroupCardContainer;