import React, { useState } from "react";
import "../App.css";
import formSubmit from "../utils/formSubmit";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setIsRegister }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await formSubmit(true, { login, password });
    const data = await response.json();
    setMessage(data.message);
    if (response.ok) {
      navigate("/messenger");
    }
  };

  return (
    <>
      <h2>Авторизация</h2>
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
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">
          Войти
        </button>
      </form>
      <p className="message">{message}</p>
      <button onClick={() => setIsRegister(false)} className="toggleButton">
        Нет аккаунта? Зарегистрироваться
      </button>
    </>
  );
}
