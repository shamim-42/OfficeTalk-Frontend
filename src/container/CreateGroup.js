import { useState } from 'react';
import { useSelector } from 'react-redux';
import { creategroupApi } from '../api/chat';
import { selectUserProfile } from '../redux/features/authSlice';
import { selectFriendList } from '../redux/features/layoutSlice';
import CreateGroupModal from '../ui/modal/CreateGroupModal';

const CreateGroup = (props) => {
  const { handleChatGroupCancel } = props;
  const userProfile = useSelector(selectUserProfile);
  const friendList = useSelector(selectFriendList);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectFile, setSelectedFile] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [userList, setUserList] = useState(friendList);

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
    const formData = new FormData();
    formData.append("file", selectFile);
    formData.append("groupname", groupName);
    formData.append("creator", userProfile.id);
    formData.append("people", selectedUser);

    async function successHandler(response) {
      const res = await response.json();
      console.log(res);
    }

    async function handleBadReq(response) {
      let error = await response.json();
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
    />
  );
};

export default CreateGroup;