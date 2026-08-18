import { useState } from "react";
import axios from "axios";

function Login({ onLogin, onShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://contact-book-2n11.onrender.com",
        {
          username: username,
          password: password,
        }
      );

      localStorage.setItem(
        "access_token",
        response.data.access
      );

      localStorage.setItem(
        "refresh_token",
        response.data.refresh
      );

      onLogin();

    } catch (error) {
      console.error("Login error:", error);

      alert("Invalid username or password.");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>📒 Contact Book</h1>

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?
        </p>

        <button
          className="link-button"
          onClick={onShowRegister}
        >
          Create an account
        </button>

      </div>

    </div>
  );
}

export default Login;