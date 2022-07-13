import { Button, Col, Form, Input } from "antd";
import { Fragment } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
const { TextArea } = Input;
function ChatInputBox(props) {
  const { messagesValue, onSubmit, onChange, onBlur } = props;
  function openEmojiBox(ev) {
    // console.log(ev);
  }
  return (
    <Fragment>
      <Col span={14}>
        <Form name="basic" className="chat-input-form">
          <Button shape="circle" icon={<BsEmojiSmile />} onClick={openEmojiBox} />
          <TextArea
            autoSize={{ maxRows: 5 }}
            className="chat-textArea"
            value={messagesValue}
            onPressEnter={onSubmit}
            placeholder="Type a message"
            onChange={onChange}
            onBlur={onBlur}
          />
          <button type="submit" type="hidden"></button>
        </Form>
      </Col>
      <Col span={8} className="chat-input-attachment">
        {messagesValue.trim() && <Button shape="circle"
          onClick={onSubmit} icon={<FaRegPaperPlane />} className="chat-sent-control" />}
      </Col>
    </Fragment>
  );
}

export default ChatInputBox;
