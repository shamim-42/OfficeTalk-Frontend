import { Button } from 'antd';

const FriendProfileModal = (props) => {
  const { cancelFriendModal } = props;

  return (
    <div>
      <Button
        onClick={cancelFriendModal}
        className="modal-cross-button">
        X
      </Button>


    </div>
  );
};

export default FriendProfileModal;