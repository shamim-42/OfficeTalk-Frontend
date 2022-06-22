import { Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGroupInfo, getGroupMessagesApi, groupMessageSendApi } from "../../api/group";
import { selectUserProfile, setCurrentGroup } from "../../redux/features/authSlice";
import { selectActiveUser, updateConversationGroupMessage } from "../../redux/features/layoutSlice";
import GroupHomeUI from "../../ui/group/GroupHomeUI";
import { newSocket } from "../../utils/socket";
import { checkLink } from "../../utils/utils";


const GroupHome = () => {
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const [messageText, setMessageText] = useState("");
  const userProfile = useSelector(selectUserProfile);
  const onlineUsers = useSelector(selectActiveUser);
  let { id } = useParams();
  const userId = userProfile.id;
  const dispatch = useDispatch();

  // Update message text function on change
  const handleChangeMessage = (e) => {
    setMessageText(e.target.value);
  }

  // check user online status function
  function isOnline(id) {
    return onlineUsers.indexOf(id) !== -1;
  }

  // get current group information
  const getCurrentGroupInfo = useCallback(async () => {
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res);
      setGroupInfo(res[0]);
      setLoading(false);
    }

    async function handleBadReq(response) {
      // let error = await response.json();
      setLoading(false);
    }
    return await getGroupInfo(id, userId, { successHandler, handleBadReq })
  }, [id, userId]);

  // Get current group all messages
  const getGroupMessages = useCallback(async () => {
    const payload = {
      userId: userId,
    }
    async function successHandler(response) {
      const res = await response.json();
      setAllMessage(res.messages);
      // console.log(res);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      console.log(error)
    }
    return await getGroupMessagesApi(id, payload, { successHandler, handleBadReq })
  }, [id, userId]);


  // // Handle delete message
  // async function deleteMessage(id) {
  //   async function successHandler(response) {
  //     const res = await response.json();
  //     console.log(res);
  //     getGroupMessages();

  //     if (!res.deleteall) {
  //       dispatch(updateConversationMessage({ id: chatId, lastmessage: res.lastmessage }))
  //     } else {
  //       dispatch(deleteSingleConversation(chatId))
  //     }

  //     newSocket.emit('isdeleted', { chatId: chatId, userId: userId });
  //     message.success(res.message);
  //   }

  //   async function handleBadReq(response) {
  //     let error = await response.json();
  //     message.error(error.message);
  //   }

  //   return await deleteMessageApi(id, userId, { successHandler, handleBadReq })
  // }

  // Send message to current user function
  async function handleSubmitMessage() {
    if (messageText.trim().length <= 0 && !messageText) {
      return
    }
    let messageLinks = null;
    const isLink = checkLink(messageText)
    if (isLink) messageLinks = isLink;

    const messageData = {
      message: messageText,
      senderId: userId,
      type: "text",
      // links: messageLinks,
    }
    async function successHandler(response) {
      const res = await response.json();
      const newMessage = {
        lastMessage: res?.content,
        groupId: res?.room?.id,
        message_Status_lastMessageTime: res?.createdAt,
        name: res?.room?.name,
        groupImage: res?.room?.groupImage,
        unreadMessages: 0,
        type: "group"
      }
      dispatch(updateConversationGroupMessage(newMessage))
      setMessageText('');
      getGroupMessages();
    }

    async function handleBadReq(response) {
      // let error = await response.json();
    }
    return await groupMessageSendApi(id, messageData, { successHandler, handleBadReq })
  }


  useEffect(() => {
    dispatch(setCurrentGroup(id))
    return () => {
      dispatch(setCurrentGroup(null))
      setAllMessage([])
    }
  }, [dispatch, id]);

  useEffect(() => {
    newSocket.on('newMessage/group/', (res) => {
      console.log(res)
      const newMessage = {
        lastMessage: res.content,
        groupId: res.roomId,
        message_Status_lastMessageTime: res.createdAt,
        name: res.groupName,
        groupImage: res.groupImg,
        unreadMessages: res.unread,
        type: "group"
      }
      dispatch(updateConversationGroupMessage(newMessage))
      getGroupMessages();
    })

    return () => {
      newSocket.off('newMessage/group/')
    }
  }, [id, dispatch, getGroupMessages, userId]);

  useEffect(() => {
    newSocket.emit("JoinRoom", id);
    getCurrentGroupInfo()
    getGroupMessages()
  }, [getCurrentGroupInfo, getGroupMessages, id]);

  return (
    <Spin spinning={loading}>
      <GroupHomeUI
        handleChangeMessage={handleChangeMessage}
        userProfile={userProfile}
        groupInfo={groupInfo}
        allMessage={allMessage}
        isOnline={isOnline}
        messageText={messageText}
        handleSubmitMessage={handleSubmitMessage}
      />
    </Spin>
  );
};

export default GroupHome;