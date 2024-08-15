import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";
import Navbar from "./Navbar";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("view_all");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      role,
      password,
    };

    try {
      const response = await fetch(
        "https://library-app-tyab.onrender.com/user/register",
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
        console.log(data);
        navigate("/login");
      } else {
        setError(data.message || "An error occurred during registration");
      }
    } catch (error) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="register-container">
        <form className="register-form" onSubmit={handleSignup}>
          <h1>REGISTRATION PAGE</h1>

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="role">Role:</label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="view_all">View All</option>
            <option value="creator">Creator</option>
            <option value="viewer">Viewer</option>
          </select>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">REGISTER HERE</button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            style={{ marginTop: "20px" }}
          >
            LOGIN PAGE
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Register;
