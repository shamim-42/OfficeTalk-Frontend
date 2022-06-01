import { Avatar, Button, Input } from 'antd';
import React, { useState } from 'react';
import { BiRadioCircle, BiRadioCircleMarked, BiSearch } from "react-icons/bi";
import { MdOutlinePhotoCamera } from "react-icons/md";


const users = [
  {
    id: 1,
    name: 'Hasan Mahamud',
    img: 'https://i.ibb.co/n8yn9CM/Ellipse-4.png',
    status: true,
  },
  {
    id: 2,
    name: 'Abu Sayeed',
    img: 'https://i.ibb.co/ZMDbjf7/Ellipse-4-3.png',
    status: true,
  },
  {
    id: 3,
    name: 'Muaaj Muhammad',
    img: 'https://i.ibb.co/mXz61cM/Ellipse-4-1.png',
    status: true,
  },
  {
    id: 4,
    name: 'Saidul Islam',
    img: 'https://i.ibb.co/ZWwbcST/Ellipse-4-2.png',
    status: true,
  },
  {
    id: 5,
    name: 'Adnan ',
    img: 'https://i.ibb.co/rsJ7tdT/Ellipse-12.png',
    status: true,
  },
  {
    id: 6,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    id: 7,
    name: 'Nayeem Hasan',
    img: 'https://i.ibb.co/f8vbXxB/Ellipse-18.png',
    status: true,
  },
  {
    id: 8,
    name: 'Shad Ahamed',
    img: 'https://i.ibb.co/FqN6tTg/Ellipse-14.png',
    status: true,
  },
  {
    id: 9,
    name: 'Adnan ',
    img: 'https://i.ibb.co/rsJ7tdT/Ellipse-12.png',
    status: false,
  },
  {
    id: 10,
    name: 'Ahamed Sabbir',
    img: 'https://i.ibb.co/nCR4Z9N/Ellipse-10.png',
    status: true,
  },
  {
    id: 11,
    name: 'Shamim Hossain',
    img: 'https://i.ibb.co/Q89Q7wV/Ellipse-8.png',
    status: true,
  },
]

const CreateGroupModal = (props) => {
  const { handleChatGroupCancel } = props;
  const [userList, setUserList] = useState(users);
  const [selectedUser, setSelectedUser] = useState([]);

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
    const searchResult = users.filter(user => user["name"].toLowerCase().includes(value.toLowerCase()));
    setUserList(searchResult);
  }

  return (
    <div>
      <Button
        onClick={handleChatGroupCancel}
        className="modal-cross-button">
        X
      </Button>
      <h3 className="create-group-title">
        Create a chat group
      </h3>
      <div className="upload-group-photo">
        <MdOutlinePhotoCamera />
      </div>
      <Input className="create-group-input" placeholder="Group Name" />

      <div className="create-group-userlist">
        <div className="user-search-container">
          <div>
            <Input
              className="regular-input user-search"
              onChange={handleChangeUserSearch}
              prefix={<BiSearch />}
              placeholder="Search"
            />
          </div>
          <p className="user-count">
            ({selectedUser.length})
          </p>
        </div>

        <div className="user-list-items">
          {
            userList.length > 0 && userList.map((user) => {
              return (
                <div className={`user-list-item`}
                  onClick={() => addUserOnClick(user.id)}
                  key={user.id}>
                  <div className="user-info">
                    <Avatar
                      src={user.img}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                      }}
                    />
                    <p className="user-name">{user.name}</p>
                  </div>
                  <div className="radio-icon">
                    {selectedUser.includes(user.id) ? <BiRadioCircleMarked /> : <BiRadioCircle />}
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
      <Button
        className="btn-theme-primary-fluid create-group-button"
        type="primary"
        htmlType="submit">
        Create Group
      </Button>
    </div>
  );
};

export default CreateGroupModal;