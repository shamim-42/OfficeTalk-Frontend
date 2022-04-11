import { Avatar, Badge, Button, Col, Popover, Row } from 'antd';
import React from 'react';
import { HiDotsVertical } from "react-icons/hi";
import { FaRegGrinAlt } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsReply } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { TiArrowForwardOutline } from "react-icons/ti";

const ChatingMessageCard = () => {
  return (
    <Row className="friend-message">
      <Col span={14}>
        <Row className="friend-message-card">
          <Col span={2}>
            <Badge
              offset={["-5%", "85%"]}
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#67C148",
                textAlign: "left"
              }}
              dot={true}
            >
              <Avatar
                className="chatting-card-img circle-img"
                src='https://i.ibb.co/Q89Q7wV/Ellipse-8.png'
              />
            </Badge>
          </Col>
          <Col span={21}>
            <p className='message-time'>10:11 pm</p>
            <p className='message-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, consectetur.</p>
          </Col>
          <Col span={1} className='message-option'>
            <Popover placement="bottomLeft"
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
            <Button type="text">
              <FaRegGrinAlt />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ChatingMessageCard;