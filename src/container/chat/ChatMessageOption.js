import { message as Alert } from 'antd';
import { useState } from 'react';
import { singleReactionApi } from '../../api/chat';
import MessageOption from "../../ui/chatting/chattingHome/MessageOption";
import { updateMessageListOnReact } from '../../utils/utils';

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
    return await singleReactionApi(userId, reactData, { successHandler, handleBadReq })
  }

  // const updateMessageListOnReact = (res) => {
  //   const result = res.result;
  //   const msgId = res.messageId;
  //   console.log(res)
  //   setAllMessage((prevMessages) => {
  //     const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
  //     const message = copyPrevMessages.find(message => message.id === msgId);
  //     if (message.EmojiTotal.length > 0) {
  //       message.EmojiTotal[0].total_angry = result.total_angry;
  //       message.EmojiTotal[0].total_emoji = result.total_emoji;
  //       message.EmojiTotal[0].total_like = result.total_like;
  //       message.EmojiTotal[0].total_love = result.total_love;
  //       message.EmojiTotal[0].total_sad = result.total_sad;
  //       message.EmojiTotal[0].total_smile = result.total_smile;
  //       message.EmojiTotal[0].total_surprize = result.total_surprize;
  //     } else {
  //       const newReact = {
  //         total_angry: result.total_angry,
  //         total_emoji: result.total_emoji,
  //         total_like: result.total_like,
  //         total_love: result.total_love,
  //         total_sad: result.total_sad,
  //         total_smile: result.total_smile,
  //         total_surprize: result.total_surprize,
  //       }
  //       message.EmojiTotal.push(newReact);
  //     }

  //     return copyPrevMessages;
  //   });
  // }


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