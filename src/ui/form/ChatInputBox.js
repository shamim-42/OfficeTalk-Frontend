import { Button, Col, Form, Input } from "antd";
import React, { Fragment } from "react";
import { BsEmojiSmile, BsFillMicFill, BsPencil } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";
import { IoImagesOutline } from "react-icons/io5";
const { TextArea } = Input;
function ChatInputBox(props) {
  const { messagesValue, onSubmit, onChange, onBlur } = props;
  function openEmojiBox(ev) {
    console.log(ev);
  }
  return (
    <Fragment>
      <Col span={14}>
        <Form name="basic" className="chat-input-form">
          <Button shape="circle" icon={<BsEmojiSmile />} onClick={openEmojiBox}/>
          <TextArea
            autoSize={{ maxRows: 5 }}
            className="chat-textArea"
            value={messagesValue}
            onPressEnter={onSubmit}
            placeholder="Type a message"
            onChange={onChange}
            onBlur={onBlur}
          />
          <Button shape="circle" icon={<BsPencil />} onClick={openEmojiBox} />
        </Form>
      </Col>
      <Col span={8} className="chat-input-attachment">
        {messagesValue.trim() && <Button shape="circle" icon={<FaRegPaperPlane />} className="chat-sent-control" />}
        <Button shape="circle" icon={<IoImagesOutline />} />
        <Button shape="circle" icon={<BsFillMicFill />} />
      </Col>
    </Fragment>
  );
}

export default ChatInputBox;
