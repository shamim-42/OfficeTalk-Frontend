import { Button, Col, Popover, Row } from 'antd';
import React from 'react';
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
  const { profile, message, isOnline, senderCard } = props;

  if (senderCard) {
    return (
      <Row className="message-card" justify="end">
        <Col span={14}>
          <Row>
            <Col span={21}>
              <p className='message-time' style={{ textAlign: 'right' }}>
                {timeFormat(message.createdAt)}
              </p>
              <Row>
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
                <Col span={23}>
                  <p className='message-text'>{message.content}</p>
                  <Popover
                    content={<div>
                      <BsFillHeartFill />
                      <BsFillHeartFill />
                    </div>}
                  >
                    <div className="reaction-count">
                      <p>4</p>
                      <BsFillHeartFill />
                      <BsFillHeartFill />
                    </div>
                  </Popover>
                </Col>
              </Row>
            </Col>

            <Col span={3}
              className='message-sender-img'>
              <CustomAvatar
                size={40}
                icon={isOnline(profile?.id) && "small"}
                src={profile?.profileImage}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

  return (
    <Row className="message-card" justify="start">
      <Col span={14}>
        <Row>
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
              <Col span={23} className='message-area'>
                <p className='message-text'>{message.content}</p>
                <Popover
                  content={<div>
                    <p>4</p>
                    <BsFillHeartFill />
                    <BsFillHeartFill />
                  </div>}
                >
                  <div className="reaction-count">
                    <p>4</p>
                    <BsFillHeartFill />
                    <BsFillHeartFill />
                  </div>
                </Popover>
              </Col>
              <Col span={1} className="message-option">
                <Popover placement="bottomLeft"
                  content={<MessageOption />}
                  trigger="click">
                  <Button type="text">
                    <HiDotsVertical />
                  </Button>
                </Popover>

                <Popover placement="bottomLeft"
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

