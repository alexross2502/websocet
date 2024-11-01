import "../App.css";

export default function Message({ data }) {
  const { avatar, user, text, createdAt, isCurrentUser } = data;
  return (
    <div
      className={`message_box ${
        isCurrentUser ? "message_right" : "message_left"
      }`}
    >
      <div
        className={`message_content ${
          isCurrentUser ? "right_color" : "left_color"
        }`}
      >
        <div className="avatar_container">
          <img
            src={avatar}
            alt={`${user}'s avatar`}
            className={`avatar ${isCurrentUser ? "hide_avatar" : ""}`}
          />
        </div>
        <div className="content_container">
          {!isCurrentUser && <div className="username">{user}</div>}
          <div className="message_text">{text}</div>
        </div>
        <div className="message_date">{createdAt}</div>
      </div>
    </div>
  );
}
