import { Avatar, Badge, Button, Col, Popover, Row } from 'antd';
import React from 'react';
import ChatingMessageCard from '../chatingMessageCard/ChatingMessageCard';
import ChattingHeader from '../chattingHeader/ChattingHeader';
import { BsReply } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { TiArrowForwardOutline } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegGrinAlt } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { Input } from 'antd';
const { TextArea } = Input;


const ChattingHomeUi = (props) => {
  const { currentUser } = props;
  const onChange = e => {
    console.log('Change:', e.target.value);
  };

  return (
    <>
      <ChattingHeader currentUser={currentUser} />
      <div className="chatting-content">
        <Row className="chatting-date">
          <Col span={6} className="chatting-date-card">
            Monday , May 7, 2021
          </Col>
        </Row>
        <ChatingMessageCard />
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
                <p className='message-time' style={{ textAlign: 'right' }}>10:11 pm</p>
                <p className='message-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, consectetur. gyu</p>
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
                  dot={true}
                >
                  <Avatar
                    className="chatting-card-img circle-img"
                    src='https://i.ibb.co/Q89Q7wV/Ellipse-8.png'
                  />
                </Badge>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="message-input">
          <TextArea showCount maxLength={100} onChange={onChange} />
        </div>
      </div>
    </>
  );
};

export default ChattingHomeUi;