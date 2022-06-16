import { message as Alert } from 'antd';
import MessageOption from "../../ui/chatting/chattingHome/MessageOption";

const ChatMessageOption = (props) => {
  const { message, align, deleteMessage } = props;

  // Function for copy message text
  const copyToClipboard = (content) => {
    const el = document.createElement('textarea');
    el.value = content;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    Alert.success('Message copied successfully!');
  };


  return (
    <MessageOption
      deleteMessage={deleteMessage}
      copyToClipboard={copyToClipboard}
      message={message}
      align={align}
    />
  );
};

export default ChatMessageOption;