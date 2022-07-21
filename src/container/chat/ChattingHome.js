import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { userActiveStatusApi } from '../../api/auth';
import { acceptUserApi, getAllMessageApi, makeReadApi } from '../../api/chat';
import { selectUserProfile, setCurrentUser } from '../../redux/features/authSlice';
import { selectLoading, setUpdateUnreadCount, updateFriendList, updateLoading } from '../../redux/features/layoutSlice';
import ChattingHomeUi from '../../ui/chatting/chattingHome/ChattingHomeUi';
import { updateMessageListOnReact } from '../../utils/utils';

const ChattingHome = () => {
  let { chatId } = useParams();
  const [currentUserProfile, setCurrentUserProfile] = useState({})
  const [messageStatus, setMessageStatus] = useState(null);
  const [pageNumber, setPageNumber] = useState("1");
  const [nextPage, setNextPage] = useState(0);
  const [allMessage, setAllMessage] = useState([]);
  const [targetId, setTargetId] = useState(0);
  const userProfile = useSelector(selectUserProfile);
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();
  const userId = userProfile.id;
  const navigate = useNavigate();
  const newSocket = useOutletContext();

  const handlePreviousMessage = () => {
    setPageNumber((prevPage) => {
      const newPageNumber = (parseInt(prevPage) + 1).toString();
      return newPageNumber;
    })
  }


  // update messages list after fetch messages
  const updateMessagesOnLoad = useCallback((res) => {
    setMessageStatus(res.status);
    // console.log(res)
    if (res?.messages?.length > 0) {
      setAllMessage((prevMsg) => {
        let oldMsg = JSON.parse(JSON.stringify(prevMsg));
        let resMsg = JSON.parse(JSON.stringify(res.messages));
        let newMsg = resMsg.concat(oldMsg)
        return newMsg;
      })
    }
    setNextPage(res?.pagination?.nextPage)
    dispatch(updateLoading(false));
  }, [dispatch])

  /**
   * get current user all messages function
   */
  const getAllMessage = useCallback(async () => {
    dispatch(updateLoading(true));
    async function successHandler(response) {
      const res = await response.json();
      console.log(res)
      if (res?.messages.length > 0) {
        setTargetId(res.messages[res?.messages.length - 1].id)
      }
      updateMessagesOnLoad(res);
    }

    async function handleBadReq(response) {
      await response.json();
      dispatch(updateLoading(false));
    }
    return await getAllMessageApi(chatId, pageNumber, { userId: userId }, { successHandler, handleBadReq })
  }, [userId, pageNumber, chatId, dispatch, updateMessagesOnLoad]);



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
    dispatch(updateLoading(true));
    async function successHandler(response) {
      const res = await response.json();
      setCurrentUserProfile(res.user)
      dispatch(updateLoading(false));
    }

    async function handleBadReq(response) {
      // let error = await response.json();
      dispatch(updateLoading(false));
    }
    return await userActiveStatusApi(chatId, { successHandler, handleBadReq })
  }, [chatId, dispatch])


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
    }
  }, [userId, chatId, newSocket]);

  useEffect(() => {
    getNewMessage()
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

  useEffect(() => {
    if (parseInt(chatId) === parseInt(userId)) {
      navigate('/');
    }
  }, [chatId, userId, navigate, targetId]);


  return (
    <ChattingHomeUi
      allMessage={allMessage}
      setAllMessage={setAllMessage}
      messageStatus={messageStatus}
      isLoading={loading}
      nextPage={nextPage}
      newSocket={newSocket}
      userId={userId}
      targetId={targetId}
      handlePreviousMessage={handlePreviousMessage}
      userRequestFunction={userRequestFunction}
      setTargetId={setTargetId}
      currentUserProfile={currentUserProfile} />
  );
};

export default ChattingHome;