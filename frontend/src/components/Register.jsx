import { useState } from "react";
import axios from "axios";

function Register({ onShowLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://contact-book-2n11.onrender.com/api/register/",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      alert("Account created successfully!");

      onShowLogin();

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      if (error.response?.data) {
        alert(
          JSON.stringify(
            error.response.data
          )
        );
      } else {
        alert("Could not create account.");
      }
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>📒 Contact Book</h1>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <label>Username</label>

          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?
        </p>

        <button
          className="link-button"
          onClick={onShowLogin}
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}

export default Register;