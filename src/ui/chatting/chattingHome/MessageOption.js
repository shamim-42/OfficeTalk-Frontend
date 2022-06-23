import { Button, Popover } from 'antd';
import { BiEditAlt } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { FaRegGrinAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiArrowForwardOutline } from "react-icons/ti";

const MessageOption = (props) => {
  const { align, deleteMessage, message, copyToClipboard, isDelete } = props;

  return (
    <div className="message-options">
      <Popover placement={align === "left" ? "bottomLeft" : "bottomRight"}
        className="message-option"
        content={<MessageOptions
          deleteMessage={deleteMessage}
          copyToClipboard={copyToClipboard}
          isDelete={isDelete}
          message={message} />}
        trigger="click">
        <Button type="text">
          <HiDotsVertical />
        </Button>
      </Popover>

      <Popover placement={align === "left" ? "right" : "left"}
        content={<MessageReact />}
        trigger="click">
        <Button type="text">
          <FaRegGrinAlt />
        </Button>
      </Popover>
    </div>
  );
};

export default MessageOption;


const MessageOptions = ({ deleteMessage, message, copyToClipboard, isDelete }) => {
  return (
    <div className="message-options-popover">
      <Button type="text">
        <BsReply />
        <span style={{ marginLeft: '20px' }}>Reply Message</span>
      </Button>
      {

      }
      <Button type="text" onClick={() => copyToClipboard(message.content)}>
        <MdOutlineContentCopy />
        <span style={{ marginLeft: '20px' }}>Copy Message</span>
      </Button>
      <Button type="text">
        <BiEditAlt />
        <span style={{ marginLeft: '20px' }}>Edit Message</span>
      </Button>
      <Button type="text">
        <TiArrowForwardOutline />
        <span style={{ marginLeft: '20px' }}>Forward Message</span>
      </Button>
      {
        isDelete &&
        <Button type="text" onClick={() => deleteMessage(message.id)}>
          <RiDeleteBinLine />
          <span style={{ marginLeft: '20px', color: 'red' }}>Remove Message</span>
        </Button>
      }
    </div>
  );
};


const MessageReact = () => {
  return (
    <div className="message-react">
      <span className="icon">👍</span>
      <span className="icon">❤️</span>
      <span className="icon">😁</span>
      <span className="icon">😮</span>
      <span className="icon">😢</span>
      <span className="icon">😠</span>
    </div>
  );
};