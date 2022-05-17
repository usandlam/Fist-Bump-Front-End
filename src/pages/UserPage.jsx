import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

// const emojiUnicode = require("emoji-unicode");

const cleanEmoji = require("../scripts/VariationSelectors");

const API_URL = "http://localhost:5005/u";

function UserPage(props) {
  const [fetching, setFetching] = useState(true);

  const { tagId } = useParams();

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [foundUser, setFoundUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = cleanEmoji(tagId);
      const tryLookup = await fetch(`${API_URL}/${query}`);
      const response = await tryLookup.json();
      setFetching(false);
      setFoundUser(response.message);
    };
    fetchData();
  }, []);

  return (
    <div className="container profile-page">
      {fetching && <p>Loading</p>}
      <p>{tagId}</p>
      {!fetching && (
        <>
          <p>{foundUser.owner.username}</p>
          <p>{foundUser.owner.tagline}</p>
        </>
      )}
    </div>
  );
}

export default UserPage;
