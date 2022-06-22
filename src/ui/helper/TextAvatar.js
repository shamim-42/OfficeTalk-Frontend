import { getTwoCharacters } from '../../utils/utils';

const TextAvatar = ({ name, size, fontSize, icon }) => {
  return (
    <div className="text-avatar">
      <div
        className="profile-text-avatar"
        style={{ height: size, width: size, fontSize: fontSize }}
      >
        <p>{getTwoCharacters(name)}</p>
      </div>
      <span className={`online-green-icon ${icon}`}></span>
    </div>
  );
};

export default TextAvatar;