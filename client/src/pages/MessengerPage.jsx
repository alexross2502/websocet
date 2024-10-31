import React, { useState, useEffect } from "react";
import "../App.css";

export default function MessengerPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/messenger", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Ошибка при получении сообщений");
        }

        const data = await response.json();
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchMessages();

    const ws = new WebSocket("ws://localhost:8000");

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log("Получено новое сообщение:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage.trim()) {
      try {
        const response = await fetch("http://localhost:8000/api/messenger", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ text: inputMessage }),
        });

        if (!response.ok) {
          throw new Error("Ошибка отправки сообщения");
        }

        setInputMessage("");
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      }
    }
  };

  return (
    <div className="messenger-container">
      <h2>Чат</h2>
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <img
              src={message.avatar}
              alt={`${message.user}'s avatar`}
              width={50}
              height={50}
            />
            <strong>{message.user}:</strong> {message.text} {message.createdAt}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-input-form">
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          required
          className="message-input"
        />
        <button type="submit" className="send-button">
          Отправить
        </button>
      </form>
    </div>
  );
}