import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../../api/auth';
import { acceptUserApi, deleteMessageApi, getAllMessageApi, makeReadApi, sendMessageApi } from '../../api/chat';
import { selectUserProfile, setCurrentUser } from '../../redux/features/authSlice';
import { deleteSingleConversation, selectActiveUser, setUpdateConversation, setUpdateUnreadCount, updateConversationMessage, updateFriendList } from '../../redux/features/layoutSlice';
import ChattingHomeUi from '../../ui/chatting/chattingHome/ChattingHomeUi';
import { newSocket } from '../../utils/socket';
import { checkLink } from '../../utils/utils';


const ChattingHome = () => {
  let { chatId } = useParams();
  const [currentUserProfile, setCurrentUserProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [messagesText, setMessagesText] = useState('')
  const [messageStatus, setMessageStatus] = useState(null);
  const [pageNumber, setPageNumber] = useState("1");
  const [nextPage, setNextPage] = useState(0);
  const [timer, setTimer] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [allMessage, setAllMessage] = useState([])
  const userProfile = useSelector(selectUserProfile);
  const onlineUsers = useSelector(selectActiveUser);
  const dispatch = useDispatch();
  const userId = userProfile.id;

  // check user online status function
  function isOnline(id) {
    return onlineUsers.indexOf(id) !== -1;
  }

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
    console.log(res)
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
   *  Handle delete message by message id function
   * @param {number} id 
   * @returns 
   */
  async function deleteMessage(id) {
    async function successHandler(response) {
      const res = await response.json();
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
      console.log(error)
      setIsLoading(false);
    }
    return await sendMessageApi(chatId, messageData, { successHandler, handleBadReq })
  }

  // update messages list and conversation after send new message
  const updateMessagesOnSend = (res) => {
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
      copyPrevMessages.push(res.result);
      return copyPrevMessages;
    });
    dispatch(setUpdateConversation(newMessage))
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
      // console.log(res)
      setMessageStatus(res.status)
      dispatch(updateFriendList(res.list))
    }

    async function handleBadReq(response) {
    }
    return await acceptUserApi(requestData, { successHandler, handleBadReq })
  }


  // ***** All Socket Function below ***** //
  const getNewMessage = useCallback(() => {
    newSocket.on('newMessage/user/' + userId, (msg) => {
      if (parseInt(msg.senderId) === parseInt(chatId)) {
        makeReadMessage();
      }
      setAllMessage((prevMessages) => {
        const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
        copyPrevMessages.push(msg);
        return copyPrevMessages;
      });
    })
  }, [userId, makeReadMessage, chatId])

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
    newSocket.on(`isdeleted/${userId}`, (res) => {
      setAllMessage((prevMessages) => {
        const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
        const updatedMessages = copyPrevMessages.filter(message => message.id !== parseInt(res.messageId));
        return updatedMessages;
      });
    });
  }, [userId]);

  useEffect(() => {
    getNewMessage()
    return () => newSocket.off('newMessage/user/' + userId);
  }, [getNewMessage, userId]);

  useEffect(() => {
    dispatch(setCurrentUser(chatId))
    getCurrentUserProfile()

    return () => {
      dispatch(setCurrentUser(null))
    }
  }, [getCurrentUserProfile, chatId, dispatch]);

  useEffect(() => {
    makeReadMessage()
  }, [makeReadMessage]);

  useEffect(() => {
    getAllMessage()
  }, [getAllMessage]);

  useEffect(() => {
    newSocket.on(`isWriting/${userId}`, (res) => {
      if (parseInt(res.userId) === parseInt(chatId)) {
        setIsTyping(true);
      }
    });

    newSocket.on(`isNotWriting/${userId}`, (res) => {
      setIsTyping(false);
    });

    return () => {
      setIsTyping(false);
      newSocket.off(`isWriting/${userId}`);
      newSocket.off(`isNotWriting/${userId}`);
    }
  }, [userId, chatId]);

  return (
    <ChattingHomeUi
      handleSubmitMessage={handleSubmitMessage}
      messagesText={messagesText}
      handleChangeMessage={handleChangeMessage}
      handleBlur={handleBlur}
      allMessage={allMessage}
      setAllMessage={setAllMessage}
      userProfile={userProfile}
      deleteMessage={deleteMessage}
      messageStatus={messageStatus}
      isOnline={isOnline}
      isTyping={isTyping}
      isLoading={isLoading}
      nextPage={nextPage}
      handlePreviousMessage={handlePreviousMessage}
      userRequestFunction={userRequestFunction}
      currentUserProfile={currentUserProfile} />
  );
};

export default ChattingHome;