import React from 'react';
import { Button } from 'antd';


function OnUpload(props) {
  const { handleEditProfileImage, handleImageChange, userProfile, photoChange } = props;

  return (
    <div>
      <div class="avatar-upload">
        <div class="avatar-edit">
          <input type='file' id="imageUpload" onChange={handleImageChange} />
          {
            !photoChange ?
              <label for="imageUpload">Change Photo</label>
              :
              <Button className="edit-profileImage-button" onClick={handleEditProfileImage}>Upload Photo</Button>
          }
        </div>
        <div class="avatar-preview">{userProfile.profileImage &&
          <div id="imagePreview" style={{ backgroundImage: `url(${userProfile?.profileImage})` }}>
          </div>
        }
        </div>
      </div>

    </div>
  );
}


export default OnUpload;