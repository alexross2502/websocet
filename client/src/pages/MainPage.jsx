import React, { useState } from "react";
import "../App.css";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

export default function MainPage() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="container">
      {!isRegister ? (
        <RegistrationForm setIsRegister={setIsRegister} />
      ) : (
        <LoginForm setIsRegister={setIsRegister} />
      )}
    </div>
  );
}
