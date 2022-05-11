import React from 'react';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



function UploadProfile(props) {
  const { handleEditProfileImage, handleImageChange, userProfile, photoChange } = props;

  return (
    <div>
      <div className="avatar-upload">
        <div className="avatar-edit">
          <input type='file' id="imageUpload" onChange={handleImageChange} />
          {
            !photoChange ?
              <label htmlFor="imageUpload">Change Photo</label>
              :
              <>
              <Button className="edit-profileImage-button" onClick={handleEditProfileImage}><UploadOutlined /> Upload Photo</Button>
              </>
          }
        </div>
        <div className="avatar-preview">{userProfile.profileImage &&
          <div id="imagePreview" style={{ backgroundImage: `url(${userProfile?.profileImage})` }}>
          </div>
        }
        </div>
      </div>

    </div>
  );
}


export default UploadProfile;