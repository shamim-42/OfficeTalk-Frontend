import { Avatar, Badge, Button, Col, Popover, Row } from 'antd';
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

const ChatingMessageCard = (props) => {
  const { profile, message, isOnline, visible, handleVisibleChange } = props;
  
  return (
    <Row className="friend-message">
      <Col span={14}>
        <Row className="friend-message-card">
          <Col span={3} style={{ textAlign: 'center' }}>
            <Badge
              offset={["-5%", "85%"]}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#67C148",
                textAlign: "left"
              }}
              dot={isOnline(profile?.id)}
            >
              <Avatar
                className="chatting-card-img circle-img"
                src={profile?.profileImage}
              />
            </Badge>
          </Col>
          <Col span={20}>
            <p className='message-time'>{timeFormat(message.createdAt)}</p>
            <p className='message-text'>{message?.content}</p>
          </Col>
          <Col span={1} className='message-option' style={{position: "relative"}}>
            <Popover 
              content={
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
              }
              trigger="click" 
              visible={visible}
              onVisibleChange={handleVisibleChange}>
              <Button type="text">
                <HiDotsVertical />
              </Button>
            </Popover>
            <Popover placement="right"
              content={
                <div style={{ fontSize: '24px', display: 'flex', gap: '10px' }}>
                  <AiFillLike />
                  <BsFillHeartFill />
                  <BsFillHeartFill />
                  <BsFillHeartFill />
                  <BsFillHeartFill />
                  <BsFillHeartFill />
                </div>
              } trigger="click">
              <Button type="text">
                <FaRegGrinAlt />
              </Button>
            </Popover>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ChatingMessageCard;