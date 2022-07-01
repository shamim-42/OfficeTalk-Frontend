import { message as Alert } from 'antd';
import { useState } from 'react';
import { singleReactionApi } from '../../api/chat';
import MessageOption from "../../ui/chatting/chattingHome/MessageOption";

const ChatMessageOption = (props) => {
  const [reactVisible, setReactVisible] = useState(false);
  const [optionVisible, setOptionVisible] = useState(false);
  const { message, align, deleteMessage, isDelete, setAllMessage, CurrentUserProfile, userProfile } = props;
  const chatId = CurrentUserProfile.id;
  const userId = userProfile.id;

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
      updateMessageListOnReact(res, msgId);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error)
    }
    return await singleReactionApi(userId, reactData, { successHandler, handleBadReq })
  }

  const updateMessageListOnReact = (res, msgId) => {
    setReactVisible(false);
    console.log(res)
    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const message = copyPrevMessages.find(message => message.id === msgId);
      message.SingleEmojiTotal[0].total_angry = res.result.total_angry;
      message.SingleEmojiTotal[0].total_emoji = res.result.total_emoji;
      message.SingleEmojiTotal[0].total_like = res.result.total_like;
      message.SingleEmojiTotal[0].total_love = res.result.total_love;
      message.SingleEmojiTotal[0].total_sad = res.result.total_sad;
      message.SingleEmojiTotal[0].total_smile = res.result.total_smile;
      message.SingleEmojiTotal[0].total_surprize = res.result.total_surprize;

      return copyPrevMessages;
    });
  }


  // Function for copy message text
  const copyToClipboard = (content) => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    Alert.success('Message copied successfully!');
    setOptionVisible(false);
  };

  return (
    <MessageOption
      isDelete={isDelete}
      deleteMessage={deleteMessage}
      copyToClipboard={copyToClipboard}
      reactVisible={reactVisible}
      setReactVisible={setReactVisible}
      optionVisible={optionVisible}
      message={message}
      makeReaction={makeReaction}
      setOptionVisible={setOptionVisible}
      align={align}
    />
  );
};

export default ChatMessageOption;