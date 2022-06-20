import { Avatar, Button, Input, Spin } from 'antd';
import { BiRadioCircle, BiRadioCircleMarked, BiSearch } from "react-icons/bi";
import { MdOutlinePhotoCamera } from "react-icons/md";

const CreateGroupModal = (props) => {
  const { handleChatGroupCancel, handleChangeUserSearch, handleCreateGroup, selectedUser, addUserOnClick, userList, selectFile, handleChangefile, handleChangeGroupName, loading } = props;

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
      <Spin tip="Loading..." spinning={loading}>
        <div className="upload-group-photo">
          <label for="files" class="input-upload-cover-btn"> <MdOutlinePhotoCamera /></label>
          {
            selectFile && <p>{selectFile.name}</p>
          }
          <input type='file' id="files" className="input-upload-cover" onChange={handleChangefile} />
        </div>
        <Input className="create-group-input"
          onChange={handleChangeGroupName}
          placeholder="Group Name" />
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
                        src={user.profileImage}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                        }}
                      />
                      <p className="user-name">{user.fullname}</p>
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
      </Spin>

      <Button
        className="btn-theme-primary-fluid create-group-button"
        onClick={handleCreateGroup}
        type="primary"
        htmlType="submit">
        Create Group
      </Button>
    </div>
  );
};

export default CreateGroupModal;