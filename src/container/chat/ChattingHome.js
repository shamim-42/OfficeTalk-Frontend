import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../../api/auth';
import { acceptUserApi, getAllMessageApi, makeReadApi, sendMessageApi } from '../../api/chat';
import useSocket from '../../hooks/useSocket';
import { selectUserProfile, setCurrentUser } from '../../redux/features/authSlice';
import { setUpdateConversation, setUpdateUnreadCount, updateFriendList } from '../../redux/features/layoutSlice';
import ChattingHomeUi from '../../ui/chatting/chattingHome/ChattingHomeUi';
import { checkLink, updateMessageListOnReact } from '../../utils/utils';


const ChattingHome = () => {
  let { chatId } = useParams();
  const [currentUserProfile, setCurrentUserProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const { socket: newSocket } = useSocket();
  const [messagesText, setMessagesText] = useState('')
  const [messageStatus, setMessageStatus] = useState(null);
  const [pageNumber, setPageNumber] = useState("1");
  const [nextPage, setNextPage] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [allMessage, setAllMessage] = useState([])
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const userId = userProfile.id;

  // handle on change message function
  const handleChangeMessage = (e) => {
    setMessagesText(e.target.value);
    newSocket.emit('isWriting', { chatId: chatId, userId: userId });
    if (timer) {
      clearTimeout(timer);
    }
  }

  const handlePreviousMessage = () => {
    setPageNumber((prevPage) => {
      const newPageNumber = (parseInt(prevPage) + 1).toString();
      return newPageNumber;
    })
  }

  /**
   * get current user all messages function
   */
  const getAllMessage = useCallback(async () => {
    async function successHandler(response) {
      const res = await response.json();
      updateMessagesOnLoad(res);
    }

    async function handleBadReq(response) {
      await response.json();
      setIsLoading(false);
    }
    return await getAllMessageApi(chatId, pageNumber, { userId: userId }, { successHandler, handleBadReq })
  }, [userId, pageNumber, chatId]);

  // update messages list after fetch messages
  const updateMessagesOnLoad = (res) => {
    setMessageStatus(res.status);
    // console.log(res)
    if (res?.messages?.length > 0) {
      setAllMessage((prevMsg) => {
        let oldMsg = JSON.parse(JSON.stringify(prevMsg));
        let resMsg = JSON.parse(JSON.stringify(res.messages));
        let newMsg = oldMsg.concat(resMsg)
        return newMsg;
      })
    }
    setNextPage(res?.pagination?.nextPage)
    setIsLoading(false)
  }

  /**
   * Send message to current user function
   * @param {*} e 
   * @param {string} msg 
   * @returns 
   */
  async function handleSubmitMessage(e, msg = null) {
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
      // console.log(error)
      setIsLoading(false);
    }
    return await sendMessageApi(chatId, messageData, { successHandler, handleBadReq })
  }

  // update messages list and conversation after send new message
  const updateMessagesOnSend = (res) => {
    // console.log(res);
    const result = res.result;
    const status = res.status;
    const newMessage = {
      id: res.conversationId,
      users_id: parseInt(result.receiverId),
      image: currentUserProfile.profileImage,
      name: currentUserProfile.fullname,
      lastMessage: result?.content,
      sentBy: result.senderId,
      lastMessageTime: result?.createdAt,
      unreadMessages: 0,
      status: status,
      type: "single",
    }

    setMessagesText('')
    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const newMessage = JSON.parse(JSON.stringify(res.result));
      newMessage.EmojiTotal = [];
      newMessage.Emoji = [];
      copyPrevMessages.push(newMessage);
      return copyPrevMessages;
    });
    // console.log("first")
    dispatch(setUpdateConversation(newMessage));
  }

  // make message as read message 
  const makeReadMessage = useCallback(async () => {
    const payload = {
      senderId: chatId,
    }
    async function successHandler(response) {
      // const res = await response.json();
      dispatch(setUpdateUnreadCount(chatId))
    }

    async function handleBadReq(response) {
    }
    return await makeReadApi(userProfile.id, payload, { successHandler, handleBadReq })
  }, [dispatch, chatId, userProfile.id])


  /**
   * get current user profile function
   */
  const getCurrentUserProfile = useCallback(async () => {
    async function successHandler(response) {
      const res = await response.json();
      setCurrentUserProfile(res.user)
      setIsLoading(false);
    }

    async function handleBadReq(response) {
      // let error = await response.json();
      setIsLoading(false);
    }
    return await userActiveStatusApi(chatId, { successHandler, handleBadReq })
  }, [chatId])

  // Accept or Reject a user function
  async function userRequestFunction(msg) {
    const requestData = {
      desicion: msg,
      senderId: chatId,
      receiverId: userId,
    }
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res);
      setMessageStatus(res.status)
      dispatch(updateFriendList(res.list))
    }

    async function handleBadReq(response) {
    }
    return await acceptUserApi(requestData, { successHandler, handleBadReq })
  }


  // ***** All Socket Function below ***** //
  const getNewMessage = useCallback(() => {
    if (newSocket) {
      newSocket.on('newMessage/user/' + userId, (msg) => {
        if (parseInt(msg.senderId) === parseInt(chatId)) {
          makeReadMessage();
          setAllMessage((prevMessages) => {
            const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
            const newMessage = JSON.parse(JSON.stringify(msg));
            newMessage.EmojiTotal = [];
            newMessage.Emoji = [];
            copyPrevMessages.push(newMessage);
            return copyPrevMessages;
          });
        }
      })
    }
  }, [userId, makeReadMessage, chatId, newSocket])

  // handle on blur event function
  const handleBlur = () => {
    setTimer(setTimeout(() => {
      newSocket.emit('isNotWriting', { chatId: chatId, userId: userId });
    }, 2000));
  }

  /**
   * All useEffect Function below
   */
  useEffect(() => {
    if (newSocket) {
      newSocket.on(`isdeleted/${userId}`, (res) => {
        setAllMessage((prevMessages) => {
          const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
          const updatedMessages = copyPrevMessages.filter(message => message.id !== parseInt(res.messageId));
          return updatedMessages;
        });
      });

      newSocket.on(`isReactedSingle/${userId}`, (res) => {
        // console.log(res)
        setAllMessage((prevMessages) => {
          const newMessages = updateMessageListOnReact(prevMessages, res);
          return newMessages;

        });
      });

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

  useEffect(() => {
    getNewMessage()
    return () => {
      if (newSocket) {
        newSocket.off('newMessage/user/' + userId);
      }
    }
  }, [getNewMessage, userId, newSocket]);

  useEffect(() => {
    getCurrentUserProfile()
    getAllMessage()

  }, [getCurrentUserProfile, getAllMessage]);

  useEffect(() => {
    makeReadMessage()
    dispatch(setCurrentUser(chatId))

    return () => {
      setAllMessage([]);
      dispatch(setCurrentUser(null))
      setPageNumber("1");
    }
  }, [makeReadMessage, chatId, dispatch]);


  return (
    <ChattingHomeUi
      handleSubmitMessage={handleSubmitMessage}
      messagesText={messagesText}
      handleChangeMessage={handleChangeMessage}
      handleBlur={handleBlur}
      allMessage={allMessage}
      setAllMessage={setAllMessage}
      messageStatus={messageStatus}
      isTyping={isTyping}
      isLoading={isLoading}
      nextPage={nextPage}
      handlePreviousMessage={handlePreviousMessage}
      userRequestFunction={userRequestFunction}
      currentUserProfile={currentUserProfile} />
  );
};

export default ChattingHome;