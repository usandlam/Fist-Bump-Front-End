import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  // const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { username, password };
    try {
      const trySignup = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!trySignup.ok) {
        const error = await trySignup.json();
        throw new Error(error.message);
      } else {
        console.log("success");
      }
      //   console.log();

      //   const response = await trySignup
      //     .json()
      //     .catch((err) => setErrorMessage(err));
      //   console.log(response);
      //   console.log(trySignup);
      //   if (trySignup.error) console.log(trySignup.error.message);
      //   const { status, response } = await trySignup;

      /*
      const status = await trySignup.status;
      const response = await trySignup.json();
      //   if()
      if(status === 200)
        return true
      else 
        throw error()
        */
      if (trySignup.ok) {
        setErrorMessage("Succesfully created new user! Redirecting to login..");
      }
      navigate("/login");
    } catch (error) {
      //   const errorDescription = error;
      setErrorMessage(error.toString());
    }
  };

  return (
    <div className="col SignupPage">
      <h1>Signup</h1>
      {errorMessage && (
        <div className="alert alert-primary" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSignupSubmit}>
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
          Signup
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account? </p>
      <Link to="/login"> Log in here</Link>
    </div>
  );
}

export default LoginPage;
