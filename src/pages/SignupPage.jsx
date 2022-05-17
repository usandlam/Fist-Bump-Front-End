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
    const signupModal = bootstrap.Modal.getInstance(
      document.getElementById("signupModal")
    );
    const loginModal = bootstrap.Modal.getOrCreateInstance(
      document.getElementById("loginModal")
    );

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

      if (trySignup.ok) {
        setErrorMessage("Succesfully created new user! Redirecting to login..");

        signupModal.hide();
        loginModal.show();
      }
      //   navigate("/login");
    } catch (error) {
      //   const errorDescription = error;
      setErrorMessage(error.toString());
    }
  };

  return (
    <div className="col SignupPage">
      {/* <h1>Signup</h1> */}
      {errorMessage && (
        <div className="alert alert-primary" role="alert">
          {errorMessage}
        </div>
      )}
      <form id="signup-form" onSubmit={handleSignupSubmit}>
        <div className="formGroup mb-3">
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
        <div className="formGroup mb-3">
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
        {/* <button className="btn btn-primary" type="submit">
          Signup
        </button> */}
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account? </p>
      <Link to="/login"> Log in here</Link>
    </div>
  );
}

export default LoginPage;
