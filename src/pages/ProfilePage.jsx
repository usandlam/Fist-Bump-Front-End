import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

// const emojiUnicode = require("emoji-unicode");

const cleanEmoji = require("../scripts/VariationSelectors");

function ProfilePage(props) {
  const [tag, setTag] = useState("");
  const [tagline, setTagline] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const [foundTag, setFoundTag] = useState([]);
  const [foundTagline, setFoundTagline] = useState([]);

  const navigate = useNavigate();

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [fetching, setFetching] = useState(true);

  const [infoBlank, setInfoBlank] = useState(true);

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  const handleTagline = (e) => setTagline(e.target.value);

  // eslint-disable-next-line no-undef
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      //   const id = user.userId;
      const tryLookup = await fetch(`${API_URL}/u/my/info`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
      const response = await tryLookup.json();
      setFoundTag(response.tagline);
      setFoundTagline(response.tagline);
      setFetching(false);
    };
    fetchData();
  }, []);

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
      setSuccessMessage("Successfully updated!");
      setTag("");
    }
  };

  const handleTaglineSubmit = async (e) => {
    e.preventDefault();
    const requestBody = { tagline, owner: user.userId };
    const updateTagline = await fetch(`${API_URL}/u/tagline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (updateTagline.ok) {
      const reply = await updateTagline.json();
      setTagline(reply.newTagline);
      setInfoBlank(false);
      setSuccessMessage("Successfully updated!");
      //   setTagline("");
    } else {
      setErrorMessage(updateTagline.message);
    }
  };

  return (
    <div className="container profile-page">
      <div className="row">
        <div className="col">
          <p />
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
          <form onSubmit={handleTagSubmit}>
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
            {/* {!fetching && <p>Your current shortcut is {foundTag} </p>} */}
            <button className="btn btn-primary m-3" type="submit">
              Update URL
            </button>
          </form>
          <form onSubmit={handleTaglineSubmit}>
            <label htmlFor="tagline">
              Tagline:
              <input
                type="text"
                name="tagline"
                id="tagline"
                value={tagline}
                onChange={handleTagline}
              />
            </label>
            {/* {infoBlank && !fetching ? (
              <p>Your current shortcut is {foundTagline} </p>
            ) : (
              ""
            )} */}
            <button className="btn btn-primary m-3" type="submit">
              Update Tagline
            </button>
          </form>
        </div>
        <div className="col">
          <p>
            <Link to="/my-daps">Check out your latest bumps! </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
