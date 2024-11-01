import "../App.css";

export default function Message({ data }) {
  const { avatar, user, text, createdAt, isCurrentUser } = data;

  return (
    <div
      className={`box_container ${
        isCurrentUser ? "own_message" : "not_own_message"
      }`}
    >
      <div
        className={`message_container  ${
          isCurrentUser ? "own_message_color" : "not_own_message_color"
        }
        `}
      >
        <div>
          <img
            src={avatar}
            alt={`${user}'s avatar`}
            className={`image_container ${
              isCurrentUser ? "display_none" : null
            }`}
          />
        </div>
        <div className="content_container">
          <div
            className={`username_container ${
              isCurrentUser ? "display_none" : null
            }`}
          >
            {user}
          </div>
          <div className="text_container">{text}</div>
        </div>
        <div className="date_container">{createdAt}</div>
      </div>
    </div>
  );
}
