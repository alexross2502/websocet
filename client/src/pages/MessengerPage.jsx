import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import Message from "../components/Message";

export default function MessengerPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log("useEffect triggered");
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_PATH}api/messenger`,
          {
            method: "GET",
            credentials: "include",
          }
        );

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
    console.log("WebSocket connection created");

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log("Получено новое сообщение:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
      console.log("WebSocket закрыт при размонтировании");
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (inputMessage.trim()) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_PATH}api/messenger`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ text: inputMessage }),
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка отправки сообщения");
        }

        setInputMessage("");
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger-container">
      <div className="messages-container">
        {messages.map((message) => (
          <Message key={message.id} data={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="message-input-form_container">
        <form onSubmit={handleSendMessage} className="message-input-form">
          <textarea
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
    </div>
  );
}
