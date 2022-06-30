import { message, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGroupInfo, getGroupMessagesApi, groupMessageDeleteApi, groupMessageSeenApi, groupMessageSendApi } from "../../api/group";
import { selectUserProfile, setCurrentGroup } from "../../redux/features/authSlice";
import { selectActiveUser, selectOnlineGroups, updateConversationGroupMessage, updateConversationGroupSeen, updateConversationGroupStatus, updateConversationMessage } from "../../redux/features/layoutSlice";
import GroupHomeUI from "../../ui/group/GroupHomeUI";
import { newSocket } from "../../utils/socket";
import { udateGroupMessageList } from "../../utils/utils";
// import { checkLink } from "../../utils/utils";

const GroupHome = () => {
  let { id } = useParams();
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const [messageText, setMessageText] = useState("");
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;
  const onlineUsers = useSelector(selectActiveUser);
  const onlineGroups = useSelector(selectOnlineGroups);
  const isGroupOnline = onlineGroups.includes(parseInt(id));
  const dispatch = useDispatch();

  const updateGroupBubbles = useCallback((res) => {
    setAllMessage((prevMessage) => {
      const updatedData = udateGroupMessageList(prevMessage, res);
      return updatedData
    })
  }, []);

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


  /**
   *  Handle delete group message function
   * @param {number} msgId 
   * @returns 
   */
  async function deleteGroupMessage(msgId) {
    async function successHandler(response) {
      const res = await response.json();
      updateMessagesOnDelete(res, msgId);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
    }
    return await groupMessageDeleteApi(msgId, id, userId, { successHandler, handleBadReq })
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
      id: id,
      lastmessage: res.lastMessage,
      lastMessageTime: res.lastMessageTime,
      status: 'seen',
      unreadMessages: 0
    }
    dispatch(updateConversationMessage(newMessage))
  }

  /**
   * make group message as read
   */
  const groupMessageSeen = useCallback(async () => {
    const userInfo = {
      userId: userId
    }
    async function successHandler(response) {
      const res = await response.json();
      console.log(res)
      const groupStatus = {
        groupId: id,
        status: "seen",
        unreadMessages: 0,
      }
      dispatch(updateConversationGroupStatus(groupStatus));

      if (res?.users_seen?.length > 0) {
        dispatch(updateConversationGroupSeen({
          groupId: id,
          users_seen: res.users_seen
        }));
      }
    }

    async function handleBadReq(response) {
      // let error = await response.json();
    }
    return await groupMessageSeenApi(id, userInfo, { successHandler, handleBadReq })
  }, [id, userId, dispatch]);


  /**
   * Get current group all messages fetch
   */
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

  /**
   * Send message to current user function
   * @returns 
   */
  async function handleSubmitMessage() {
    if (messageText.trim().length <= 0 && !messageText) {
      return
    }
    const messageData = {
      message: messageText,
      senderId: userId,
      type: "text",
    }
    async function successHandler(response) {
      const res = await response.json();
      console.log(res);
      updateMessagesOnSend(res);
    }

    async function handleBadReq(response) {
      // let error = await response.json();
    }
    return await groupMessageSendApi(id, messageData, { successHandler, handleBadReq })
  }

  // update messages list after send message
  const updateMessagesOnSend = (res) => {
    setMessageText('');
    const result = res.result;
    const newMessage = {
      lastMessage: res?.content,
      groupId: res?.room?.id,
      lastMessageTime: res?.createdAt,
      name: res?.room?.name,
      image: res?.room?.groupImage,
      unreadMessages: 0,
      type: "group",
      status: res?.status,
      users_seen: []
    }

    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const index = copyPrevMessages.findIndex(message => message.id === result.id);
      if (index === -1) {
        copyPrevMessages.push(result);
      }
      return copyPrevMessages;
    });
    dispatch(updateConversationGroupMessage(newMessage))
  }

  useEffect(() => {
    dispatch(setCurrentGroup(id))
    return () => {
      dispatch(setCurrentGroup(null))
    }
  }, [dispatch, id]);

  useEffect(() => {
    newSocket.on('newMessage/group/', (res) => {
      console.log(res);
      const newMessage = {
        lastMessage: res.content,
        groupId: res.roomId,
        lastMessageTime: res.createdAt,
        unreadMessages: 0,
        status: res.status || 'sent',
      }
      setAllMessage((prevMessages) => {
        const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
        const newMessage = JSON.parse(JSON.stringify(res));
        newMessage.users_seen = [];
        copyPrevMessages.push(newMessage);
        return copyPrevMessages;
      });
      dispatch(updateConversationGroupMessage(newMessage))
      if (res.user.id !== userId) {
        groupMessageSeen();
      }
    })

    return () => {
      newSocket.off('newMessage/group/')
    }
  }, [dispatch, groupMessageSeen, userId]);

  useEffect(() => {
    newSocket.on("groupSeen/" + userId, (res) => {
      console.log(res)
      updateGroupBubbles(res)
    })
  }, [updateGroupBubbles, userId]);

  useEffect(() => {
    newSocket.on('isDeletedGroupMessage/', (res) => {
      setAllMessage((prevMessages) => {
        const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
        const updatedMessages = copyPrevMessages.filter(message => message.id !== parseInt(res.messageId));
        return updatedMessages;
      });
    });
  }, []);

  useEffect(() => {
    newSocket.emit("JoinRoom", id);
    getCurrentGroupInfo()
    getGroupMessages()
  }, [getCurrentGroupInfo, getGroupMessages, id]);

  useEffect(() => {
    groupMessageSeen()
  }, [groupMessageSeen]);

  return (
    <Spin spinning={loading}>
      <GroupHomeUI
        handleChangeMessage={handleChangeMessage}
        userProfile={userProfile}
        groupInfo={groupInfo}
        allMessage={allMessage}
        deleteGroupMessage={deleteGroupMessage}
        isOnline={isOnline}
        messageText={messageText}
        handleSubmitMessage={handleSubmitMessage}
        isGroupOnline={isGroupOnline}
      />
    </Spin>
  );
};

export default GroupHome;