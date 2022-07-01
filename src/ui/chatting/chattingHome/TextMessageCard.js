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
        content={
          <div className="reaction-view-popover">
            {message?.SingleEmoji?.length > 0 &&
              message.SingleEmoji.map((emoji, index) => (
                <p key={index}>{emoji?.user.fullname}</p>
              ))
            }
          </div>
        }
      >
        {
          (message?.SingleEmojiTotal[0]?.total_emoji > 0) &&
          <div className="reaction-count">
            <p>{message.SingleEmojiTotal[0].total_emoji > 1 && message.SingleEmojiTotal[0].total_emoji}</p>
            {message.SingleEmojiTotal[0].total_like > 0
              &&
              <span className="icon">👍</span>
            }
            {message.SingleEmojiTotal[0].total_love > 0
              &&
              <span className="icon">❤️</span>
            }
            {message.SingleEmojiTotal[0].total_smile > 0
              &&
              <span className="icon">😁</span>
            }
            {message.SingleEmojiTotal[0].total_surprize > 0
              &&
              <span className="icon">😮</span>
            }
            {message.SingleEmojiTotal[0].total_sad > 0
              &&
              <span className="icon">😢</span>
            }
            {message.SingleEmojiTotal[0].total_angry > 0
              &&
              <span className="icon">😠</span>
            }
          </div>
        }
      </Popover>
    </div >
  );
};

export default TextMessageCard;