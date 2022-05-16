import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

const emojiUnicode = require("emoji-unicode");

//

const regex = /([\u180B-\u180D\uFE00-\uFE0F]|\uDB40[\uDD00-\uDDEF])/g;

const stripVariationSelectors = function (string) {
  return string.replace(regex, "");
};

//

function ProfilePage(props) {
  const [tag, setTag] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const navigate = useNavigate();

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleTag = (e) => {
    setTag(e.target.value);
    console.log(stripVariationSelectors(e.target.value));
  };

  const storedToken = localStorage.getItem("authToken");

  const handleTagSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { tag, owner: user.userId };
    const updateTag = await fetch(`${API_URL}/u/tag`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (updateTag.ok) {
      const reply = await updateTag.json();
      setTag("");
    }
  };

  return (
    <div className="container profile-page">
      <div className="row">
        <div className="col">
          <p>What the</p>
          {errorMessage && (
            <div className="alert alert-primary" role="alert">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="alert alert-primary" role="alert">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleTagSubmit} acceptCharset="utf-16">
            <label htmlFor="tag">
              URL Shortcut:
              <input
                type="text"
                name="tag"
                id="tag"
                value={tag}
                onChange={handleTag}
              />
            </label>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="col">
          <p>What the</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
