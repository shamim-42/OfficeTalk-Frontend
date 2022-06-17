import { Divider, Popover } from 'antd';
import { activeTimeFormat } from '../../../utils/timeFormat';

const TextMessageCard = ({ message, CurrentUserProfile, userProfile, }) => {
  const senderName = (message?.children?.senderId === userProfile.id) ? userProfile.fullname : CurrentUserProfile.fullname;

  return (
    <div className="text-message">
      {
        message.children &&
        <>
          <p className='message-reply-text'>{message.children.content}</p>
          <p className="reply-message-author">{`${senderName}, ${activeTimeFormat(message.children.createdAt)}`}</p>
          <Divider className="message-reply-divider" />
        </>
      }
      <p className='message-text'>{message.content}</p>
      <Popover
        content={<div className="reaction-view-popover">
          <span className="icon">👍</span>
          <span className="icon">❤️</span>
        </div>}
      >
        <div className="reaction-count">
          <p>4</p>
          <span className="icon">👍</span>
          <span className="icon">❤️</span>
        </div>
      </Popover>
    </div>
  );
};

export default TextMessageCard;