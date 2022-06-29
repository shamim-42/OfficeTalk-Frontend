import ReactSimpleImageVideoLightbox, {
  ResourcersType
} from '@santigp258/react-simple-lightbox-video-image';
import { Button, Popover } from 'antd';
import { useState } from 'react';

const data: ResourcersType[] = [
  {
    type: 'photo',
    url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
  },
  {
    type: 'photo',
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  },
  {
    "url": "https://media.istockphoto.com/videos/moon-light-shine-through-the-window-into-islamic-mosque-interior-video-id1311967902",
    "type": "video"
  },
  {
    "url": "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_30mb.mp4",
    "type": "video"
  }
];

const ImageMessageCard = ({ message }) => {
  const { images } = message;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="img-message">
        {
          images.length === 1 &&
          <img className="messages-img" onClick={() => setVisible(true)} src={images[0]} alt="" />
        }
        {
          (images.length === 2 || images.length === 4) &&
          <div className="message-double-img">
            {
              images.map((image, index) =>
                <img key={index} onClick={() => setVisible(true)} className="image" src={image} alt="" />
              )
            }
          </div>
        }
        {
          images.length === 3 &&
          <div className="message-three-img">
            <img className="image" onClick={() => setVisible(true)} src={images[0]} alt="" />
            <div className="image" style={{ backgroundImage: `url(${images[1]})` }}>
              <div className="more-button-dark"></div>
              <Button onClick={() => setVisible(true)} type="text"
                className="more-img-button">
                +1
              </Button>
            </div>
          </div>
        }
        {
          images.length > 4 &&
          <div className="message-three-img">
            <img className="image" onClick={() => setVisible(true)} src={images[0]} alt="" />
            <img className="image" onClick={() => setVisible(true)} src={images[1]} alt="" />
            <img className="image" onClick={() => setVisible(true)} src={images[2]} alt="" />
            <div className="image" style={{ backgroundImage: `url(${images[3]})` }}>
              <div className="more-button-dark"></div>
              <Button onClick={() => setVisible(true)} type="text"
                className="more-img-button">
                {`+${images.length - 4}`}
              </Button>
            </div>
          </div>
        }
        <Popover
          content={<div className="reaction-view-popover">
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

      {visible && <ReactSimpleImageVideoLightbox
        data={data}
        onCloseCallback={() => setVisible(false)}
        backdropBg="rgba(50, 48, 48, 0.6)"
        imageStyle={{ width: "50vw", height: "70vh", borderRadius: '30px' }}
        frameStyle={{ width: "50vw", height: "70vh", borderRadius: '30px' }}
        startIndex={1}
        frameClassname="video-player-control"
        showResourceCount={false}
        CustomVideo={(props) => <video controls autoPlay={true} {...props} className="video-player-control" ></video>}
        CustomCloseIcon={(props) => <Button onClick={() => setVisible(false)} className="video-close-icon">X</Button>}
      />}
    </>
  );
};

export default ImageMessageCard;