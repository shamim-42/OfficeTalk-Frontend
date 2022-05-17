import React from 'react';
import { BsReply } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { TiArrowForwardOutline } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegGrinAlt } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { Avatar, Badge, Button, Col, Popover, Row } from 'antd';

const SendMessageCard = ({ profile, message, isOnline, messageDate, timeFormat }) => {
  return (
    <Row className="user-message">
      <Col span={14}>
        <Row className="message-text-card">
          <Col span={1} className='message-option'>
            <Popover placement="bottomRight"
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
              trigger="click">
              <Button type="text">
                <HiDotsVertical />
              </Button>
            </Popover>
            <Popover placement="left"
              content={
                <div style={{ fontSize: '24px', display: 'flex', gap: '10px' }}>
                  <BsFillHeartFill />
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
          <Col span={20}>
            <p className='message-time' style={{ textAlign: 'right' }}>
              {timeFormat(message.time, messageDate)}
            </p>
            <p className='message-text'>{message.content}</p>
          </Col>

          <Col span={3} style={{ textAlign: 'center' }}>
            <Badge
              offset={["-5%", "85%"]}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#67C148",
                textAlign: "left"
              }}
              dot={isOnline(profile.id)}
            >
              <Avatar
                className="chatting-card-img circle-img"
                src={profile.profileImage}
              />
            </Badge>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SendMessageCard;