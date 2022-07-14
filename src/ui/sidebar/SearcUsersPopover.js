import React from 'react';
import { Link } from 'react-router-dom';
import CustomAvatar from '../helper/CustomAvatar';
import TextAvatar from '../helper/TextAvatar';

const SearcUsersPopover = ({ users }) => {
  return (
    <div className="search-user-popover">
      {
        users.length > 0 && users.map(user => (
          <Link to={`chat/${user?.id}`} key={user.id} className="user-list-item">
            <div className="user-info">
              {user?.profileImageResize
                ? <CustomAvatar
                  src={user.profileImageResize}
                  size={22}
                />
                :
                <TextAvatar name={user.fullname} size="22px" fontSize="10px" />}

              <p className="user-name">{user.fullname}</p>
            </div>
          </Link>
        ))
      }
    </div >
  );
};

export default SearcUsersPopover;