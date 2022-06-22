import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TextAvatar from '../../helper/TextAvatar';



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
                <Button type="primary" className="edit-profileImage-button" onClick={handleEditProfileImage}><UploadOutlined /> Upload Photo</Button>
              </>
          }
        </div>
        <div className="avatar-preview">
          {userProfile.profileImage ?
            <div className="imagePreview" style={{ backgroundImage: `url(${userProfile?.profileImage})` }}>
            </div>
            :
            <TextAvatar name={userProfile.fullname} size="88px" fontSize="44px" />
          }
        </div>
      </div>

    </div>
  );
}


export default UploadProfile;