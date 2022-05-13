import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function ProfilePage(props) {
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
      console.log("attempting login");
      const tryLogin = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const response = await tryLogin.json();
      console.log("JWT token", response.authToken);
      storeToken(response.authToken);
      authenticateUser();
      navigate("/");
    } catch (error) {
      const errorDescription = error.response.message;
      setErrorMessage(errorDescription);
    }
  };

  return <div className="LoginPage" />;
}

export default ProfilePage;
