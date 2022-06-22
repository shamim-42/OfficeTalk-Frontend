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

  // ***** All function for handle messages ***** \\
  // handle on change message function
  const handleChangeMessage = (e) => {
    setMessagesText(e.target.value);
    newSocket.emit('isWriting', { chatId: chatId, userId: userId });
    if (timer) {
      clearTimeout(timer);
    }
  }

  // Handle delete message
  async function deleteMessage(id) {
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res);
      getAllMessage(chatId);

      if (!res.deleteall) {
        dispatch(updateConversationMessage({ id: chatId, lastmessage: res.lastmessage }))
      } else {
        dispatch(deleteSingleConversation(chatId))
      }

      newSocket.emit('isdeleted', { chatId: chatId, userId: userId });
      message.success(res.message);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
    }

    return await deleteMessageApi(id, userId, chatId, { successHandler, handleBadReq })
  }

  // get current user all messages function
  const getAllMessage = useCallback(async (id) => {
    async function successHandler(response) {
      const res = await response.json();
      setMessageStatus(res.status);
      console.log(res)
      if (res?.messages?.length > 0) {
        setAllMessage(res?.messages)
      } else {
        setAllMessage([])
      }
      setIsLoading(false)
    }

    async function handleBadReq(response) {
      await response.json();
      setIsLoading(false);
    }
    return await getAllMessageApi(id, { userId: userId }, {
      successHandler, handleBadReq,
      urlParams: { page: 1 }
    })
  }, [userId])

  // Send message to current user function
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
      // console.log(res);
      updateConversationList(res.result)
      setMessagesText('')
      getAllMessage(chatId);
    }

    async function handleBadReq(response) {
      // let error = await response.json();
      setIsLoading(false);
    }
    return await sendMessageApi(chatId, messageData, { successHandler, handleBadReq })
  }

  // add or update message on conversations List
  const updateConversationList = (res) => {
    let status = "seen";
    newSocket.on('delevered/' + userId, (res) => {
      status = res.status;
    })

    const newMessage = {
      users_id: parseInt(res.receiverId),
      users_profileImage: currentUserProfile.profileImage,
      users_fullname: currentUserProfile.fullname,
      message_Status_lastMessage: res?.content,
      message_Status_lastMessageTime: res?.createdAt,
      message_Status_unreadMessages: 0,
      message_Status_status: status,
    }
    dispatch(setUpdateConversation(newMessage))
  }

  // make message as read message 
  const makeReadMessage = useCallback(async () => {
    const payload = {
      senderId: chatId,
    }
    async function successHandler(response) {
      dispatch(setUpdateUnreadCount(chatId))
    }

    async function handleBadReq(response) {
    }
    return await makeReadApi(userProfile.id, payload, { successHandler, handleBadReq })
  }, [dispatch, chatId, userProfile.id])


  // ***** All function about current user *****\
  // get current user profile function
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
  const getNewMessage = useCallback((chatId) => {
    newSocket.on('newMessage/user/' + userId, (msg) => {
      if (parseInt(msg.senderId) === parseInt(chatId)) {
        makeReadMessage();
      }
      getAllMessage(chatId)
    })
  }, [userId, getAllMessage, makeReadMessage])

  // handle on blur event function
  const handleBlur = () => {
    setTimer(setTimeout(() => {
      newSocket.emit('isNotWriting', { chatId: chatId, userId: userId });
    }, 2000));
  }


  // ***** All useEffect Function below ***** //
  useEffect(() => {
    getCurrentUserProfile()
  }, [getCurrentUserProfile])

  useEffect(() => {
    getNewMessage(chatId)
    return () => newSocket.off('newMessage/user/' + userId);
  }, [chatId, getNewMessage, userId])

  useEffect(() => {
    dispatch(setCurrentUser(chatId))
    getAllMessage(chatId)

    return () => {
      dispatch(setCurrentUser(null))
    }
  }, [getAllMessage, chatId, dispatch])

  useEffect(() => {
    console.log("chating home")
    makeReadMessage()
  }, [makeReadMessage])

  useEffect(() => {
    newSocket.on(`isWriting/${userId}`, (res) => {
      if (parseInt(res.userId) === parseInt(chatId)) {
        setIsTyping(true);
      }
    });

    newSocket.on(`isNotWriting/${userId}`, (res) => {
      setIsTyping(false);
    });

    newSocket.on(`isdeleted/${userId}`, (res) => {
      getAllMessage(chatId)
    });

    return () => {
      setIsTyping(false);
      newSocket.off(`isWriting/${userId}`);
      newSocket.off(`isNotWriting/${userId}`);
      setAllMessage([])
    }
  }, [userId, chatId, getAllMessage]);


  return (
    <ChattingHomeUi
      handleSubmitMessage={handleSubmitMessage}
      messagesText={messagesText}
      handleChangeMessage={handleChangeMessage}
      handleBlur={handleBlur}
      allMessage={allMessage}
      userProfile={userProfile}
      deleteMessage={deleteMessage}
      messageStatus={messageStatus}
      isOnline={isOnline}
      isTyping={isTyping}
      isLoading={isLoading}
      userRequestFunction={userRequestFunction}
      currentUserProfile={currentUserProfile} />
  );
};

export default ChattingHome;