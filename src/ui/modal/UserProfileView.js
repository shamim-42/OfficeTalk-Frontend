import { Button } from "antd";

const UserProfileView = ({ closeProfileModal }) => {
  return (
    <div>
      <Button
        onClick={closeProfileModal}
        className="modal-cross-button">
        X
      </Button>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cum dolor deleniti labore dignissimos officia! Magni possimus error soluta obcaecati earum perferendis explicabo saepe nostrum eos, dolorum, labore pariatur facilis reprehenderit mollitia velit animi at corrupti quam quibusdam sed facere in dolor! Deserunt odit magnam quasi recusandae, amet a, nulla beatae modi reiciendis magni sapiente iste quod animi natus dolores iusto reprehenderit rem rerum. Ut reprehenderit eligendi quis beatae, delectus earum nesciunt quam saepe voluptas perferendis dolorum rem repellat magni. Facere libero repellat dolor debitis perferendis voluptate minima quibusdam aliquid consequatur? Provident dicta eum et aut qui excepturi maxime fuga.</p>
    </div>
  );
};

export default UserProfileView;