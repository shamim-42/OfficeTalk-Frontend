import { Button, Popover } from 'antd';

const ImageMessageCard = ({ message }) => {
  const { Images, sender } = message;

  return (
    <div className="img-message">
      {
        Images.length === 1 &&
        <img className="messages-img" src={Images[0]} alt="" />
      }
      {
        (Images.length === 2 || Images.length === 4) &&
        <div className="message-double-img">
          {
            Images.map((image, index) =>
              <img key={index} className="image" src={image} alt="" />
            )
          }
        </div>
      }
      {
        Images.length === 3 &&
        <div className="message-three-img">
          <img className="image" src={Images[0]} alt="" />
          <div className="image" style={{ backgroundImage: `url(${Images[1]})` }}>
            <div className="more-button-dark"></div>
            <Button type="text"
              className="more-img-button">
              +1
            </Button>
          </div>
        </div>
      }
      {
        Images.length > 4 &&
        <div className="message-three-img">
          <img className="image" src={Images[0]} alt="" />
          <img className="image" src={Images[1]} alt="" />
          <img className="image" src={Images[2]} alt="" />
          <div className="image" style={{ backgroundImage: `url(${Images[3]})` }}>
            <div className="more-button-dark"></div>
            <Button type="text"
              className="more-img-button">
              {`+${Images.length - 4}`}
            </Button>
          </div>
        </div>
      }
      <Popover
        content={<div>
          <span className="icon">👍</span>
          <span className="icon">❤️</span>
        </div>}
      >
        <div className="reaction-count">
          <p>4</p>
          <span className="icon">👍</span>
          <span className="icon">❤️</span>
        </div>
      </Popover>
    </div>
  );
};

export default ImageMessageCard;