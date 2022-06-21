import { message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creategroupApi } from '../../api/group';
import { selectUserProfile } from '../../redux/features/authSlice';
import { selectFriendList, setAddConversation } from '../../redux/features/layoutSlice';
import CreateGroupModal from '../../ui/modal/CreateGroupModal';

const CreateGroup = (props) => {
  const { handleChatGroupCancel, setIsChatGroupModalVisible } = props;
  const userProfile = useSelector(selectUserProfile);
  const friendList = useSelector(selectFriendList);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectFile, setSelectedFile] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [userList, setUserList] = useState(friendList);
  const [loading, setLoading] = useState(false);

  const handleChangefile = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleChangeGroupName = (e) => {
    setGroupName(e.target.value);
  }

  const addUserOnClick = (id) => {
    if (selectedUser.includes(id)) {
      const newList = selectedUser.filter((item) => item !== id);
      setSelectedUser(newList);
    } else {
      setSelectedUser((prev) => [...prev, id]);
    }
  }

  const handleChangeUserSearch = (e) => {
    const value = e.target.value;
    const searchResult = friendList.filter(user => user["fullname"].toLowerCase().includes(value.toLowerCase()));
    setUserList(searchResult);
  }

  // Handle edit profileImage function
  const handleCreateGroup = async () => {
    if (!selectFile) {
      return
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectFile);
    formData.append("groupname", groupName);
    formData.append("creator", JSON.stringify(userProfile));
    formData.append("people", selectedUser);

    async function successHandler(response) {
      const res = await response.json();
      // console.log(res);
      const newGroup = {
        groupImage: res.roomimg,
        groupId: res.roominfo.id,
        lastMessage: res.msg,
        message_Status_lastMessageTime: res.roominfo.updated_at,
        type: 'group',
        unreadmessage: 0,
        name: res.roominfo.name,
      }
      dispatch(setAddConversation(newGroup));
      setLoading(false);
      message.success("Group created successfully!");
      handleChatGroupCancel();
    }

    async function handleBadReq(response) {
      let error = await response.json();
      setLoading(false);
      console.log(error);
    }

    return await creategroupApi(formData, {
      successHandler, handleBadReq, encoder: (r) => r,
      removeContentType: true
    })
  };

  return (
    <CreateGroupModal
      handleChatGroupCancel={handleChatGroupCancel}
      handleChangeUserSearch={handleChangeUserSearch}
      handleCreateGroup={handleCreateGroup}
      selectedUser={selectedUser}
      addUserOnClick={addUserOnClick}
      userList={userList}
      selectFile={selectFile}
      handleChangefile={handleChangefile}
      handleChangeGroupName={handleChangeGroupName}
      loading={loading}
    />
  );
};

export default CreateGroup;