import React, { useState } from 'react';
import { selectUserProfile, selectUserToken, setUserProfile } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';


function OnUpload() {
  const [photoChange, setPhotoChange] = useState(false)
  const userProfile = useSelector(selectUserProfile);
  const userToken = useSelector(selectUserToken);
  const userId = userProfile.id;
  const dispatch = useDispatch();
  const newProfile = JSON.parse(JSON.stringify(userProfile));
  const [uploadPhoto, setUploadPhoto] = useState(null);


  const handleChange = (event) => {
    setUploadPhoto(event.target.files[0])
    setPhotoChange(true);
  }

  const handleSubmit = async () => {
    if (!uploadPhoto) {
      return
    }
    const formData = new FormData();
    const fileName = uploadPhoto?.name?.replace(/ /g, "_");
    const dateTime = new Date().toString().replace(/ /g, "_");
    const randomNumber = Math.floor(Math.random() * (1000, 9999) + 1000);
    const fullFileName = fileName + dateTime + randomNumber;
    formData.append("file", uploadPhoto, fullFileName);


    await fetch(`http://192.168.1.3:4000/upload/${userId}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "bearer" + " " + userToken,
      }
    }).then((res) => res.json())
      .then((data) => {
        console.log("data res", data)
        newProfile.profileImage = data?.original?.Location;
        dispatch(setUserProfile(newProfile))
        setPhotoChange(false);
        console.log(newProfile)
      });
  };

  return (
    <div>
      <div class="avatar-upload">
        <div class="avatar-edit">
          <input type='file' id="imageUpload" onChange={handleChange} />
          {
            !photoChange ?
              <label for="imageUpload">Change Photo</label>
              :
              <Button className="edit-profileImage-button" onClick={handleSubmit}>Upload Photo</Button>
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