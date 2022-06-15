import { Button, Popover } from 'antd';

const ImageMessageCard = ({ message }) => {
  const { images } = message;

  return (
    <div className="img-message">
      {
        images.length === 1 &&
        <img className="messages-img" src={images[0]} alt="" />
      }
      {
        (images.length === 2 || images.length === 4) &&
        <div className="message-double-img">
          {
            images.map((image, index) =>
              <img key={index} className="image" src={image} alt="" />
            )
          }
        </div>
      }
      {
        images.length === 3 &&
        <div className="message-three-img">
          <img className="image" src={images[0]} alt="" />
          <div className="image" style={{ backgroundImage: `url(${images[1]})` }}>
            <div className="more-button-dark"></div>
            <Button type="text"
              className="more-img-button">
              +1
            </Button>
          </div>
        </div>
      }
      {
        images.length > 4 &&
        <div className="message-three-img">
          <img className="image" src={images[0]} alt="" />
          <img className="image" src={images[1]} alt="" />
          <img className="image" src={images[2]} alt="" />
          <div className="image" style={{ backgroundImage: `url(${images[3]})` }}>
            <div className="more-button-dark"></div>
            <Button type="text"
              className="more-img-button">
              {`+${images.length - 4}`}
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