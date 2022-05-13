import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext); // updated

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { username, password };
    try {
      //   console.log("attempting login");
      const tryLogin = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (tryLogin.ok) {
        const response = await tryLogin.json();
        //   console.log("JWT token", response.authToken);
        storeToken(response.authToken);
        authenticateUser();
        navigate("/");
      } else {
        const error = await tryLogin.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.toString());
    }
  };

  return (
    <div className="col LoginPage">
      <h1>Login</h1>
      {errorMessage && (
        <div className="alert alert-primary" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleLoginSubmit}>
        <div className="formGroup">
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={handleUsername}
            />
          </label>
        </div>
        <div className="formGroup">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="on"
              value={password}
              onChange={handlePassword}
            />
          </label>
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don&apos;t have an account yet?</p>
      <Link to="/signup"> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
