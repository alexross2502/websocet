import React, { useState } from "react";
import "../App.css";
import formSubmit from "../utils/formSubmit";

export default function RegistrationForm({ setIsRegister }) {
  const [login, setLogin] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await formSubmit(false, {
      login,
      password,
      username,
    });
    const data = await response.json();
    setMessage(data.message);
    if (response.ok) {
      setIsRegister(true);
    }
  };

  return (
    <>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Почта"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          className="input"
        />
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">
          Зарегистрироваться
        </button>
      </form>
      <p className="message">{message}</p>
      <button onClick={() => setIsRegister(true)} className="toggleButton">
        Уже есть аккаунт? Войти
      </button>
    </>
  );
}
