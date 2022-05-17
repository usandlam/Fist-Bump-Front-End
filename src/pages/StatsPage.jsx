import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5005/daps";

function StatsPage(props) {
  const [fetching, setFetching] = useState(true);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [foundUser, setFoundUser] = useState([]);

  /*
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
  */

  return <div className="container profile-page" />;
}

export default StatsPage;
