import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/users");
      })
      .catch(() => alert("Login failed! Use eve.holt@reqres.in and cityslicka"));
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="form-buttons">
          <button type="submit" className="button login">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;