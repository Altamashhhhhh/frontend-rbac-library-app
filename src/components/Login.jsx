import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://library-app-tyab.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        console.log("data :", data, "token : ", data.token);
        navigate("/books");
      } else {
        setError(data.message || "An error occurred during login");
      }
    } catch (error) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h1>LOGIN PAGE</h1>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

          <button
            onClick={() => {
              navigate("/register");
            }}
            style={{ marginTop: "20px" }}
          >
            REGISTRATION PAGE
          </button>

          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
