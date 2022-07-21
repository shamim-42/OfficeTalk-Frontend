import { message, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import { getGroupInfo, getGroupMessagesApi, groupMessageSeenApi } from "../../api/group";
import { selectUserProfile, setCurrentGroup } from "../../redux/features/authSlice";
import { selectOnlineGroups, updateConversationGroupMessage, updateConversationGroupSeen, updateConversationGroupStatus } from "../../redux/features/layoutSlice";
import GroupHomeUI from "../../ui/group/GroupHomeUI";
import { udateGroupMessageList, updateMessageListOnReact } from "../../utils/utils";
// import { checkLink } from "../../utils/utils";

const GroupHome = () => {
  let { id } = useParams();
  const [groupInfo, setGroupInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const [pageNumber, setPageNumber] = useState("1");
  const [nextPage, setNextPage] = useState(0);
  const [targetId, setTargetId] = useState(0);
  const userProfile = useSelector(selectUserProfile);
  const userId = userProfile.id;
  const onlineGroups = useSelector(selectOnlineGroups);
  const isGroupOnline = onlineGroups.includes(parseInt(id));
  const dispatch = useDispatch();
  const newSocket = useOutletContext();

  const handlePreviousMessage = () => {
    setPageNumber((prevPage) => {
      const newPageNumber = (parseInt(prevPage) + 1).toString();
      return newPageNumber;
    })
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
   * make group message as read
   */
  const groupMessageSeen = useCallback(async () => {
    const userInfo = {
      userId: userId
    }
    async function successHandler(response) {
      const res = await response.json();
      // console.log(res)
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
    const userId = userProfile.id;
    const payload = {
      userId: userId,
    }
    async function successHandler(response) {
      const res = await response.json();
      if (res?.messages.length > 0) {
        setTargetId(res.messages[res?.messages.length - 1].id)
      }
      updateMessagesOnLoad(res);
    }

    async function handleBadReq(response) {
      let error = await response.json();
      message.error(error.message);
      // console.log(error)
    }
    return await getGroupMessagesApi(id, pageNumber, payload, { successHandler, handleBadReq })
  }, [id, userProfile, pageNumber]);

  // update messages list after fetch messages
  const updateMessagesOnLoad = (res) => {
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
  }

  /**
   * update message list on received new message
   */
  const updateAllMessagesOnReceive = useCallback((res) => {
    if (parseInt(res.roomId) !== parseInt(id)) {
      return;
    }
    const newMessage = {
      lastMessage: res.content,
      groupId: res.roomId,
      lastMessageTime: res.createdAt,
      unreadMessages: 0,
      status: res.status,
    }
    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const newMessage = JSON.parse(JSON.stringify(res));
      if (res.prevMsgId) {
        let prevIndex = -1;
        const prevMessage = copyPrevMessages.find(message => message.id === res.prevMsgId);
        if (prevMessage?.readMessage?.length > 0) {
          prevIndex = prevMessage?.readMessage.findIndex(user => user.userId === res.user.id);
        }
        if (prevIndex > -1) {
          prevMessage?.readMessage?.splice(prevIndex, 1);
        }
      }
      newMessage.EmojiTotal = [];
      newMessage.Emoji = [];
      newMessage.readMessage = [res?.readMessage];
      copyPrevMessages.push(newMessage);
      return copyPrevMessages;
    });
    if (res.user.id !== userId) {
      dispatch(updateConversationGroupMessage(newMessage))
      groupMessageSeen();
    } else {

    }
    setTargetId(res.id);
  }, [dispatch, userId, groupMessageSeen, id]);

  /**
   * update seen user bubble list
   */
  const updateUserSeenList = useCallback((res) => {
    setAllMessage((prevMessage) => {
      const updatedData = udateGroupMessageList(prevMessage, res);
      return updatedData
    })
  }, [])

  /**
   * update user reaction on message
   */
  const updateUserReactList = useCallback((res) => {
    setAllMessage((prevMessages) => {
      const newMessages = updateMessageListOnReact(prevMessages, res);
      return newMessages;
    });
  }, [])

  /**
   * update all message list on delete message
   */
  const updateMessageListOnDelete = useCallback((res) => {
    setAllMessage((prevMessages) => {
      const copyPrevMessages = JSON.parse(JSON.stringify(prevMessages));
      const updatedMessages = copyPrevMessages.filter(message => message.id !== parseInt(res.messageId));
      return updatedMessages;
    });
  }, [])

  /**
   * All useEffect Function below
   */
  useEffect(() => {
    dispatch(setCurrentGroup(id))
    return () => {
      dispatch(setCurrentGroup(null))
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (newSocket) {
      newSocket.on('newMessage/group/', (res) => {
        // console.log(res);
        updateAllMessagesOnReceive(res);
      })
    }

    return () => {
      if (newSocket) {
        newSocket.off('newMessage/group/')
      }
    }
  }, [updateAllMessagesOnReceive, newSocket]);

  useEffect(() => {
    if (newSocket) {
      newSocket.emit("JoinRoom", id);

      newSocket.on("groupSeen/", (res) => {
        // console.log(res)
        updateUserSeenList(res);
      })

      newSocket.on("isReactedGroup/", (res) => {
        updateUserReactList(res)
      })

      newSocket.on('isDeletedGroupMessage/', (res) => {
        updateMessageListOnDelete(res);
      });
    }

  }, [updateUserReactList, updateUserSeenList, updateMessageListOnDelete, newSocket, id]);

  useEffect(() => {
    getCurrentGroupInfo()
    getGroupMessages()
  }, [getCurrentGroupInfo, getGroupMessages])

  useEffect(() => {
    groupMessageSeen();

    return () => {
      setAllMessage([]);
      setPageNumber("1");
    }
  }, [groupMessageSeen]);

  return (
    <Spin spinning={loading}>
      <GroupHomeUI
        userProfile={userProfile}
        groupInfo={groupInfo}
        allMessage={allMessage}
        handlePreviousMessage={handlePreviousMessage}
        setAllMessage={setAllMessage}
        isGroupOnline={isGroupOnline}
        setTargetId={setTargetId}
        nextPage={nextPage}
        groupId={id}
        targetId={targetId}
        userId={userId}
      />
    </Spin>
  );
};

export default GroupHome;