import React, { useContext, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
// const emojiUnicode = require("emoji-unicode");

const cleanEmoji = require("../scripts/VariationSelectors");

const API_URL = "http://localhost:5005/u";

// eslint-disable-next-line no-undef
const path = window.location.host.split(".")[1];

function ResolveUser({ children }) {
  const [fetching, setFetching] = useState(true);
  const [foundUser, setFoundUser] = useState([]);

  const { tagId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const query = cleanEmoji(tagId);
      const tryLookup = await fetch(`${API_URL}/${query}`);
      const response = await tryLookup.json();
      setFetching(false);
      // eslint-disable-next-line no-underscore-dangle
      setFoundUser(response.message.owner._Id);
      // eslint-disable-next-line no-undef
      window.location = `http://${path}/to/${response.message.owner._id}`;
    };
    fetchData();
  }, []);

  // If the authentication is still loading
  if (fetching) return <p>Loading ...</p>;

  if (!fetching) {
    // If the user is not logged in
    return `<p>Redirecting to user page</p>`;
  }
  // If the user is logged in, allow to see the page
  return children;
}

export default ResolveUser;
