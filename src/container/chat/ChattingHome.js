import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../../api/auth';
import { acceptUserApi, getAllMessageApi, makeReadApi, sendMessageApi } from '../../api/chat';
import { selectUserProfile } from '../../redux/features/authSlice';
import { selectActiveUser, setUpdateConversation, setUpdateUnreadCount } from '../../redux/features/layoutSlice';
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
  const userProfile = useSelector(selectUserProfile)
  const onlineUsers = useSelector(selectActiveUser)
  const dispatch = useDispatch();
  const userId = userProfile.id;
  // const state={value: userId};

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

  // handle on blur event function
  const handleBlur = () => {
    setTimer(setTimeout(() => {
      newSocket.emit('isNotWriting', { chatId: chatId, userId: userId });
    }, 2000));
  }

  // get current user profile function
  const getCurrentUserProfile = useCallback(async () => {
    async function successHandler(response) {
      const res = await response.json();
      setCurrentUserProfile(res.user)
      setIsLoading(false);
    }

    async function handleBadReq(response) {
      // let error = await response.json();
      // console.log(error.message);
      setIsLoading(false);
    }

    return await userActiveStatusApi(chatId, { successHandler, handleBadReq })
  }, [chatId])

  // get current user all message list function
  const getAllMessage = useCallback(async (id) => {

    async function successHandler(response) {
      const res = await response.json();
      setMessageStatus(res.status);
      console.log(res.messages)
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

  // Send message function
  async function handleSubmitMessage() {
    newSocket.emit('isNotWriting', { chatId: chatId, userId: userId });
    if (messagesText.trim().length <= 0) {
      return
    }
    console.log(checkLink(messagesText))
    const messageData = {
      message: messagesText,
      senderId: userId,
      type: "text"
    }

    async function successHandler(response) {
      const res = await response.json();
      updateConversationList(res.result)
      setMessagesText('')
      getAllMessage(chatId);
    }

    async function handleBadReq(response) {
      // let error = await response.json();
      // console.log(error.message);
      setIsLoading(false);
    }

    return await sendMessageApi(chatId, messageData, { successHandler, handleBadReq })
  }



  // Send message function
  async function sendHiMessage() {
    setIsLoading(true);
    newSocket.emit('isNotWriting', { chatId: chatId, userId: userId });
    const messageData = {
      message: "Hi !",
      senderId: userId,
      type: "text"
    }

    async function successHandler(response) {
      const res = await response.json();
      updateConversationList(res.result)
      getAllMessage(chatId);
      setIsLoading(false);
    }

    async function handleBadReq(response) {
      setIsLoading(false);
    }

    return await sendMessageApi(chatId, messageData, { successHandler, handleBadReq })
  }


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
    }

    async function handleBadReq(response) {
    }

    return await acceptUserApi(requestData, { successHandler, handleBadReq })
  }

  // make message as read message 
  const makeReadMessage = useCallback(async () => {
    const payload = {
      senderId: chatId,
    }
    async function successHandler(response) {
      // console.log("first")
      dispatch(setUpdateUnreadCount(chatId))
    }

    async function handleBadReq(response) {
    }

    return await makeReadApi(userProfile.id, payload, { successHandler, handleBadReq })
  }, [dispatch, chatId, userProfile.id])

  useEffect(() => {
    getCurrentUserProfile()
  }, [getCurrentUserProfile])

  const getNewMessage = useCallback((chatId) => {
    newSocket.on('newMessage/user/' + userId, (msg) => {
      if (parseInt(msg.senderId) === parseInt(chatId)) {
        makeReadMessage();
      }
      getAllMessage(chatId)
    })
  }, [userId, getAllMessage, makeReadMessage])

  useEffect(() => {
    getNewMessage(chatId)
    return () => newSocket.off('newMessage/user/' + userId);
  }, [chatId, getNewMessage, userId])



  useEffect(() => {
    getAllMessage(chatId)
  }, [getAllMessage, chatId])

  useEffect(() => {
    makeReadMessage()
  }, [makeReadMessage])

  useEffect(() => {
    // console.log("user: ", userId)
    newSocket.on(`isWriting/${userId}`, (res) => {
      if (parseInt(res.userId) === parseInt(chatId)) {
        setIsTyping(true);
      }
      console.log("chat", chatId);
    });

    newSocket.on(`isNotWriting/${userId}`, (res) => {
      setIsTyping(false);
    });

    return () => {
      setIsTyping(false);
      newSocket.off(`isWriting/${userId}`);
      newSocket.off(`isNotWriting/${userId}`);
    }
  }, [userId, chatId])


  return (
    <ChattingHomeUi
      handleSubmitMessage={handleSubmitMessage}
      messagesText={messagesText}
      handleChangeMessage={handleChangeMessage}
      handleBlur={handleBlur}
      allMessage={allMessage}
      userProfile={userProfile}
      sendHiMessage={sendHiMessage}
      messageStatus={messageStatus}
      isOnline={isOnline}
      isTyping={isTyping}
      isLoading={isLoading}
      userRequestFunction={userRequestFunction}
      currentUserProfile={currentUserProfile} />
  );
};

export default ChattingHome;
