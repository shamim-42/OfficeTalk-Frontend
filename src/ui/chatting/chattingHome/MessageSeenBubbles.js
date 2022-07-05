import { Divider } from "antd";
import { conversationTimeFormat } from "../../../utils/timeFormat";
import CustomAvatar from "../../helper/CustomAvatar";
import TextAvatar from "../../helper/TextAvatar";

const MessageSeenBubbles = ({ users, userProfile }) => {
  console.log(users)
  return (
    <div className="message-bubbles-popover">
      <p className="message-bubbles-popover-title">
        Message seen by
      </p>
      <Divider className="message-bubbles-popover-divider" />
      <div className="message-seen-users">
        {
          users.map((user) => {
            if (user.userId === userProfile.id) return false;
            return (
              <div className="message-seen-user-card" key={user.id}>
                <>
                  {
                    user.user.profileImageResize ?
                      <CustomAvatar
                        size={20}
                        src={user.user.profileImageResize}
                      />
                      :
                      <TextAvatar name={user?.user.fullname}
                        size="20px" fontSize="8px" />
                  }
                </>
                <div className="message-seen-user-info">
                  <p className="message-seen-user-name">
                    {user.user.fullname}
                  </p>
                  <p className="message-seen-time">
                    {conversationTimeFormat(user.updated_at)}
                  </p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default MessageSeenBubbles;