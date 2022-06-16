import { Popover } from 'antd';

const TextMessageCard = ({message}) => {

  return (
    <div className="text-message">
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