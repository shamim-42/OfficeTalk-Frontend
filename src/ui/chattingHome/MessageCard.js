import { Button, Col, Popover, Row } from 'antd';
import React from 'react';
import { AiFillLike } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { BsFillHeartFill, BsReply } from "react-icons/bs";
import { FaRegGrinAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiArrowForwardOutline } from "react-icons/ti";
import { timeFormat } from '../../utils/utils';
import CustomAvatar from '../helper/CustomAvatar';

const MessageCard = (props) => {
  const { profile, message, isOnline } = props;

  return (
    <Row className="friend-message" justify="start">
      <Col span={14}>
        <Row className="friend-message-card">
          <Col span={3} className='message-sender-img'>
            <CustomAvatar
              size={40}
              icon={isOnline(profile?.id) && "small"}
              src={profile?.profileImage}
            />
          </Col>
          <Col span={21}>
            <p className='message-time'>{timeFormat(message.createdAt)}</p>
            <Row>
              <Col span={23}>
                <p className='message-text'>{message.content}</p>
              </Col>
              <Col span={1} className="message-option">
                <Popover placement="bottomRight"
                  content={<MessageOption />}
                  trigger="click">
                  <Button type="text">
                    <HiDotsVertical />
                  </Button>
                </Popover>

                <Popover placement="left"
                  content={<MessageReact />}
                  trigger="click">
                  <Button type="text">
                    <FaRegGrinAlt />
                  </Button>
                </Popover>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MessageCard;


const MessageOption = () => {
  return (
    <div className="message-options-popover">
      <Button type="text">
        <BsReply />
        <span style={{ marginLeft: '20px' }}>Reply Message</span>
      </Button>
      <Button type="text">
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
      <Button type="text">
        <RiDeleteBinLine />
        <span style={{ marginLeft: '20px', color: 'red' }}>Remove Message</span>
      </Button>
    </div>
  );
};


const MessageReact = () => {
  return (
    <div style={{ fontSize: '24px', display: 'flex', gap: '10px' }}>
      <AiFillLike />
      <BsFillHeartFill />
      <BsFillHeartFill />
      <BsFillHeartFill />
      <BsFillHeartFill />
      <BsFillHeartFill />
    </div>
  );
};

