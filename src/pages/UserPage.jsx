import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5005/u";

function UserPage(props) {
  const [fetching, setFetching] = useState(true);

  const { tagId } = useParams();

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [foundUser, setFoundUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await fetch(`${API_URL}/${tagId}`);
      //   const beer = await responseData.json();
      //   setFoundUser(beer);
      setFetching(false);
    };
    fetchData();
  }, []);

  return (
    <div className="container profile-page">
      {fetching && <p>Loading</p>}
      <p>{tagId}</p>
    </div>
  );
}

export default UserPage;
