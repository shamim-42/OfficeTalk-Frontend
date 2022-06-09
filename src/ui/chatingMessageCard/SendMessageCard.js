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

const SendMessageCard = ({ profile, message, isOnline }) => {

  return (
    <Row className="user-message" justify="end">
      <Col span={14}>
        <Row className="message-text-card">
          <Col span={1} className='message-option' style={{ position: 'relative' }}>
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
              {timeFormat(message.createdAt)}
            </p>
            <p className='message-text'>{message.content}</p>
          </Col>

          <Col span={3} style={{ textAlign: 'right' }}>
            <CustomAvatar
              size={40}
              icon={isOnline(profile?.id) && "small"}
              src={profile?.profileImage}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SendMessageCard;