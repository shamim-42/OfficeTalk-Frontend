import { Avatar, Divider, Popover } from 'antd';
import { activeTimeFormat } from '../../../utils/timeFormat';
import TextAvatar from '../../helper/TextAvatar';

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
      <Popover content={<ReactViewPopover message={message} />}>
        {
          (message?.EmojiTotal[0]?.total_emoji > 0) &&
          <div className="reaction-count">
            <p>{message.EmojiTotal[0].total_emoji > 1 && message.EmojiTotal[0].total_emoji}</p>
            {message.EmojiTotal[0].total_like > 0
              &&
              <span className="icon">👍</span>
            }
            {message.EmojiTotal[0].total_love > 0
              &&
              <span className="icon">❤️</span>
            }
            {message.EmojiTotal[0].total_smile > 0
              &&
              <span className="icon">😁</span>
            }
            {message.EmojiTotal[0].total_surprize > 0
              &&
              <span className="icon">😮</span>
            }
            {message.EmojiTotal[0].total_sad > 0
              &&
              <span className="icon">😢</span>
            }
            {message.EmojiTotal[0].total_angry > 0
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


const ReactViewPopover = ({ message }) => {

  return (
    <div className="reaction-view-popover">
      {
        message?.Emoji?.length > 0 && message.Emoji.map((emj, index) => {
          if (emj.vote < 1) {
            return true;
          }
          return (
            <div className="user-list-item"
              key={index}>
              <div className="user-info">
                {emj.user?.profileImageResize
                  ? <Avatar
                    src={emj.user.profileImageResize}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                    }}
                  />
                  :
                  <TextAvatar name={emj.user.fullname} size="20px" fontSize="10px" />}

                <p className="user-name">{emj.user.fullname}</p>
              </div>
              <div className="user-reaction-icon">
                {emj.vote === 1
                  &&
                  <span className="icon">👍</span>
                }
                {emj.vote === 2
                  &&
                  <span className="icon">❤️</span>
                }
                {emj.vote === 3
                  &&
                  <span className="icon">😁</span>
                }
                {emj.vote === 4
                  &&
                  <span className="icon">😮</span>
                }
                {emj.vote === 5
                  &&
                  <span className="icon">😢</span>
                }
                {emj.vote === 6
                  &&
                  <span className="icon">😠</span>
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}